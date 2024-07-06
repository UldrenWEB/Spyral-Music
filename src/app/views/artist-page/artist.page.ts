import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/service/DataService";
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CallService } from "src/app/service/CallService";

@Component({
    selector: 'app-artist',
    templateUrl: 'artist.page.html',
    styleUrls:['artist.page.scss']
})
export class ArtistPage implements OnInit {

    constructor(
        private dataService: DataService,
        private router: Router,
        private sanitizer: DomSanitizer,
        private callService: CallService
    ) {}

    async ngOnInit() {
      const result = await this.callService.call({
        method: 'get',
        isToken: true,
        endPoint: 'allGenres',
        body: null
      })

      if(result.message['code'] == 1 || result.message['code'] == 3){
        return this.#showMessageBar(result.message['description'], result.message['code'])
      }

      this.genres = result['data'];
    }

    selectImage: boolean = false;
    srcImage: SafeResourceUrl | undefined;
    artistnameValue: string = '';
    selectedGenres: string[] = [];
    alertCode: number = 0;
    alertMessage: string = '';
    genres: Array<string> = [];

    //Regex
    regexArtistname: string = '^[a-zA-Z]+(?: [a-zA-Z]+)+$';

    //Checkers
    isValidArtistname: boolean = false;
    showAlert: boolean = false;
    isShow: boolean = false;


    //Inicio de Funciones OnChange
    onValueChangeArtistname(newValue: string){
      this.artistnameValue = newValue;
      this.isValidArtistname = new RegExp(this.regexArtistname).test(newValue);
    }
    //Fin de Funciones OnChange

    #showMessageBar = (message: string, code : 0 | 1 | 3 = 0) => {
        if(this.isShow) return;
        
        this.isShow = true;
        this.alertCode = code;
        this.alertMessage = message;
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
          this.isShow = false;
        }, 3000)
    }


    //Aqui se debe aplicar el dialog
    onClickCancel = () => {
      this.dataService.setData({});
      this.router.navigate(['/register'])
    }


    imageBlob: Blob | null = null;

    async openImagePicker() {
      try {
        const image: Photo = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Uri,
          source: CameraSource.Photos
        });
  
        if (image && image.webPath) {
          this.selectImage = true;
          const imagePath = image.webPath;
  
          this.imageBlob = await this.convertBlobUrlToBlob(imagePath);
          this.srcImage = URL.createObjectURL(this.imageBlob as Blob);
        } else {
          console.log('El resultado de las fotos es vacío');
        }
      } catch (error) {
        console.error('Error seleccionando la imagen: ', error);
      }
    }

  async convertBlobUrlToBlob(blobUrl: string): Promise<Blob | null> {
    try {
      const response = await fetch(blobUrl);
      if (!response.ok) throw new Error('Network response was not ok.');
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('Error fetching blob:', error);
      return null;
    }
  }
  
    onClick = async () => {
      if(!this.isValidArtistname) return this.#showMessageBar('Please enter the artist name', 3);

      if(this.selectedGenres.length <= 0) return this.#showMessageBar('Please select a genre', 3);

      if(!this.selectImage || !this.imageBlob) return this.#showMessageBar('Please select image', 3);

      const user = this.dataService.getData();
      
      console.log('prueba', this.artistnameValue);

      const formdata = new FormData();
      formdata.append('name', this.artistnameValue);
      formdata.append('genres', this.selectedGenres.join(','));
      formdata.append('image', this.imageBlob, 'image');

      const result = await this.callService.callToFormData({
        endPoint: 'createArtist',
        formData: formdata
      })
      
      
      if(result.message['code'] == 1 || result.message['code'] == 3){
        return this.#showMessageBar(result.message['description'], result.message['code']);;
      }

      const resultUser = await this.callService.call({
        method: 'post',
        isToken: false,
        endPoint: 'register',
        body: {
          username: user.username,
          email: user.email,
          password: user.password,
          idRol: '1',
          idArtist: result.data['artist']._id
        }
      })
      
      this.#showMessageBar(resultUser.message['description'], resultUser.message['code']);
      if(resultUser.message['code'] == 1 || resultUser.message['code'] == 2){
        return;
      } 
      
      console.log('USER', user, this.selectedGenres, result);


      this.resetProps();
      setTimeout(() => {
        this.router.navigate(['/login'])
      }, 500)
    }

    private resetProps = () : void => {
        //Set properties
        this.selectImage = false;
        this.srcImage = '';
        this.artistnameValue = '';
        this.selectedGenres = [];
    }
}
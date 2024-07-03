import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/service/DataService";
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-artist',
    templateUrl: 'artist.page.html',
    styleUrls:['artist.page.scss']
})
export class ArtistPage implements OnInit {

    constructor(
        private dataService: DataService,
        private router: Router,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        console.log('Probando')
    }

    selectImage: boolean = false;
    srcImage: SafeResourceUrl | undefined;
    artistnameValue: string = '';
    selectedGenres: string[] = [];
    alertCode: number = 0;
    alertMessage: string = '';
    genres: Array<{id: number, description: string}> = [
        { id: 1, description: 'Rock' },
        { id: 2, description: 'Pop' },
        { id: 3, description: 'Jazz' },
        { id: 5, description: 'Electronic' }
      ];

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


    async openImagePicker() {
        try {
          const image: Photo = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri, // Obtiene la URI de la imagen
            source: CameraSource.Photos // Fuente de las fotos, puedes cambiar a CameraSource.Camera para abrir la cámara directamente
          });
    
          if (image && image.webPath) {
            this.srcImage = this.sanitizer.bypassSecurityTrustResourceUrl(image.webPath);
            this.selectImage = true;
            console.log('Imagen seleccionada: ', this.srcImage);
          } else {
            console.log('El resultado de las fotos es vacío');
          }
        } catch (error) {
          console.error('Error seleccionando la imagen: ', error);
        }
      }
      
    //Aqui se hara la peticion con el user y el artista, primero se agrega el artista y luego se agrega el usuario con el id del artista
    onClick = () => {
        if(!this.isValidArtistname) return this.#showMessageBar('Please enter the artist name', 3);

        if(this.selectedGenres.length <= 0) return this.#showMessageBar('Please select a genre', 3);

        if(!this.selectImage) return this.#showMessageBar('Please select image', 3);

        this.resetProps();
        //Usuario que viene del registro
        const user = this.dataService.getData();
        
        console.log('USER', user, this.selectedGenres)
        this.router.navigate(['/login'])
    }

    private resetProps = () : void => {
        //Set properties
        this.selectImage = false;
        this.srcImage = '';
        this.artistnameValue = '';
        this.selectedGenres = [];
    }
}
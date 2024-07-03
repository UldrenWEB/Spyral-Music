import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/service/DataService";

@Component({
    selector: 'app-artist',
    templateUrl: 'artist.page.html',
    styleUrls:['artist.page.scss']
})
export class ArtistPage implements OnInit {

    constructor(
        private dataService: DataService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        console.log('Probando')
    }

    selectImage: boolean = false;
    srcImage: string = '';
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


    //Metodo para abrir imagen
    // openImagePicker = async () => {  
    //     const hasPermission = await this.imagePicker.hasReadPermission();
    //     console.log('Status del permiso: ', hasPermission)
    //     if(!hasPermission) {
    //         const permission = await this.imagePicker.requestReadPermission();
    //         console.log('El permiso que dio es: ', permission)
    //     }else{
    //         const options: ImagePickerOptions = {
    //             maximumImagesCount: 1,
    //         }
    //         const photos = await this.imagePicker.getPictures(options);
    //         if(photos){
    //             const srcImage = this.webView.convertFileSrc(photos[0]);
    //             this.selectImage = true;
    //             this.srcImage = srcImage;
    //         }else{
    //             console.log('El resultado de las fotos es vacio');
    //         }
            
    //     }
    // }

    

    //Aqui se hara la peticion con el user y el artista, primero se agrega el artista y luego se agrega el usuario con el id del artista
    onClick = () => {
        if(!this.isValidArtistname) return this.#showMessageBar('Please enter the artist name', 3)

        if(this.selectedGenres.length <= 0) return this.#showMessageBar('Please select a genre', 3)
        
        const user = this.dataService.getData();
        
        console.log('USER', user, this.selectedGenres)
        this.router.navigate(['/tabs/home'])
    }
}
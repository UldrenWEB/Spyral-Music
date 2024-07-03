import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Keyboard } from "@capacitor/keyboard";
import { Platform } from "@ionic/angular";
import { AuthService } from "src/app/service/AuthServices";
import { DataService } from "src/app/service/DataService";


@Component({
    selector: 'app-profile',
    templateUrl: 'profile.page.html',
    styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit{
    constructor(private router: Router, private dataService: DataService, private platform: Platform, private authService: AuthService){}
    
    userRol: number = 0;

    //Cargar aqui tambien lo de los generos del sujeto para cargar los seleccionados
    ngOnInit(): void {
      this.setupKeyboardListener();
      this.userRol = this.authService.getUserRole();
    }

    setupKeyboardListener() {
        if (this.platform.is('capacitor')) {
          Keyboard.addListener('keyboardWillShow', (info) => {
            // Asegura que el elemento exista y sea del tipo HTMLElement antes de modificar su estilo
            const containerInput = document.querySelector('.container-input');
            if (containerInput instanceof HTMLElement) {
              // Opción 1: Usar scrollIntoView para asegurar que el input sea visible
              // Esto hará que el navegador desplace el contenedor para que el input sea visible
              // Nota: Considera la necesidad de un enfoque más específico si tienes múltiples inputs
              containerInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      
              // Opción 2: Ajustar el padding-bottom basado en la altura del teclado
              // Esto puede ser útil si tienes un control más fino sobre el comportamiento de desplazamiento
              containerInput.style.paddingBottom = `${info.keyboardHeight}px`;
            }
          });
      
          Keyboard.addListener('keyboardWillHide', () => {
            const containerInput = document.querySelector('.container-input');
            if (containerInput instanceof HTMLElement) {
              // Restablecer el padding-bottom cuando el teclado se oculte
              containerInput.style.paddingBottom = '0';
            }
          });
        }
    }

    usernameValue: string = '';
    passwordValue: string = '';
    emailValue: string = '';
    artistnameValue: string = '';
    selectedGenres: string[] = [];
    genres: Array<{id: number, description: string}> = [
        { id: 1, description: 'Rock' },
        { id: 2, description: 'Pop' },
        { id: 3, description: 'Jazz' },
        { id: 5, description: 'Electronic' }
    ];
    
    //MessageBar
    alertCode: number = 0;
    alertMessage: string = '';
    showAlert: boolean = false;
    private isShow: boolean = false;


    //Checkers
    isValidEmail: boolean = false;
    isValidPassword: boolean = false;
    isValidUsername: boolean = false;
    isValidArtistname: boolean = false;
    
    //Regex
    regexArtistname: string = '^[a-zA-Z]+(?: [a-zA-Z]+)+$';
    regexUsername: string = '.{5,}';
    regexEmail: string = '[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}';
    regexPassword: string = '.{8,}'


    //Inicio de Funciones OnChange
    onValueChangeUsername(newValue: string){
        this.usernameValue = newValue;
        this.isValidUsername = new RegExp(this.regexUsername).test(newValue);
    }

    onValueChangeEmail(newValue: string) {
        this.emailValue = newValue;
        this.isValidEmail = new RegExp(this.regexEmail).test(newValue);
    }
    
    onValueChangePassword(newValue: string) {
        this.passwordValue = newValue;
        this.isValidPassword = new RegExp(this.regexPassword).test(newValue)
    }
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


    onClick = () => {
       if(!this.isValidEmail || !this.isValidPassword || !this.isValidUsername) return;

       this.#showMessageBar('User edited', 0);
       return;
    }

    onSelectImage(){
      console.log('Aqui saldra el image')
    }


}
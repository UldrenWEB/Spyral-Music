import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/service/AuthServices';
import { CallService } from 'src/app/service/CallService';
import { StorageService } from 'src/app/service/StorageService';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit{

  constructor(
      private storageService: StorageService,
      private router: Router,
      private authService: AuthService,
      private platform: Platform,
      private callService: CallService,
    ) {}
  
  async ngOnInit(): Promise<void> {
    await this.storageService.init();
    this.setupKeyboardListener();
  }

  setupKeyboardListener() {
    if (this.platform.is('capacitor')) {
      Keyboard.addListener('keyboardWillShow', (info) => {
        const containerInput = document.querySelector('.container-input');
        if (containerInput instanceof HTMLElement) {
          containerInput.style.paddingBottom = `${info.keyboardHeight}px`;
        }
      });

      Keyboard.addListener('keyboardWillHide', () => {
        const containerInput = document.querySelector('.container-input');
        if (containerInput instanceof HTMLElement) {
          containerInput.style.paddingBottom = '0';
        }
      });
    }
  }

  //Prop alert
  showAlert: boolean = false;
  alertMessage: string = '';
  alertCode: number = 0;

  //Regex
  regexEmail: string = '[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}';
  regexPassword: string = '.{8,}'


  emailValue: string = '';
  passwordValue: string = '';

  isValidEmail: boolean = false;
  isValidPassword: boolean = false;

  onValueChangeEmail(newValue: string) {
    this.emailValue = newValue;
    this.isValidEmail = new RegExp(this.regexEmail).test(newValue);
  }
  onValueChangePassword(newValue: string) {
    this.passwordValue = newValue;
    this.isValidPassword = new RegExp(this.regexPassword).test(newValue)
  }

  private isShow: Boolean = false;

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

  onClick = async () => {
    if(!this.isValidEmail || !this.isValidPassword) return;

    //Aqui se debe hacer el login y entrar al sistema
    console.log(`Email ${this.emailValue }`)
    console.log(`Password ${this.passwordValue}`)

    //* Aqui se guarda el token del user y el rol del usuario
    const result = await this.callService.call({
      method: 'post',
      endPoint: 'login',
      isToken: false,
      body: {
        email: this.emailValue,
        password: this.passwordValue
      }
    })
    console.log(result);


    this.authService.setUserRole(1);
    this.#showMessageBar(result.message['description'], result.message['code'])


    this.router.navigate(['/tabs'])
  }

  onRedirect = () => {
    this.authService.setUserRole(1);
    this.router.navigate(['/tabs'])



    // this.router.navigate(['/register'])

  }
  

}
import { Component, OnInit } from "@angular/core";
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { FilePicker } from "@capawesome/capacitor-file-picker";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Platform } from "@ionic/angular";
import {AndroidPermissions} from '@awesome-cordova-plugins/android-permissions/ngx';


@Component({
  selector: 'app-upload',
  templateUrl: 'upload.page.html',
  styleUrls: ['upload.page.scss'],
  providers: [ File]
})
export class UploadPage implements OnInit {

    audioPlayer : HTMLAudioElement | null = null;
    selectImage: boolean = false;
    selectAudio: boolean = false;
    nameAudio: string = '';
    srcImage: SafeResourceUrl | undefined;
    duration: number = 0;
    imageBlob: Blob | null = null;
    audioBlob: Blob | null = null;
    selectedGenres: string[] = [];
    showAlert: boolean = false;
    alertMessage: string = '';
    alertCode: number = 0;
    isShow: boolean = false;
    genres: Array<{id: number, description: string}> = [
        { id: 1, description: 'Rock' },
        { id: 2, description: 'Pop' },
        { id: 3, description: 'Jazz' },
        { id: 5, description: 'Electronic' }
      ];
      songName: string = '';
      regexSongname: string = '.{4,}';
      isValidSongname: boolean = false;

  constructor(
    private androidPermissions : AndroidPermissions,
    private file: File,
    private platform: Platform,
    private sanitizer: DomSanitizer,
  ) { }


  ngOnInit(): void {
      this.checkPermissions();
  }


  private showMessageBar(message: string, code: 0 | 1 | 3 = 0) {
    if (this.isShow) return;

    this.isShow = true;
    this.alertCode = code;
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
      this.isShow = false;
    }, 3000);
  }

  onValueChangeSongname(newValue: string){
    this.songName = newValue;
    this.isValidSongname = new RegExp(this.regexSongname).test(newValue);
  }


  async selectFile() {
    try {
      await Filesystem.requestPermissions()
      const result = await FilePicker.pickFiles({
        types: ['audio/*'],
      });

      if (result.files.length > 0) {
        const data = result.files[0];

        const filePath = data.path || "";
        const fileType = data.mimeType;

        this.nameAudio = data.name;
        this.duration = data.duration || 0;
        this.selectAudio = true;

        const fileData = await Filesystem.readFile({
          path: filePath
        });

        const blob = this.base64ToBlob(typeof fileData.data === 'string' ? fileData.data : '', fileType);
        
        console.log(URL.createObjectURL(blob))
        this.audioBlob = blob;
        // this.audioPlayer = new Audio();
        // this.audioPlayer.src = URL.createObjectURL(blob);
        // this.audioPlayer.play();
      }
    } catch (error) {
      // console.error('Error picking file', JSON.stringify(error));
    }
    return null;
  }

  base64ToBlob(base64: string, type: string): Blob {
    const binary = atob(base64.replace(/\s/g, ''));
    const len = binary.length;
    const buffer = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      buffer[i] = binary.charCodeAt(i);
    }
    return new Blob([buffer], { type: type });
  }



  async checkPermissions() {
    if (this.platform.is('android')) {
      try {
        const readPerm = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE);
        if (!readPerm.hasPermission) {
          await this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE);
        }

        const writePerm = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
        if (!writePerm.hasPermission) {
          await this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
        }

        const managePerm = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.MANAGE_EXTERNAL_STORAGE);
        if (!managePerm.hasPermission) {
          await this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.MANAGE_EXTERNAL_STORAGE);
        }

        // Verificación final después de solicitar los permisos
        const finalReadPerm = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE);
        const finalWritePerm = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
        const finalManagePerm = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.MANAGE_EXTERNAL_STORAGE);

        if (finalReadPerm.hasPermission && finalWritePerm.hasPermission && finalManagePerm.hasPermission) {
          console.log('Todos los permisos han sido concedidos');
        } else {
          console.log('No se han concedido todos los permisos necesarios');
        }
      } catch (error) {
        console.error('Error al solicitar permisos: ', error);
      }
    }
  }


  //Metodo para abrir imagen
  async openImagePicker() {
    try {
      const image: Photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos
      });

      if (image && image.webPath) {
        this.srcImage = this.sanitizer.bypassSecurityTrustResourceUrl(image.webPath);
        this.selectImage = true;
        const imagePath = image.webPath;

        console.log('Path', image)
        this.imageBlob = await this.convertBlobUrlToBlob(imagePath);
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
    try {
      if(!this.selectAudio) 
          return this.showMessageBar('You must select a valid audio for your song.', 3);

      if(!this.songName) 
        return this.showMessageBar('You must enter a name for the song.', 3);

      if(this.selectedGenres.length <= 0) 
        return this.showMessageBar('You must select at least one genre.', 3);

      if(!this.selectImage)
        return this.showMessageBar('You must select a valid photo for the song.', 3);

      if(!this.imageBlob || !this.audioBlob)
          return this.showMessageBar('An error occurred while obtaining the image or song blob.', 1);

      //Aqui se hace la logica para subir la cancion
      const formData = new FormData();
      formData.append('image', this.imageBlob, 'image');
      formData.append('duration', this.duration.toString());
      formData.append('song', this.audioBlob, 'song');
      formData.append('name', this.nameAudio);
      formData.append('genres', this.selectedGenres.join(','))

      return null;
    } catch (error) {
      return this.showMessageBar('Could not upload the song', 1);
    }
  }
    
}

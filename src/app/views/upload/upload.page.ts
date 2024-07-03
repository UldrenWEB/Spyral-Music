import { Component, OnInit } from "@angular/core";
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Filesystem } from "@capacitor/filesystem";
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

    // selectFile() {
    //     let multiple_selection = false;
    //     let ext = ["audio/*"];
    //     let formData = new FormData();
    
    //     FileSelector.fileSelector({
    //         multiple_selection: multiple_selection,
    //         ext: ext
    //     }).then(selectedFile => {
    //         console.log(selectedFile)
    //         if (!selectedFile || !selectedFile.paths || selectedFile.paths.length === 0) {
    //             console.log("No se seleccionó ningún archivo de audio.");
    //             return;
    //         }
    
    //         if (selectedFile.paths.length > 1) {
    //             console.log("Se seleccionaron múltiples archivos. Se esperaba seleccionar solo uno.");
    //             return;
    //         }
    
    //         let fileName = '';
    
    //         if (this.platform.is("android")) {
    //             fetch(selectedFile.paths[0])
    //                 .then(r => r.blob())
    //                 .then(file => {
    //                     fileName = selectedFile.original_names[0] + selectedFile.extensions[0];
    //                     formData.append("myfile[]", file, fileName);
    //                     this.nameAudio = fileName;
    //                     console.log("Nombre del archivo seleccionado:", fileName);
    //                 })
    //                 .catch(error => console.log("Error al procesar el archivo en Android:", error));
    //         } else if (this.platform.is("ios")) {
    //             fetch(selectedFile.paths[0])
    //                 .then(r => r.blob())
    //                 .then(file => {
    //                     fileName = selectedFile.original_names[0] + selectedFile.extensions[0];
    //                     formData.append("myfile[]", file, fileName);
    //                     this.nameAudio = fileName;
    //                     console.log("Nombre del archivo seleccionado:", fileName);
    //                 })
    //                 .catch(error => console.log("Error al procesar el archivo en iOS:", error));
    //         } else {
    //             FileSelector.addListener("onFilesSelected", (data: FileList) => {
    //                 if (data.length > 1) {
    //                     console.log("Se seleccionaron múltiples archivos. Se esperaba seleccionar solo uno.");
    //                 } else {
    //                     const file = data.item(0);
    //                     if (file) {
    //                         fileName = file.name;
    //                         formData.append("myfile[]", file, fileName);
    //                         this.nameAudio = fileName;
    //                         console.log("Nombre del archivo seleccionado:", fileName);
    //                     }
    //                 }
    //             });
    //         }

    //         console.log('Se selecciono el archivo', fileName)
    //     }).catch(error => {
    //         console.log("Error al seleccionar el archivo:", error);
    //     });
    // }
    
  //  selectFile() {

  //   this.fileChooser.open()
  //       .then(uri => {
  //           console.log('Archivo seleccionado:', uri);
  //           this.getFileName(uri);
  //       })
  //       .catch(error => console.log(`Hubo un error al intentar seleccionar un audio. ${error}`))
  //   }


  //   getFileName(filePath: string) {
  //       console.log('Iniciando getFileName con filePath:', filePath);
      
  //       this.filePath.resolveNativePath(filePath).then((nativeFilePath) => {
  //         console.log('Ruta nativa del archivo:', nativeFilePath);
      
  //         this.file.resolveLocalFilesystemUrl(nativeFilePath).then(fileEntry => {
  //           console.log('Archivo resuelto:', fileEntry);
      
  //           fileEntry.getMetadata(metadata => {
  //             console.log('Metadata del archivo obtenida:', metadata);
  //             console.log('Nombre del archivo:', fileEntry.name);
  //             this.convertFileToBlob(nativeFilePath, fileEntry.name);
  //           }, error => {
  //             console.log('Error al obtener metadata del archivo:', JSON.stringify(error));
  //           });
      
  //         }).catch(error => {
  //           console.log('Hubo un error al resolver la URL del archivo:', JSON.stringify(error));
  //         });
      
  //       }).catch(error => {
  //         console.log('Hubo un error al resolver la ruta nativa del archivo:', JSON.stringify(error));
  //       });
  //     }
      

  //     convertFileToBlob(filePath: string, fileName: string) {
  //       this.file.resolveLocalFilesystemUrl(filePath).then(fileEntry => {
  //         (fileEntry as any).file((file: any) => {
  //           console.log('Se empezó a leer el archivo');
  //           console.log('Tipo de archivo:', file.type);
            
  //           // Depuración: Mostrar la ruta y el nombre del archivo
  //           console.log('Ruta del archivo:', filePath);
  //           console.log('Nombre del archivo:', fileName);
      
  //           // Leer el archivo como ArrayBuffer usando el plugin File
  //           const directoryPath = filePath.substring(0, filePath.lastIndexOf('/'));
  //           const fileOnlyName = filePath.substring(filePath.lastIndexOf('/') + 1);
      
  //           this.file.readAsArrayBuffer(directoryPath, fileOnlyName)
  //             .then((arrayBuffer: ArrayBuffer) => {
  //               const blob = new Blob([arrayBuffer], { type: file.type });
  //               this.uploadFile(blob, fileName);
  //               this.nameAudio = 'Se ha seleccionado correctamente el archivo';
  //             })
  //             .catch(error => {
  //               console.log('Error al leer el archivo como ArrayBuffer:', JSON.stringify(error));
  //             });
      
  //         }, (error: any) => {
  //           console.log('Error al obtener el archivo:', JSON.stringify(error));
  //         });
  //       }).catch(error => console.log(`Hubo un error al resolver la URL del archivo ${JSON.stringify(error)}`));
  //     }
      
      
      

  //     uploadFile(blob: Blob, fileName: string) {
  //       const formData = new FormData();
  //       formData.append('file', blob, fileName);
    
  //       // Aquí puedes implementar la lógica para subir el archivo
  //       console.log('Se subió el archivo correctamente:', fileName);
  //     }


  async selectFile() {
    try {
      await Filesystem.requestPermissions()
      const result = await FilePicker.pickFiles({
        types: ['audio/*'],
      });

      if (result.files.length > 0) {
        const filePath = result.files[0].path || "";
        const fileType = result.files[0].mimeType;

        const fileData = await Filesystem.readFile({
          path: filePath
        });

        const blob = this.base64ToBlob(typeof fileData.data === 'string' ? fileData.data : '', fileType);

        this.audioPlayer = new Audio();
        this.audioPlayer.src = URL.createObjectURL(blob);
        this.audioPlayer.play();
      }
    } catch (error) {
      console.error('Error picking file', JSON.stringify(error));
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
    
}

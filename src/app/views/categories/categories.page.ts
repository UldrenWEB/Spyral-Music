import { Component, ChangeDetectionStrategy, inject, model, signal, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog-component/dialog.component';
import { CallService } from 'src/app/service/CallService';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesPage implements OnInit {

  constructor(
    private callService: CallService,
    private cdr: ChangeDetectorRef
  ) {}

  readonly playlist = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);


  //MessageBar
  alertCode: number = 0;
  alertMessage: string = '';
  showAlert: boolean = false;
  private isShow: boolean = false;



  async ngOnInit() {
    console.log('Aqui se traera la playlist del user')
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {name: this.name(), playlist: this.playlist()},
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result !== undefined) {
        try{
          const response = await this.callService.call({
            method: 'post',
            isToken: true,
            endPoint: 'addPlaylist',
            body: {
              name: result
            }
          })
          //TODO: RECUERDA QUE TIENES LAS IMAGENES PARA METER LAS PLAYLIST AHI
          //Marcial tiene que arreglar lo del message que no envia el description
          //Se debe quitar lo de image y la otra prop para que cuando cree la playlist sea solo con el nombre
          console.log(response)
          this.#showMessageBar('Entro aqui y algo paso', 3)
          this.cdr.detectChanges();
        }catch(error){
          console.log(error)
          this.#showMessageBar('Hubo un error al crear la playlist', 1)
        }
      }
    });
  }


  #showMessageBar = (message: string, code : 0 | 1 | 3 = 0) => {
    if(this.isShow) return;
    
    this.cdr.detectChanges();
    this.isShow = true;
    this.alertCode = code;
    this.alertMessage = message;
    this.showAlert = true;
    
    setTimeout(() => {
      this.showAlert = false;
      this.isShow = false;
      this.cdr.detectChanges();
    }, 3000)
  }
}

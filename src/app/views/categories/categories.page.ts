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


  playlists: Array<any> = [];



  async ngOnInit() {
    const result = await this.callService.call({
      method: 'get',
      isToken: true,
      endPoint: 'allPlaylist',
      body: null
    })

    if(result.message['description'] == 1 || result.message['code'] == 3){
      return this.#showMessageBar(result.message['description'], result.message['code']);
    }

    const data = result['data'];
    const playlists = data.map((playlist: any) => ({
      id: playlist._id,
      title: playlist.name,
      songs: playlist.idSong?.map((song:any) =>({
        id: song._id,
        title: song.name,
        image: song.image,
        artists: '',
        song: song.url_cancion,
        isLiked: song.isLiked ? song.isLiked : false,
        likes: song.likes
      }))
    }))
    
    this.playlists = playlists;
    this.cdr.detectChanges();
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
          this.#showMessageBar(response.message['description'], response.message['code']);
          if(response.message['description'] == 1 || response.message['code']){
            return;
          }
          const data = response['data'].playlist
          this.playlists.push({title: data.name, tracks: data.songs});
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

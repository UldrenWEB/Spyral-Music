import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ActionSheetController, IonicModule } from "@ionic/angular";
import { MusicPlayerService } from "src/app/service/MusicPlayerService";
import { SongService } from "src/app/service/SongService";
import { getFormattedArtists } from "src/app/service/formattedArtist";

@Component({
    selector: 'app-card-component',
    templateUrl: 'card.component.html',
    styleUrls: ['card.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IonicModule
    ]
})
export class CardComponent{

    constructor(
        public actionSheetController: ActionSheetController,
        private songService: SongService,
        private router: Router,
        private playerService: MusicPlayerService
    ){}

    @Input() title: string = '';
    @Input() artists: string[] = [];
    @Input() imageSrc: string = '';
    @Input() url_song: string = '';


    maxLength: number = 30;

  async presentOptions(event: MouseEvent) {
    event.stopPropagation();
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Dar like',
        handler: () => {
          console.log('Like dado');
        }
      }, {
        text: 'Agregar a playlist',
        handler: () => {
          console.log('Agregado a playlist');
        }
      }, {
        text: 'Reproducir',
        handler: () => {
          console.log('Reproduciendo');
        }
      }, {
        text: 'Cancelar',
        role: 'cancel',  
        cssClass: 'cancel-button'
      }]
    });
    await actionSheet.present();
  }

  onClick = () => {
    const song = [
      {
        title: 'El amor',
          artists: [
            'Prueba',
            'Hola',
            'Saiko',
            'Erika Tourt'
          ],
          image: 'https://i.scdn.co/image/ab6761610000e5ebfe7dbde5b6f002aeac5aeeca',
          song: 'https://p.scdn.co/mp3-preview/ca130c64a85c28fa66d947f9900664b75b133d71?cid=cfe923b2d660439caf2b557b21f31221',
      
      },
      {
        title: 'REINA',
        artists: [
          'Uldren Gedde',
          'Mora',
          'Saiko',
          'Erika Tourt'
        ],
        image: 'https://i.scdn.co/image/ab67616d00001e0257e9af9d4640f332880ffa5e',
        song: 'https://p.scdn.co/mp3-preview/90073b480fe270ea3e3b61eec49edf38805eedd7?cid=cfe923b2d660439caf2b557b21f31221',
    },
  ]
    this.playerService.stop();
    this.songService.setSongs([]);
    this.songService.setSong(song[1]);
    this.playerService.setPlaylist(song);
    this.router.navigate(['/play-song']);
  }

  formateddArtist(): string{
    return getFormattedArtists(this.artists, this.maxLength);
  }


}
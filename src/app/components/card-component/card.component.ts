import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ActionSheetController, IonicModule } from "@ionic/angular";
import { Song } from "src/app/interfaces/song";
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
    @Input() index: number = 0;


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
    const song: Song = {
      artists: this.artists,
      image: this.imageSrc,
      song: this.url_song,
      title: this.title
    }

    console.log('AQUIII -<> ', song)
    this.playerService.stop();
    this.songService.setSong(song);
    this.playerService.setPlaylist(this.songService.getSongs());
    this.playerService.setCurrentIndex(this.index);
    this.router.navigate(['/play-song']);
  }

  formateddArtist(): string{
    return getFormattedArtists(this.artists, this.maxLength);
  }


}
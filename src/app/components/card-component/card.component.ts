import { CommonModule } from "@angular/common";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ActionSheetController, IonicModule } from "@ionic/angular";
import { Song } from "src/app/interfaces/song";
import { MusicPlayerService } from "src/app/service/MusicPlayerService";
import { SongService } from "src/app/service/SongService";
import { getFormattedArtists } from "src/app/service/formattedArtist";
import { IonPopover } from "@ionic/angular";

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
export class CardComponent implements OnInit{
    @ViewChild(IonPopover) myPopover: IonPopover | undefined;

    constructor(
        public actionSheetController: ActionSheetController,
        private songService: SongService,
        private router: Router,
        private playerService: MusicPlayerService
    ){}
  ngOnInit(): void {
    console.log('Se ejecuto')
  }

    @Input() title: string = '';
    @Input() artists: string[] = [];
    @Input() imageSrc: string = '';
    @Input() url_song: string = '';
    @Input() index: number = 0;
    @Input() id: string = '';


    maxLength: number = 30;

  async presentOptions(event: MouseEvent) {
    event.stopPropagation();
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Dar like',
        handler: () => {
          console.log('Like dado');
          //Aqui agregar like y listo
        }
      }, {
        text: 'Agregar a playlist',
        handler: () => {
          console.log('Agregado a playlist');
          this.openPopover()
          //Debe sacar aqui todas las playlist disponibles para agregar en una
          //Sacar modal con opciones al que seleccione se agrega a dicha playlist
        }
      }, {
        text: 'Cancelar',
        role: 'cancel',  
        cssClass: 'cancel-button'
      }]
    });
    await actionSheet.present();
  }

  openPopover() {
    this.myPopover?.present();
  }

  onClick = () => {
    const song: Song = {
      artists: this.artists,
      image: this.imageSrc,
      song: this.url_song,
      title: this.title
    }

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
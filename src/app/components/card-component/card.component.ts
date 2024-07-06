import { CommonModule } from "@angular/common";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ActionSheetController, IonicModule } from "@ionic/angular";
import { Song } from "src/app/interfaces/song";
import { MusicPlayerService } from "src/app/service/MusicPlayerService";
import { SongService } from "src/app/service/SongService";
import { getFormattedArtists } from "src/app/service/formattedArtist";
import { IonPopover } from "@ionic/angular";
import { CallService } from "src/app/service/CallService";

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
    playlists: Array<any> = [];

    constructor(
        public actionSheetController: ActionSheetController,
        private songService: SongService,
        private router: Router,
        private playerService: MusicPlayerService,
        private callService: CallService
    ){}
  async ngOnInit() {
    const result = await this.callService.call({
      method: 'get',
      isToken: true,
      endPoint: 'allPlaylist',
      body: null
    })

    if(result.message['description'] == 1 || result.message['code'] == 3){
      return;
    }

    const data = result['data'];
    
    const playlists = data.map((playlist: any) => ({
      id: playlist._id,
      title: playlist.name,
    }))
    
    this.playlists = playlists;
  }

    @Input() title: string = '';
    @Input() artists: string[] = [];
    @Input() isLiked: boolean = false;
    @Input() likes: number = 0;
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
        text: 'Agregar a playlist',
        handler: () => {
          this.openPopover()
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

  async onSelect(item: any){
    const result = await this.callService.call({
      method: 'put',
      isToken: true,
      body: {
        idPlaylist: item.id,
        idSong: this.id
      },
      endPoint: 'modifyPlaylist'
    })

    console.log('AQUI ID', this.id)
    console.log(result)

  }

  onClick = () => {
    const song: Song = {
      artists: this.artists,
      image: this.imageSrc,
      song: this.url_song,
      title: this.title,
      likes: this.likes,
      isLiked: this.isLiked
    }
    console.log(this.songService.getSongs())
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
import { Component, OnInit } from '@angular/core';
import { CallService } from 'src/app/service/CallService';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  constructor(
    private callService: CallService
  ) {}

  async ngOnInit(){
    const result = await this.callService.call({
      method: 'get',
      isToken: true,
      endPoint: 'tops',
      body: {
        albumOffset: 0,
        albumLimit: 15,
        genreOffset: 0,
        genreLimit: 15,
        artistOffset: 0,
        artistLimit: 15
      }
    })
    const albums = result['albums'];
    const songs = result['songs'];
    const artists = result['artists'];

    if(!albums || !songs || !artists) 
      return this.#showMessageBar('Could not get the songsClick to apply', 1);

    this.dataAlbums = albums.data;
    this.dataSongs = songs.data;
    this.dataArtists  = artists.data;

    console.log('result --> ', this.dataArtists)
  }


  //MessageBar
  alertCode: number = 0;
  alertMessage: string = '';
  showAlert: boolean = false;
  private isShow: boolean = false;

  //Data tops
  dataAlbums: any;
  dataArtists: any;
  dataSongs: any;


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

}

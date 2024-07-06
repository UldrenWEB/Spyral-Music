import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Operation } from 'src/app/interfaces/operation';
import { Song } from 'src/app/interfaces/song';
import { CallService } from 'src/app/service/CallService';
import { SongService } from 'src/app/service/SongService';
import { EndPoints } from 'src/app/types';
import { SongPageModule } from '../song-page/song.module';
import stringSimilarity from 'string-similarity';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage {
  
  searchTxt: string = '';
  selectedChange: string = 'song';
  operation: Operation = {endpoint: 'songByName', body: null};
  genres: Array<string> = ['pop', 'rock', 'regueton']

  //PropAlert
  showAlert: boolean = false;
  alertMessage: string = '';
  alertCode: number = 0;
  isShow: boolean = false;
  songs: Array<any> = [];

  isSong: boolean = false;
  private limitSearch: number = 10;
  private offset: number = 0;


  private searchTimeout: any = null;

  constructor(
    private loaderController: LoadingController,
    private callService: CallService,
    private songService: SongService
  ) {}


  onChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTxt = value;

    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.performSearch();
    }, 800);
  }

  //Este busca luego de que el usuario escribio
  //Meter MessageBar para la informacion del ingreso de datos
  async performSearch() {
    if(!this.searchTxt) return;
    this.offset = 0;

    switch(this.selectedChange) {
      case 'duration': 
        const duration = parseFloat(this.searchTxt);

        if(isNaN(duration)) 
            return this.#showMessageBar('Invalid number by duration', 1)

          this.operation = {
            endpoint: 'songByDuration',
            body: {
              minDuration: duration,
              maxDuration: 10,
              limit: this.limitSearch,
              offset: this.offset * this.limitSearch
            }
          }
        break;

      case 'genre': 

          if(this.searchTxt.length <= 3) 
            return this.#showMessageBar('Please type at least 3 letters', 1);

          const mostSimilarity = this.#findMostSimilarWord(this.searchTxt, this.genres)

          this.operation = {
            endpoint: 'songByGenre', 
            body: {
              genres:mostSimilarity,
              limit: this.limitSearch,
              offset: this.offset * this.limitSearch
            }
          }

        break;

      case 'song': 
          this.operation = {
            endpoint: 'songByName',
            body:{
              name: this.searchTxt,
              offset: this.offset * this.limitSearch,
              limit: this.limitSearch,
            }
          }
        break;

      case 'artist':
        break;
    }

    // const loading = await this.loaderController.create({
    //   message: 'Buscando...',
    //   spinner: 'circular'
    // });

    // await loading.present();


    try {
      const result = await this.callService.call({
        method: 'get',
        body: this.operation.body,
        endPoint: this.operation.endpoint,
        isToken: true
      });


      if(result.message['code'] == 1 || result.message['code'] == 3) 
        return this.#showMessageBar(result.message['description'], result.message['code'])


      const data = result['data'];
      const songs = (data.Songs ? data.Songs : data).map((song: any) => ({
        id: song._id,
        title: song.name,
        song:song.url_cancion,
        image: song.image,
        artists: song.Artist ? song.Artist : song.artist,
        likes: song.likes,
        isLiked: song.isLiked
      }))
      
      this.isSong = true;
      this.songs = songs;
      console.log('ESTA ES LA INFORMACION', songs)
      this.songService.setSongs(songs);


    } catch (error) {
      console.error('Error: ', error)
      this.#showMessageBar('An error occurred during the search', 1);
    } finally {
      // await loading.dismiss();
    }

  }

  clickSeeMore =async () => {
    try{
      this.offset = this.offset++;

      const result = await this.callService.call({
        method: 'get',
        body: this.operation.body,
        endPoint: this.operation.endpoint,
        isToken: true
      });

      if(result.message['code'] == 1 || result.message['code'] == 3) 
        return this.#showMessageBar(result.message['description'], result.message['code'])

      const data = result['data']

      if(data.length <= 0) return this.#showMessageBar('No hay mas canciones', 3);

      const songs =(data.Songs ? data.Songs : data).map((song: any) => ({
        title: song.name,
        song:song.url_cancion,
        image: song.image,
        artists: song.Artist ? song.Artist : song.artists
      }))

      this.songs.push(...songs);
      this.songService.setSongs(this.songs);
      
    }catch(error){
      return this.#showMessageBar('No hay mas canciones', 3)
    }
  }

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

  #findMostSimilarWord(input: string, array: string[]): string | null {
    if (!input || array.length === 0) {
      return null;
    }
  
    const matches = stringSimilarity.findBestMatch(input, array);
    return matches.bestMatch.target;
  }


}

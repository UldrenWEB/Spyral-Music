import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Song } from '../interfaces/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private song = new BehaviorSubject<Song>({} as Song);
  private songs: Array<Song> = [];

  constructor() {}

  setSong(song: Song) {
    this.song.next(song);
  }

  getSong() {
    return this.song.asObservable();
  }

  setSongs(songs: Array<Song>) {
    this.songs = songs;
  }

  getSongs() {
    return this.songs;
  }

  resetArray() {
    this.songs = [];
  }
}

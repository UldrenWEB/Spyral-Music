import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Song } from '../interfaces/song';
import { SongService } from '../service/SongService';

@Injectable({
  providedIn: 'root',
})
export class MusicPlayerService implements OnDestroy {
  private songs: Song[] = [];
  private currentIndex: number = 0;
  private audio: HTMLAudioElement | null = null;
  currentTime$ = new BehaviorSubject<number>(0);
  duration$ = new BehaviorSubject<number>(0);
  hasPlayed$ = new BehaviorSubject<boolean>(false);
  isPlaying$ = new BehaviorSubject<boolean>(false);
  currentSong$ = new BehaviorSubject<Song | null>(null); // Add BehaviorSubject for current song
  private updateInterval: any;

  constructor(private songService: SongService) {
    this.startUpdateInterval();
  }

  ngOnDestroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  startUpdateInterval() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    this.updateInterval = setInterval(() => {
      if (this.audio) {
        this.currentTime$.next(this.audio.currentTime);
        this.duration$.next(this.audio.duration);
      }
    }, 100);
  }

  setPlaylist(songs: Song[]) {
    this.songs = songs;
  }

  getCurrentSong() {
    return this.songs[this.currentIndex];
  }

  setCurrentIndex(index: number) {
    if (index >= 0 && index < this.songs.length) {
      this.currentIndex = index;
      this.currentSong$.next(this.songs[this.currentIndex]); // Notify subscribers about song change
    }
  }

  play(index: number = this.currentIndex) {
    if (this.audio && index === this.currentIndex) {
      this.audio.play().catch((error) => {
        console.error('Error al reproducir la canción:', error);
      });
      this.isPlaying$.next(true);
      return;
    }

    if (this.audio) {
      this.audio.pause();
      this.isPlaying$.next(false);
      this.audio.removeEventListener('ended', this.handleSongEnd);
      this.audio = null;
    }

    const song = this.songs[index];

    if (song.song) {
      console.error('La canción no tiene una URL válida:', song);
      
      this.audio = new Audio(song.song);
      this.audio.play().catch((error) => {
        console.error('Error al reproducir la canción:', error);
      });
      this.audio.addEventListener('ended', this.handleSongEnd.bind(this));
      
      this.isPlaying$.next(true);
      this.hasPlayed$.next(true);
      this.songService.setSong(song);
      
      this.audio.addEventListener('loadedmetadata', () => {
        if (this.audio) {
          this.duration$.next(this.audio.duration);
        }
      });
    }

    this.currentIndex = index;
    this.currentSong$.next(song);
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying$.next(false);
    }
  }

  playNext() {
    const nextIndex = (this.currentIndex + 1) % this.songs.length;
    this.play(nextIndex);

    if(!this.songs[nextIndex].song) return;
    this.isPlaying$.next(true);
  }

  playPrevious() {
    const previousIndex = this.currentIndex - 1 < 0 ? this.songs.length - 1 : this.currentIndex - 1;
    this.play(previousIndex);

    if(!this.songs[previousIndex].song) return;
    this.isPlaying$.next(true);
  }

  private handleSongEnd() {
    this.playNext();
  }

  seekTo(position: number) {
    if (this.audio) {
      this.audio.currentTime = position;
      this.currentTime$.next(position);

      if (this.audio.paused) {
        this.audio.play().catch((error) => {
          console.error('Error al intentar reproducir después de buscar:', error);
        });
      }
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
      this.currentIndex = 0;
      this.isPlaying$.next(false);
      this.hasPlayed$.next(false);
      this.currentSong$.next(null);
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subscription, filter } from 'rxjs';
import { Song } from 'src/app/interfaces/song';
import { MusicPlayerService } from 'src/app/service/MusicPlayerService';
import { SongService } from 'src/app/service/SongService';
import { getFormattedArtists } from 'src/app/service/formattedArtist';

@Component({
  selector: 'app-song-player',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class MiniPlayerComponent implements OnInit, OnDestroy {
  currentSong: Song | null = null;
  isPlaying: boolean = false;
  currentSongSubscription?: Subscription;
  isPlayingSubscription?: Subscription;

  view: boolean = true;
  private routerSubscription?: Subscription;

  constructor(
        private playerService: MusicPlayerService,
        private songService: SongService, 
        private router: Router,
        private cdr: ChangeDetectorRef,
    ) {}

  ngOnInit(): void {

    const currentUrl = this.router.url;
    this.view = currentUrl !== '/play-song';
    this.updateView();

    this.routerSubscription = this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.view = event.url !== '/play-song';
        this.updateView()
      });

    this.currentSongSubscription = this.playerService.currentSong$.subscribe(song => {
      if (song) {
        this.currentSong = song;
        this.updateView();
      }
    });

      this.isPlayingSubscription = this.playerService.isPlaying$.subscribe(isPlaying => {
        this.isPlaying = isPlaying;
      })
  }

  updateView(){
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.currentSongSubscription?.unsubscribe();
    this.isPlayingSubscription?.unsubscribe();
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.playerService.pause();
    } else {
      this.playerService.play();
    }
  }

  playNext() {
    this.playerService.playNext();
  }

  playPrevious() {
    this.playerService.playPrevious();
  }

  stop() {
    this.playerService.stop();
  }

  
  formattedArtist = (): string => {
    return getFormattedArtists(this.currentSong?.artists, 40);
  }

  navigateToSong() {
    this.router.navigate(['/play-song']);
  }

  truncateTitle(title: string, maxLength: number): string {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    } else {
      return title;
    }
  }
}

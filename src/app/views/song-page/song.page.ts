import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { Subscription } from 'rxjs';
import { Song } from "src/app/interfaces/song";
import { MusicPlayerService } from "src/app/service/MusicPlayerService";
import { SongService } from "src/app/service/SongService";
import { getFormattedArtists } from "src/app/service/formattedArtist";

@Component({
  selector: 'app-song',
  templateUrl: 'song.page.html',
  styleUrls: ['song.page.scss']
})
export class SongPage implements OnInit, OnDestroy, AfterViewInit {
  currentSong: Song  = {};
  isPlaying: boolean = false;
  currentProgress: number = 0;
  duration: number = 0;
  timeUpdateSubscription?: Subscription;
  durationSubscription?: Subscription;
  songSubscription?: Subscription;
  isPlayingSubscription?: Subscription;

  constructor(
        private playerService: MusicPlayerService,
        private songService: SongService,
        private cdr : ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    this.currentSong = this.playerService.getCurrentSong();

    this.timeUpdateSubscription = this.playerService.currentTime$.subscribe(currentTime => {
      this.currentProgress = currentTime;
    });

    this.durationSubscription = this.playerService.duration$.subscribe(duration => {
      this.duration = duration;
    });

    this.songSubscription = this.songService.getSong().subscribe(song => {
        this.currentSong = song;
    });

    this.isPlayingSubscription = this.playerService.isPlaying$.subscribe(isPlaying => {
        this.isPlaying = isPlaying;
    })
  }

  ngOnDestroy(): void {
    this.timeUpdateSubscription?.unsubscribe();
    this.durationSubscription?.unsubscribe();
    this.songSubscription?.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.updateView();
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

  onRangeChange(event: any) {
    const newTime = event.detail.value;
    this.playerService.seekTo(newTime);
  }

  onRangeInput(event: any) {
    this.currentProgress = event.detail.value;
  }

  convertirSegundosAFormatoMinutos(segundos: number): string {
    let minutos = Math.floor(segundos / 60);
    let segundosRestantes = Math.round(segundos % 60);
    return `${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`;
  }

  updateView(): void {
    this.cdr.detectChanges();
  }

  formattedArtist = (): string => {
    return getFormattedArtists(this.currentSong.artists, 40);
  }
}

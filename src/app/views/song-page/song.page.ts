import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { Subscription } from 'rxjs';
import { Song } from "src/app/interfaces/song";
import { CallService } from "src/app/service/CallService";
import { MusicPlayerService } from "src/app/service/MusicPlayerService";
import { SongService } from "src/app/service/SongService";
import { getFormattedArtists } from "src/app/service/formattedArtist";

@Component({
  selector: 'app-song',
  templateUrl: 'song.page.html',
  styleUrls: ['song.page.scss']
})
export class SongPage implements OnInit, OnDestroy, AfterViewInit {
  isPlaying: boolean = false;
  currentProgress: number = 0;
  duration: number = 0;
  timeUpdateSubscription?: Subscription;
  durationSubscription?: Subscription;
  currentSong: Song = {};
  currentSongSubscription?: Subscription;
  isPlayingSubscription?: Subscription;
  isLiked: boolean = false;

  constructor(
    private playerService: MusicPlayerService,
    private songService: SongService,
    private cdr: ChangeDetectorRef,
    private callService: CallService
  ) {}

  currentSongReal: any  = {};

  async ngOnInit(){
    this.currentSong = this.playerService.getCurrentSong();
    
    const result = await this.callService.call({
      method: 'get',
      body: null,
      id: this.currentSong.id,
      isToken: true,
      endPoint: 'songById'
    })
    this.currentSongReal  = result['data']
    console.log('AQUI CURRENT SONG REAL', this.currentSongReal);
    this.timeUpdateSubscription = this.playerService.currentTime$.subscribe(currentTime => {
      this.currentProgress = currentTime;
    });

    this.durationSubscription = this.playerService.duration$.subscribe(duration => {
      this.duration = duration;
    });

    this.currentSongSubscription = this.playerService.currentSong$.subscribe(song => {
      if (song) {
        this.currentSong = song;
        this.updateView();
      }
    });

    this.isPlayingSubscription = this.playerService.isPlaying$.subscribe(isPlaying => {
      this.isPlaying = isPlaying;
    });
  }

  ngOnDestroy(): void {
    this.timeUpdateSubscription?.unsubscribe();
    this.durationSubscription?.unsubscribe();
    this.currentSongSubscription?.unsubscribe();
    this.isPlayingSubscription?.unsubscribe();
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

  addLike: number = 0;
  async toggleLike() {
    if(this.currentSongReal.isLiked) return;

    await this.callService.call({
      method: 'post',
      body: {
        songId: this.currentSong.id
      },
      endPoint: 'addLike',
      isToken: true
    })

    this.isLiked = true;
    this.addLike = 1;

  }

  formattedArtist = (): string => {
    return getFormattedArtists(this.currentSong.artists, 40);
  }
}

import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { Album } from "src/app/interfaces/album";
import { AlbumService } from "src/app/service/AlbumService";
import { getFormattedArtists } from "src/app/service/formattedArtist";
import { SongService } from "src/app/service/SongService";


@Component({
    selector: 'app-playlist',
    templateUrl: 'playlist.component.html',
    styleUrls: ['playlist.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        CommonModule
    ]
})
export class PlaylistComponent {
    
    @Input() title: string = '';
    @Input() tracks: Array<any> = [];
    imageSrc: string = 'https://firebasestorage.googleapis.com/v0/b/spiralmusicapp.appspot.com/o/spiralLogo.svg?alt=media&token=ec544c81-bcbb-4718-b107-e29146cdd189';
    
    constructor(
        private albumService: AlbumService,
        private songService: SongService,
        private router: Router
    ) {}
    
    
    private album : Album = {
        image: this.imageSrc,
        name: this.title,
        tracks: this.tracks
    }

    onClick = () => {
        console.log('Prueba aqui', this.tracks)
        const tracks = (!this.tracks ? []: this.tracks ).map(track => ({
            image: track.image,
            artists: track.artists,
            id: track.id,
            title: track.title,
            song: track.song,
            likes: track.likes,
            isLiked: track.isLiked
        }))
        this.albumService.setAlbum({
            image: this.imageSrc,
            name: this.title,
            tracks: tracks
        });


        this.songService.setSongs(tracks);
        this.router.navigate(['/view-album']);
    }

    
    truncateText(text: string, maxLength: number): string {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        } else {
            return text;
        }
    }

    // formattedArtist = () : string => {
    //     return getFormattedArtists(this.artists, 20);
    // }
}


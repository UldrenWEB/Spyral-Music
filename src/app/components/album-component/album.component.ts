import { CommonModule } from "@angular/common";
import { Component, Input} from "@angular/core";
import { Router } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { Album } from "src/app/interfaces/album";
import { AlbumService } from "src/app/service/AlbumService";
import { getFormattedArtists } from "src/app/service/formattedArtist";


@Component({
    selector: 'app-album-component',
    templateUrl: 'album.component.html',
    styleUrls: ['album.component.scss'],
    standalone: true,
    imports:[
        IonicModule,
        CommonModule
    ]
})
export class AlbumComponent{
    @Input() imageSrc: string = '';
    @Input() title: string = '';
    @Input() artists: Array<string> = [];
    @Input() tracks: Array<Object> = [];
    @Input() genres: Array<string> = [];
    
    private album : Album = {
        image: this.imageSrc,
        genres: this.genres,
        name: this.title,
        tracks: this.tracks
    }

    constructor(private router: Router, private albumService: AlbumService){}

    onRedirect = () => {
        this.albumService.setAlbum(this.album);
        this.router.navigate(['/view-album']);
    }

    truncateText(text: string, maxLength: number): string {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        } else {
            return text;
        }
    }

    formattedArtist = () : string => {
        return getFormattedArtists(this.artists, 20);
    }

}
import { Injectable } from "@angular/core";
import { Album } from "../interfaces/album";


@Injectable({
    providedIn: 'root'
})
export class AlbumService {
    private album : Album = {};

    getAlbum(): Album{
        return this.album;
    }

    setAlbum(album: Album): void{
        this.album = album;
    }
}
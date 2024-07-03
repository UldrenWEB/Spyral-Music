import { Component, OnInit } from "@angular/core";
import { Album } from "src/app/interfaces/album";
import { AlbumService } from "src/app/service/AlbumService";


@Component({
    selector: 'app-album-page',
    templateUrl: 'album.page.html',
    styleUrls: ['album.page.scss']
})
export class AlbumPage implements OnInit{
    
    private album: Album = {};


    constructor(private albumService: AlbumService){}
    
    ngOnInit(): void {
        this.album = this.albumService.getAlbum();
    }



}
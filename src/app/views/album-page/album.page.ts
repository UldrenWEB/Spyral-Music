import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Album } from "src/app/interfaces/album";
import { AlbumService } from "src/app/service/AlbumService";


@Component({
    selector: 'app-album-page',
    templateUrl: 'album.page.html',
    styleUrls: ['album.page.scss']
})
export class AlbumPage implements OnInit, AfterViewInit{
    
    album: Album = {};


    constructor(
        private albumService: AlbumService,
        private cdr : ChangeDetectorRef
    ){}
    
    ngOnInit(): void {
        this.album = this.albumService.getAlbum();
        console.log(this.album)
        this.updateView();
    }

    ngAfterViewInit(): void {
        this.updateView();
    }

    updateView(){
        this.cdr.detectChanges();
    }


}
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class GenresService {
    genres : Array<String> = [
        'pop','rock', 'salsa', 'merengue', 'flamenco', 'regueton' 
    ]

    setGenres = (genres: Array<string>) => {
        this.genres = genres;
    }

    getGenres = () => {
        return this.genres;
    }
}
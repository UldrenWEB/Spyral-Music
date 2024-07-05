import { Song } from "./song";

export interface Album {
    name?: string;
    image?: string;
    genres?: Array<string>;
    tracks?: Array<Song>;
    artists?: Array<string>;
}
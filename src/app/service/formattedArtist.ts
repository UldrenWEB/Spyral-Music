

export const getFormattedArtists = (artists: Array<string> = [], maxLength: number = 10): string => {
    if (artists.length > 1) {
        const allButLast = artists.slice(0, -1).join(', ');
        const last = artists[artists.length - 1];
        let formattedArtists = `${allButLast} & ${last}`;
        if (formattedArtists.length > maxLength) {
        return `${formattedArtists.substring(0, maxLength)}...`;
        }
        return formattedArtists;
    } else {
        return artists[0] || '';
    }
}
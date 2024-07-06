type RequestMethod = 'post' | 'get' | 'delete' | 'put';

type EndPoints = 'login' |
    'songByDuration' |
    'songByName' |
    'songByArtist' |
    'songByGenre' |
    'uploadSong' |
    'tops' |
    'addPlaylist' | 
    'register' |
    'allGenres' |
    'createArtist' |
    'deleteAccount' |
    'editProfile' |
    'allPlaylist' | 
    'modifyPlaylist' | 
    'addLike' | 
    'songById'



export {
    RequestMethod,
    EndPoints
}
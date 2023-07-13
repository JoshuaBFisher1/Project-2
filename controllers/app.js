const APIController = (function() {

    const clientId= '';
    const clientSecret = '';

    // private methods
    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type-client_credentials'
        });
        const data = await result.json();
        return data.access_token;
    }

    const _getGenres = async (token) => {

        const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
            method :'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.categories.items;
    }

    const _getPlaylisByGenre = async (token, genreId) => {

        const limit = 10;
        
        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.playlists.items;
    }

    const _getTracks = async (token, tracksEndPoint) => {

        const limit = 10;

        const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: 'GET',
            headers: {'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data;
    }

    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres(token);
        },
        getPlaylisByGenre(token, genreId) {
            return _getPlaylisByGenre(token, genreId);
        },
        getTracks(token, tracksEndPoint) {
            return _getTracks(token, tracksEndPoint)
        },
        getTrack(tokem, tracksEndPoint) {
            return _getTrack(token, tracksEndPoint)
        }
    }

})();

// UI Module
const UIController = (function() {

    //object to hold references to html selectors
    const DOMElements = {
        selectGenre: '#select_genre',
        selectPlaylist: '#select_playlist',
        buttonSubmit: '#btn_submit',
        divSongDetail: '#song-detail',
        hfToken: '#hidden_token',
        divSongList: '#.song-list'
    }

    //public methods
    return{

        //method to get input fields
        inputfield() {
            return {
                genre: document.querySelector(DOMElements.selectGenre),
                playlist: document.querySelector(DOMElements.selectPlaylist),
                songs: document.querySelector(DOMElements.divSonglist),
                submit: document.querySelector(DOMElements.buttonSubmit),
                divSongDetail: document.querySelector(DOMElements.divSongDetail)
            }
        },

        // need methods to create select list option
        createGenre(text, value) {
            const html = `<option value="${value}">${text}</option>`;
            document.querySelector(DOMElements.selectGenre).insertAdjacentHTML('beforeend', html);
        },

        createPlaylist(text, value) {
            const html = `<option value="${value}">${text}</option>`;
        },

        // need method to create a track list group item
        createTrack(id, name) {
            const html = `<a href="#" class="list-group-item list-group-item-action list-group-item-light" id="${id}">${name}</a>`;
            document.querySelector(DOMElements.divSonglist).insertAdjacentHTML('beforeend', html);
        },

        // need method to create song detail
        createSongDetail(img, title, artist) {

            const detailDiv = document.querySelector(DOMElements.divSongDetail);
            // any time user clicks a new song, we need to clear out the song detail div
            detail.Div.innerHTML = '';
            
            const html =
            `
            <div class="row col-sm-12 px-0">
                <img src="${img}" alt="">
            </div>
            <div class="row col-sm-12 px-0">
                <label for="Genre" class="form-label col-sm-12">${title}:</label>
            </div>
            <div class="row col-sm-12 px-0">
                <label for="artist" class="form-label col-sm12">By ${artist}</label>
            </div>
            `;

            detailDiv.insertAdjacentElement('beforeend', html)
        },

        resetTrackDetail() {
            this.inputField().divSongDetail.innerHTML = '';
        },

        resetTracks() {
            this.inputField().songs.innerHTML = '';
            this.resetTrackDetail()
        },

        resetPlaylist() {
            this.inputfield().playlist.innerHTML = '';
            this.resetTracks();
        }


    }
})();

const APPController = (function(UICtrl, ApiCtrl) {

    // get field object ref
    const DOMInputs = UICtrl.inputField();

    // get genres on page load
    const loadGenres = async () => {
        //get the token
        const token = await ApiCtrl.getToken();
        //get the genres
        const genres = await ApiCtrl.getGenres(token);
        //populate our genres select element
        genres.forEach(element => UICtrl.createGenre(element.name, element.id));
    }

    // create genre change event listener
    DOMInputs.genre.addEventListener('change', async () => {

        // when user changes genres, we need to reset the subsequent fields
        UICtrl.resetPlaylist();
        // get the token. add method to store the token on the page so we dont have to keep hitting the api for the token
        const token = UICtrl.getStoredToken().token;
        // get the genre select field
        const genreSelect = UICtrl.inputField().genre;
        // get the selected genreId
        const genreId = genreSelect.options[genreSelect.selectIndex].value;
        // get the playlis data from spotify based on the genre
        const playlist = await ApiCtrl.getPlaylisByGenre()
        // load the playlist select field
        playlist.forEach(p => UICtrl.createTrack(t.track.href, t.track.name))

    });

    // create submit button click event listener
    DOMInputs.submit.addEventListener('click', async (e) => {
        // prevent page reset
        e.preventDefault();
        UICtrl.resetTracks(); 
        // get the token
        const token = UICtrl.getStoredToken().token;
        // get the playlist field
        const playlistSelect = UICtrl.inputField().playlist;
        // get the selected playlist
        const tracksEndPoint = playlistSelect.options[playlistSelect.selectedIndex].value;
        // get the tracks from the api
        const tracks = await ApiCtrl.getTracks(token, tracksEndPoint);
        // populate select list
        tracks.forEach(t => UICtrl.createTrack(t.track.href, t.track.name));
    });

    DOMInputs.tracks.addEventListener('click', async (e) => {
        // prevent page reset 
        e.preventDefault();
        UICtrl.resetTrackDetail();
        // get the token
        const token = UICtrl.getStoredToken().token;
        // get the track endpoint
        const trackEndPoint = e.target.id;
        // ge the track object 
        const track = await ApiCtrl.getTrack(token, trackEndPoint);
        // load the track details
        UICtrl.createTrackDetail(track.album.images[2].url, track.name, track.artists[0].name);
    });

    return {
        init() {
            console.log('App is starting');
            loadGenres();
        }
    }

    // create song selection click event listener
    DOMInputs.songs.addEventListener('click', async (e) => {
        // prevent page reset 
        e.preventDefault();
        UICtrl.resetTrackDetail();
        // get the token
        const token = UICtrl.getStoredToken().token;
        // get the track enpoint
        const trackEndPoint = e.target.id;
        // get the track object
        const track = await ApiCtrl.getTrack(token, trackEndPoint);
        // load the track details
        UICtrl.createTrackDetail(track.album.images[2].url, track.name, track.artist[0].name);
    });

    return {
        init() {
            console.log('App is starting');
            loadGenres();
        }
    }

})(UIController, APIController);

// will need to call method to load the genres on page load
APPController.init();
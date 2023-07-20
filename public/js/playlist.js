let playlists = [];

function createPlaylist(playlistName) {
  playlists.push({ name: playlistName, songs: [] });
}

function addSongToPlaylist(playlistName, songTitle) {
  const playlist = playlists.find((playlist) => playlist.name === playlistName);
  if (playlist) {
    playlist.songs.push(songTitle);
  }
}

function removeSongFromPlaylist(playlistName, songTitle) {
  const playlist = playlists.find((playlist) => playlist.name === playlistName);
  if (playlist) {
    playlist.songs = playlist.songs.filter((song) => song !== songTitle);
  }
}

function displayPlaylists() {
  const playlistList = document.getElementById('playlist-list');
  playlistList.innerHTML = '';

  playlists.forEach((playlist) => {
    const listItem = document.createElement('li');
    listItem.textContent = playlist.name;

    const songsList = document.createElement('ul');
    playlist.songs.forEach((song) => {
      const songItem = document.createElement('li');
      songItem.textContent = song;
      songsList.appendChild(songItem);
    });

    listItem.appendChild(songsList);
    playlistList.appendChild(listItem);
  });
}

document.querySelector('.new-playlist-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const playlistName = document.getElementById('playlist-name').value.trim();

  if (playlistName !== '') {
    createPlaylist(playlistName);
    displayPlaylists();

    document.getElementById('playlist-name').value = '';
  }
});

document.getElementById('playlist-name').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const playlistName = event.target.value.trim();

    if (playlistName !== '') {
      createPlaylist(playlistName);
      displayPlaylists();

      event.target.value = '';
    }
  }
});

// Example usage:
createPlaylist('My Playlist 1');
addSongToPlaylist('My Playlist 1', 'Song 1');
addSongToPlaylist('My Playlist 1', 'Song 2');

createPlaylist('My Playlist 2');
addSongToPlaylist('My Playlist 2', 'Song 3');

displayPlaylists();
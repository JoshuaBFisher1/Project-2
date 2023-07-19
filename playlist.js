const apiUrl = `https://api.spotify.com/v1/search?q=${artistName}`;

// Function to handle genre selection
// Function to fetch music data from the API
async function fetchMusicData() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      genres = data.genres;
      populateGenreSelect();
    } catch (error) {
      console.error('Error fetching music data:', error);
    }
  }
// Function to populate the genre select dropdown
function populateGenreSelect() {
    const genreSelect = document.getElementById('genre-select');
    genres.forEach((genre) => {
      const option = document.createElement('option');
      option.value = genre.name;
      option.textContent = genre.name;
      genreSelect.appendChild(option);
    });
  }
function selectGenre() {
    const selectedGenre = document.getElementById('genre-select').value;
    const recommendedSongsList = document.getElementById('recommended-songs');
  
    // Clear the recommended songs list
    recommendedSongsList.innerHTML = '';
  
    // Find the selected genre from the fetched data
    const selectedGenreObj = genres.find((genre) => genre.name === selectedGenre);
  
    if (selectedGenreObj) {
      // Display the recommended songs based on the selected genre
      selectedGenreObj.songs.forEach((song) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${song.title} - ${song.artist}`;
        recommendedSongsList.appendChild(listItem);
      });
  
      // Show the recommended songs section
      document.getElementById('recommendations').style.display = 'block';
      // Hide the genre selection section
      document.getElementById('genre-selection').style.display = 'none';
      // Show the playlist section
      document.getElementById('playlist').style.display = 'block';
    }
  }
  
  // Function to create a playlist
  function createPlaylist() {
    const playlistName = document.getElementById('playlist-name').value;
  
    // Send the playlistName and userId to the server to create a new playlist
    // Save the playlist data to the user's account on the server
  
    // For this example, let's assume the playlist is successfully created on the server
  
    // Display the playlist in the user interface
    const playlistList = document.getElementById('playlist-list');
    const listItem = document.createElement('li');
    listItem.textContent = playlistName;
    playlistList.appendChild(listItem);
  
    // Clear the playlist name input field
    document.getElementById('playlist-name').value = '';
  }
  
  // Fetch music data from the API when the page loads
  fetchMusicData();
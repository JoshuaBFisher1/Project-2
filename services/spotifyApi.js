const fetchToken = () => {
    const data = fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: {
            "Content-Type": '"https://accounts.spotify.com/api/token"' 
        },
        body: {
            grant_type: 'client_credentials',
            client_id: 'c1d8734d55c74f279168a55db9ecaceb',
            client_secret: '7e28e879c6e84355801524b401a2c8f2'
        }
    })
    .then(data => { console.log(data.json())})

    return data;
};

fetchToken()

   .then(tokenData => {
    const accessToken = tokenData.access_token;
    console.log(accessToken);
    const artistName = '';
    const apiUrl = `https://api.spotify.com/v1/search?q=${artistName}`;
  

    fetch(apiUrl, {
    headers: {
        'Authorization': 'Bearer ' + accessToken
    }
  })

    .then(respoonse => respoonse.json())
    .then(data => {
        // handle the artist data
        console.log(data);
    })
    .catch(error => {
        // handle any errors
        console.log(error);
    });
  })
  .catch(error => {
    // handle any errors while obtaining access token
    console.error(error);
  });    

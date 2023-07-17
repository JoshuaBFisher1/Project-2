
// Got from my app on spotify
var client_id = 'c1d8734d55c74f279168a55db9ecaceb';
var client_secret = '7e28e879c6e84355801524b401a2c8f2';
var request = require('request');
var access_token = undefined;

// creating payload before sending POST request to spotify to gain access token
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

// send POST request to get access token in variable called access_token
request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    var access_token = body.access_token;
    console.log(access_token);
  }
});

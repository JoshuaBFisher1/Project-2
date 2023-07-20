const router = require('express').Router();


// The `/playlist` endpoint


router.get('/playlists/:id', (req, res) => {
  Playlist.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Playlist,
      // TODO: not done, need to have sql tables with proper column names and data rows...
      attributes: ['playlist_name',]
    }
  })
    .then(dbPlaylistData => {
      if(!dbPlaylistData) {
        res.status(404).json({message: 'No playlist found'});
        return;
      }
      res.json(dbPlaylistData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});
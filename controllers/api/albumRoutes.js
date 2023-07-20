const router = require('express').Router();


// The `/Album` endpoint


router.get('/albums/id', (req, res) => {
  Album.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Album,
      // TODO: not done, need to have sql tables with proper column names and data rows...
      attributes: ['album_name', 'other column names']
    }
  })
    .then(dbAlbumData => {
      if(!dbAlbumData) {
        res.status(404).json({message: 'No albums found'});
        return;
      }
      res.json(dbAlbumData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});
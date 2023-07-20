const router = require('express').Router();


// The `/artists` endpoint


router.get('/:id', (req, res) => {
  Artist.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Track,
      // TODO: not done, need to have sql tables with proper column names and data rows...
      attributes: ['artist_id', 'track_name', 'other column names']
    }
  })
    .then(dbArtistData => {
      if(!dbArtistData) {
        res.status(404).json({message: 'No categories found'});
        return;
      }
      res.json(dbArtistData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

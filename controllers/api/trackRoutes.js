const router = require('express').Router();


// The `/tracks` endpoint


router.get('/tracks/:id', (req, res) => {
  Track.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Track,
      // TODO: not done, need to have sql tables with proper column names and data rows...
      attributes: ['track_name', 'other column names']
    }
  })
    .then(dbTrackData => {
      if(!dbTrackData) {
        res.status(404).json({message: 'No tracks found'});
        return;
      }
      res.json(dbTrackData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

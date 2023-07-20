const router = require('express').Router();


// The `/Genre` endpoint


router.get('/recommendations/available-genre-seeds/:id', (req, res) => {
  Genre.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Genre,
      // TODO: not done, need to have sql tables with proper column names and data rows...
      attributes: ['track_name', 'other column names']
    }
  })
    .then(dbGenreData => {
      if(!dbGenreData) {
        res.status(404).json({message: 'No tracks found'});
        return;
      }
      res.json(dbGenreData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

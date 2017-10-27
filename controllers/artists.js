const Artist = require('../models/artist');

function artistsIndex(req, res, next) {
  Artist
    .find()
    .exec()
    .then(artists => res.json(artists))
    .catch(next);
}

function artistsShow(req, res, next) {
  Artist
    .findById(req.params.id)
    .exec()
    .then((artist) => {
      if(!artist) return res.notFound();
      res.json(artist);
      console.log(artist);
    })
    .catch((err) => {
      console.log('ERROR IN CATCH ===========>', err);
      next(err);
    });
}

module.exports={
  index: artistsIndex,
  show: artistsShow
};

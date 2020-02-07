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
    .populate('gigs')
    .exec()
    .then((artist) => {
      if(!artist) return res.notFound();
      res.json(artist);
    })
    .catch((err) => {
      console.log('ERROR IN CATCH ===========>', err);
      next(err);
    });
}

function artistsCreate(req, res, next) {
  Artist
    .create(req.body)
    .then(artist => res.status(201).json(artist))
    .catch(next);
}

function artistsDelete(req, res, next) {
  Artist
    .findById(req.params.id)
    .exec()
    .then((artist) => {
      if(!artist) return res.notFound();
      return artist.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports={
  index: artistsIndex,
  show: artistsShow,
  create: artistsCreate,
  delete: artistsDelete
};

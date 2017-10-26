const Artist = require('../models/artist');

function artistsIndex(req, res, next) {
  Artist
    .find()
    .exec()
    .then(artists => res.json(artists))
    .catch(next);
}

module.exports={
  index: artistsIndex
};

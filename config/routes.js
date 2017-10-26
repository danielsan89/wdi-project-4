const router = require('express').Router();
const artists  = require('../controllers/artists');
// const auth  = require('../controllers/auth');
const oauth  = require('../controllers/oauth');
// const secureRoute = require('../lib/secureRoute');

router.route('/artists')
  .get(artists.index);
//   .post(artists.create);
// .post(secureRoute, artists.create);

// router.route('/artists/:id')
//   .get(artists.show)
//   .put(secureRoute, artists.update)
//   .delete(secureRoute, artists.delete);
//
// router.route('/register')
//   .post(auth.register);
//
// router.route('/login')
//   .post(auth.login);
//
// router.route('/oauth/github')
//   .post(oauth.github);

router.route('/oauth/spotify')
  .post(oauth.spotify);

router.all('/*', (req, res) => res.notFound());

module.exports = router;

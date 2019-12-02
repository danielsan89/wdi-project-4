const router = require('express').Router();
const artists  = require('../controllers/artists');
const oauth  = require('../controllers/oauth');
const users  = require('../controllers/users');
const spotify  = require('../controllers/spotify');
const secureRoute = require('../lib/secureRoute');

router.route('/')
  .get(secureRoute, artists.index);

router.route('/profile')
  .put(secureRoute, users.update);

router.route('/profile/gigs')
  .get(secureRoute, users.show)
  .post(secureRoute, users.gigsCreate);

router.route('/profile/gigs/:id')
  .get(secureRoute, users.show)
  .delete(secureRoute, users.gigsDelete);


router.route('/oauth/spotify')
  .post(oauth.spotify);

router.route('/spotify/following')
  .get(spotify.getFollowing);


router.all('/*', (req, res) => res.notFound());

module.exports = router;

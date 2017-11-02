const rp = require('request-promise');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const User = require('../models/user');

let refreshToken = null;

function spotify(req, res, next) {
  return rp({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    form: {
      redirect_uri: 'http://localhost:8000/',
      grant_type: 'authorization_code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      code: req.body.code
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    json: true
  })
    .then(token => {
      console.log(token);
      refreshToken = token.refresh_token;

      return rp({
        method: 'GET',
        url: 'https://api.spotify.com/v1/me',
        headers: {
          'Authorization': `Bearer ${token.access_token}`
        },
        json: true
      });
    })
    .then(profile => {
      console.log(profile);
      return User
        .findOne({ $or: [{ spotifyId: profile.id }, { email: profile.email }] })
        .then((user) => {
          if(!user) {
            user = new User({
              username: profile.display_name,
              email: profile.email
            });
          }

          user.spotifyId = profile.id;
          if(profile.images.length) user.image = profile.images[0].url;
          return user.save();
        });
    })
    .then(user => {
      const payload = { userId: user.id };
      const token = jwt.sign(payload, secret, { expiresIn: '1hr' });

      res.json({ message: `Welcome ${user.username}!`, token, refreshToken, user });
    })
    .then(refreshToken => {
      return rp({
        method: 'GET',
        url: 'https://api.spotify.com/v1/me/following?type=artist&limit=50',
        headers: {
          'Authorization': `Bearer ${refreshToken}`
        },
        json: true
      });
    })
    .then(response => console.log(response))
    .catch(next);
}

module.exports = { spotify };

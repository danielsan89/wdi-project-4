const rp = require('request-promise');

// curl -X GET "https://rest.bandsintown.com/artists/The%20Flatliners/events?app_id=ijasdjsjdksdjfksdf" -H "accept: application/json"

function getGigs(req, res, next) {
  return rp({
    method: 'GET',
    url: 'https://rest.bandsintown.com/artists/$/events',
    qs: {
      artistname: 'The flatliners',
      app_id: 'myApp'
    },
    json: true
  })
    .then(response => res.json(response))
    .catch(next);
}

module.exports = { getGigs };

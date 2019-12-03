const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
  id: { type: String },
  lineup: [ String ],
  datetime: { type: String },
  country: { type: String },
  city: { type: String },
  venue: {
    name: { type: String },
    longitude: { type: String },
    latitude: { type: String }
  },
  tickets: { type: String } 
});

const userSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  username: { type: String },
  email: { type: String },
  password: { type: String},
  spotifyId: { type: String },
  gigs: [gigSchema]
});



module.exports = mongoose.model('User', userSchema);

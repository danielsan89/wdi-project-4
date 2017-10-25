const mongoose = require('mongoose');


const artistSchema = new mongoose.Schema({
  name: { type: String }
});

module.exports = mongoose.model('User', artistSchema);

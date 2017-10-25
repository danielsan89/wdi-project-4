const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  firstname: { type: String, required: 'First name is required' },
  lastname: { type: String, required: 'Last name is required' },
  username: { type: String, required: 'Username is required' },
  email: { type: String, required: 'Email is required', unique: 'That email is already taken' },
  password: { type: String, required: 'Password is required' }
});

module.exports = mongoose.model('User', userSchema);

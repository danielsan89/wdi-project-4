const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const gigSchema = new mongoose.Schema({
  id: { type: String },
  lineup: { type: String },
  datetime: { type: String },
  country: { type: String },
  city: { type: String },
  venue: { type: String }
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

// userSchema
//   .virtual('passwordConfirmation')
//   .set(function setPasswordConfirmation(passwordConfirmation) {
//     this._passwordConfirmation = passwordConfirmation;
//   });
//
// userSchema.pre('validate', function checkPassword(next) {
//   if(!this._passwordConfirmation || this._passwordConfirmation !== this.password) {
//     this.invalidate('passwordConfirmation', 'Passwords do not match');
//   }
//   next();
// });
//
// userSchema.pre('save', function hashPassword(next) {
//   if(this.isModified('password')) {
//     this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
//   }
//   next();
// });
//
// userSchema.methods.validatePassword = function validatePassword(password) {
//   return bcrypt.compareSync(password, this.password);
// };

module.exports = mongoose.model('User', userSchema);

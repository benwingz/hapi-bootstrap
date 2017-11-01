const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = mongoose.model('User', new Schema({
  email: String,
  password: String,
}));

function mockUser() {
  const newUser = new User({
    email: 'mailTest@test.com',
    password: 'password',
  });
  return newUser.save();
}

function eraseMockUser() {
  return User.deleteOne({ email: 'mailTest@test.com' });
}

module.exports = {
  mockUser,
  eraseMockUser,
};

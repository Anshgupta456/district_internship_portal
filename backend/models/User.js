const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true,"email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true,"password is required"]
  },
  role: {
    type: String,
    enum: ['student', 'government', 'university'],
    required: [true,"role is required"]
  },
  verified: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', UserSchema);

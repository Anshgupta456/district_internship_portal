// models/Profile.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student'
  },
  government: {
    type: Schema.Types.ObjectId,
    ref: 'Government'
  },
  university: {
    type: Schema.Types.ObjectId,
    ref: 'University'
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);

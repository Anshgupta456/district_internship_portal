const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GovernmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  departmentName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phno: {
    type: Number,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  jobPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'InternJobPost'
  }]
});

module.exports = mongoose.model('Government', GovernmentSchema);

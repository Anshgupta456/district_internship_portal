// models/Faculty.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacultySchema = new Schema({
  facultyName: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  collegeEmail: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  governmentID: {
    type: String,
    required: true
  },
  documents: {
    type: String,
    required: true
  },
  governmentIDDocument: {
    type: String,
    required: true
  },
  collegeIDDocument: {
    type: String,
    required: true
  },
  signature: {
    type: String,
    required: true
  }
});

module.exports = FacultySchema;

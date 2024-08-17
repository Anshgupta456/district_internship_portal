const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacultySchema = new Schema({
  name: String,
  designation: String,
  department: String,
  contact: String,
  collegeEmail: String,
  email: String,
  govID: String,
  documents: String,
  govIDDocument: String,
  collegeIDDocument: String,
  signature: String
});

const UniversitySchema = new Schema({
  _id: {
    type: String, 
    required: true
  },
  profileImage:{
    type:String,
    required:false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  universityName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  establishmentDate: {
    type: Date,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  faculty: {
    name: String,
    designation: String,
    department: String,
    contact: String,
    collegeEmail: String,
    email: String,
    govID: String,
    govIDDocument: String,
    collegeIDDocument: String,
    signature: String
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

module.exports = mongoose.model('University', UniversitySchema);

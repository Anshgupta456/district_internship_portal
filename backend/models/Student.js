const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppliedJobSchema = new Schema({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'InternJobPost',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted'],
    default: 'pending'
  }
});

const StudentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  profileImage:{
    type:String,
    required:false
  },
  universityId: {
    type: String,
    required: [true, "universityId is required"]
  },
  name: {
    type: String,
    required: [true, "name is required"]
  },
  contactNumber: {
    type: Number,
    required: [true, "contactNumber is required"]
  },
  studentId: {
    type: String,
    required: [true, "studentId is required"]
  },
  aadharNumber: {
    type: String,
    required: [true, "aadharNumber is required"]
  },
  lastPassedCourse: {
    type: String,
    required: [true, "lastPassedCourse is required"]
  },
  graduationBatch: {
    type: String,
    required: [true, "graduationBatch is required"]
  },
  graduationCourse: {
    type: String,
    required: [true, "graduationCourse is required"]
  },
  about: {
    type: String,
    required: [true, "about is required"]
  },
  documents: {
    aadharCard: {
      type: String,
      required: false
    },
    highSchoolCertificate: {
      type: String,
      required: false
    },
    secondarySchoolCertificate: {
      type: String,
      required: false
    },
    passportSizePhotograph: {
      type: String,
      required: false
    },
    signature: {
      type: String,
      required: false
    }
  },
  appliedJobs: [AppliedJobSchema],
  selectedJob: {
    type: Schema.Types.ObjectId,
    ref: 'InternJobPost',
    required: false // Change to true if a selected job is mandatory
  },
  workingHours: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Student', StudentSchema);

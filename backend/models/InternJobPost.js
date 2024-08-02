const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InternJobPostSchema = new Schema({
  opportunityType: {
    type: String,
    enum: ['Internship', 'Volunteer'],
    required: true
  },
  profile: {
    type: String,
    required: true
  },
  skillsRequired: {
    type: String,
    required: true
  },
  location: {
    type: String,
    enum: ['On-Site', 'Hybrid', 'Remote'],
    required: true
  },
  numberOfOpenings: {
    type: Number,
    required: true
  },
  startingDate: {
    type: Date,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  responsibilities: {
    type: String,
    required: true
  },
  additionalPreferences: {
    type: String
  },
  stipend: {
    type: String
  },
  perks: {
    certificate: { type: Boolean, default: false },
    recommendation: { type: Boolean, default: false },
    flexibleHours: { type: Boolean, default: false },
    food: { type: Boolean, default: false },
    travelAllowance: { type: Boolean, default: false }
  },
  government: {
    type: Schema.Types.ObjectId,
    ref: 'Government',
    required: true
  },
  selectedStudents: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }],
  appliedStudents: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

module.exports = mongoose.model('InternJobPost', InternJobPostSchema);

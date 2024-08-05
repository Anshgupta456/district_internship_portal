const mongoose = require('mongoose');
const InternJobPost = require('../models/InternJobPost');
const Government = require('../models/Government');
const Student = require('../models/Student')

exports.createJobPost = async (req, res) => {
  try {
    const { governmentId, ...jobDetails } = req.body;

    if (!mongoose.Types.ObjectId.isValid(governmentId)) {
      return res.status(400).json({ message: 'Invalid governmentId' });
    }

    // Create the job post
    const jobPost = new InternJobPost({
      ...jobDetails,
      government: new mongoose.Types.ObjectId(governmentId)
    });

    await jobPost.save();

    // Update the government entity to include this job post
    await Government.findByIdAndUpdate(governmentId, {
      $push: { jobPosts: jobPost._id }
    });

    res.status(201).json({ message: 'Job post created successfully', jobPost });
  } catch (error) {
    console.error('Error creating job post:', error);
    res.status(500).json({ message: 'Error creating job post', error });
  }
};


// Get all job posts
exports.getAllJobPosts = async (req, res) => {
  try {
    const jobPosts = await InternJobPost.find();
    res.status(200).json(jobPosts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get a single job post by ID
exports.getJobPostById = async (req, res) => {
  try {
    const jobPost = await InternJobPost.findById(req.params.id);
    if (!jobPost) {
      return res.status(404).json({ message: 'Job post not found' });
    }
    res.status(200).json(jobPost);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update a job post by ID
exports.updateJobPost = async (req, res) => {
  try {
    const jobPost = await InternJobPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!jobPost) {
      return res.status(404).json({ message: 'Job post not found' });
    }
    res.status(200).json(jobPost);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a job post by ID
exports.deleteJobPost = async (req, res) => {
  try {
    const jobPost = await InternJobPost.findByIdAndDelete(req.params.id);
    if (!jobPost) {
      return res.status(404).json({ message: 'Job post not found' });
    }
    res.status(200).json({ message: 'Job post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



exports.applyForJob = async (req, res) => {
  const { studentId } = req.body;
  const jobId = req.params.id;

  try {
    // Find the student
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Find the job
    const job = await InternJobPost.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Log student and job data for debugging
    console.log('Student:', student);
    console.log('Job:', job);

    // Check if the student has already applied for the job
    const alreadyApplied = student.appliedJobs.some(appliedJob => {
      if (!appliedJob.jobId) {
        console.error('Undefined jobId in appliedJobs:', appliedJob);
        return false;
      }
      return appliedJob.jobId.equals(jobId);
    });
    if (alreadyApplied) {
      return res.status(400).json({ message: 'Student has already applied for this job' });
    }

    // Add the job to the student's appliedJobs with the jobId set correctly
    student.appliedJobs.push({ jobId: job._id, status: 'pending' });

    // Log the appliedJobs array after pushing the new job
    console.log('Applied Jobs after push:', student.appliedJobs);

    // Add the student to the job's appliedStudents
    job.appliedStudents.push(student._id);

    // Save both documents
    await student.save();
    await job.save();

    res.status(200).json({ message: 'Successfully applied for the job' });
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.selectStudentForJob = async (req, res) => {
  const { studentId } = req.body;
  const { id: jobId } = req.params;

  try {
    // Find the job post by ID
    const job = await InternJobPost.findById(jobId);

    // Check if the job post exists
    if (!job) return res.status(404).json({ message: 'Job post not found' });

    // Check if the student is already selected for the job
    if (!job.selectedStudents.includes(new mongoose.Types.ObjectId(studentId))) {
      // Add the student to the selectedStudents array
      job.selectedStudents.push(new mongoose.Types.ObjectId(studentId));
      await job.save();
    }

    // Update the selectedJob field on the Student document
    const student = await Student.findById(studentId);

    // Check if the student exists
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Update the selectedJob field
    student.selectedJob = new mongoose.Types.ObjectId(jobId);

    // Update the status of the applied job to "accepted"
    const appliedJob = student.appliedJobs.find(appliedJob => appliedJob.jobId.toString() === jobId);
    if (appliedJob) {
      appliedJob.status = 'accepted';
    }

    await student.save();

    res.status(200).json({ message: 'Student selected for job successfully and updated on student profile' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

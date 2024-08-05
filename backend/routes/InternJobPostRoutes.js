const express = require('express');
const router = express.Router();
const internJobPostController = require('../controllers/InternJobPostController');

// Create a new job post
router.post('/', internJobPostController.createJobPost);

// Get all job posts
router.get('/', internJobPostController.getAllJobPosts);

// Get a single job post by ID
router.get('/:id', internJobPostController.getJobPostById);

// Update a job post by ID
router.put('/:id', internJobPostController.updateJobPost);

// Delete a job post by ID
router.delete('/:id', internJobPostController.deleteJobPost);

// Apply for a job
router.post('/:id/apply', internJobPostController.applyForJob);

// Select a student for a job
router.post('/:id/select', internJobPostController.selectStudentForJob);

module.exports = router;

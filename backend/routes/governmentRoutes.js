const express = require('express');
const router = express.Router();
const governmentController = require('../controllers/governmentController');

// Create a new Government user
router.post('/register', governmentController.createGovernment);

// Get all Government users
router.get('/', governmentController.getAllGovernments);

// Get a single Government user by ID
router.get('/:id', governmentController.getGovernmentById);

// Update a Government user
router.put('/:id', governmentController.updateGovernment);

// Delete a Government user
router.delete('/:id', governmentController.deleteGovernment);

// Get all Job Posts
router.get('/jobs/:id',governmentController.getGovernmentJobPosts)

router.put('/profile-image/:governmentId', governmentController.updateProfileImage);

router.get('/selected-students/:governmentId', governmentController.getSelectedStudents);
module.exports = router;

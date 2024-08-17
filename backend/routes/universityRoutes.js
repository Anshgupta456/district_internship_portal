const express = require('express');
const router = express.Router();
const universityController = require('../controllers/universityController');

// Create a new University
router.post('/register', universityController.createUniversity);

// Get all Universities
router.get('/', universityController.getAllUniversities);

// Get a single University by ID
router.get('/:id', universityController.getUniversityById);

// Update a University
router.put('/:id', universityController.updateUniversity);

// Delete a University
router.delete('/:id', universityController.deleteUniversity);

router.post('/students/register',universityController.registerStudent);

router.get('/students/:universityId',universityController.getStudentsByUniversityId);

router.put('/profile-image/:universityId', universityController.updateProfileImage);

module.exports = router;

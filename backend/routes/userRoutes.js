const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register a new user
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

// Verify user
router.put('/verify/:userId', userController.verifyUser);

// Get profiles based on role
router.get('/profile/student', userController.getStudentProfile);
router.get('/profile/government/:id', userController.getGovernmentProfile);
router.get('/profile/university', userController.getUniversityProfile);

// Get all profiles based on role
router.get('/students', userController.getAllStudents);
router.get('/governments', userController.getAllGovernments);
router.get('/universities', userController.getAllUniversities);

// Get user by ID
router.get('/:id', userController.getUserById);
module.exports = router;

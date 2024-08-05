const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const auth = require('../middleware/auth')
// Create a new student
router.post('/register', studentController.registerStudent);

// Get all students
router.get('/', studentController.getAllStudents);

// Get a single student by ID
router.get('/:id', studentController.getStudentById);

// Update a student
router.put('/:id', studentController.updateStudent);

// Delete a student
router.delete('/:id', studentController.deleteStudent);

// Login a student
router.post('/login', studentController.loginStudent); // Add this line
router.patch('/working-hours/:studentId', studentController.updateWorkingHours);

router.get('/profile', auth, async (req, res) => {
    try {
        const student = await Student.findOne({ userId: req.user._id }).populate('user');

        if (!student) {
            return res.status(404).json({ message: 'Student profile not found' });
        }

        res.status(200).json(student);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

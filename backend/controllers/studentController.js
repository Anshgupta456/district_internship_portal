const User = require('../models/User');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
// Create a new student
exports.registerStudent = async (req, res) => {
  const { user, ...studentData } = req.body;

  try {
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(user.password,10);
    const newUser = new User({
      email: user.email,
      password: hashedPassword,
      role: user.role,
    });
    await newUser.save();

    studentData.user = newUser._id;

    const student = new Student(studentData);
    await student.save();

    res.status(201).json({ message: 'Student profile created successfully', user: newUser, student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a token
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('user');
    res.status(200).json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('user');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  const { user, ...studentData } = req.body;

  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const updatedUser = await User.findByIdAndUpdate(student.user, user, { new: true });
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, studentData, { new: true });

    res.status(200).json({ message: 'Student updated successfully', user: updatedUser, student: updatedStudent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await User.findByIdAndDelete(student.user);
    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.updateWorkingHours = async (req, res) => {
  const { studentId } = req.params;
  const { workingHours } = req.body; // Expecting { workingHours: "5" }

  try {
    // Convert workingHours to a number
    const hoursToAdd = Number(workingHours);
    console.log('Parsed hours:', hoursToAdd);

    // Check if the parsed value is a valid number
    if (isNaN(hoursToAdd)) {
      return res.status(400).json({ message: 'Invalid hours value' });
    }

    // Find the student by ID
    const student = await Student.findById(studentId);

    // Check if the student exists
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Update the working hours
    student.workingHours += hoursToAdd;

    // Save the updated student document
    await student.save();

    res.status(200).json({ message: 'Working hours updated successfully', workingHours: student.workingHours });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateProfilePicture = async (req, res) => {
  try {
    const studentId = req.params.id;

    // Find the student by ID
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update the profile image with the URL provided in the request body
    student.profileImage = req.body.profileImage;
    await student.save();

    res.status(200).json({
      message: 'Profile picture updated successfully',
      profileImage: student.profileImage,
    });
  } catch (err) {
    console.error('Error updating profile picture:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
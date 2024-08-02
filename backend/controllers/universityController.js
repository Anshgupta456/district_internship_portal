const University = require('../models/University');
const User = require('../models/User');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create a new University
const createUniversity = async (req, res) => {
    const { user, universityId, ...universityData } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(user.password, 10);

        // Create a new user
        const newUser = new User({
            email: user.email,
            password: hashedPassword,
            role: user.role,
        });
        await newUser.save();

        // Add the user ID to the university data
        universityData.user = newUser._id;

        // Include the custom university ID
        universityData._id = universityId;

        // Create and save the university
        const university = new University(universityData);
        await university.save();

        res.status(201).json({ message: 'University profile created successfully', user: newUser, university });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = createUniversity;


// Get all Universities
const getAllUniversities = async (req, res) => {
    try {
        const universities = await University.find();
        res.status(200).json(universities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single University by ID
const getUniversityById = async (req, res) => {
    const { id } = req.params;

    try {
        const university = await University.findById(id);
        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }
        res.status(200).json(university);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a University
const updateUniversity = async (req, res) => {
    const { id } = req.params;
    const { universityName, email, phone, establishmentDate, country, state, district, pincode, address } = req.body;

    try {
        const updatedUniversity = await University.findByIdAndUpdate(id, { universityName, email, phone, establishmentDate, country, state, district, pincode, address }, { new: true });
        if (!updatedUniversity) {
            return res.status(404).json({ message: 'University not found' });
        }
        res.status(200).json(updatedUniversity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a University
const deleteUniversity = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUniversity = await University.findByIdAndDelete(id);
        if (!deletedUniversity) {
            return res.status(404).json({ message: 'University not found' });
        }
        res.status(200).json({ message: 'University deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Register a new Student
const registerStudent = async (req, res) => {
    const { user, ...studentData } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(user.password, 10);

        // Create a new user
        const newUser = new User({
            email: user.email,
            password: hashedPassword,
            role: user.role,
        });
        await newUser.save();

        // Add the user ID to the student data
        studentData.user = newUser._id;

        // Create and save the student
        const newStudent = new Student(studentData);
        const savedStudent = await newStudent.save();

        // Find the university and add the student to the list of students
        const university = await University.findById(studentData.universityId);
        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }

        university.students.push(savedStudent._id);
        await university.save();

        res.status(201).json({ message: 'Student registered successfully', student: savedStudent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering student', error: error.message });
    }
};

module.exports = {
    createUniversity,
    getAllUniversities,
    getUniversityById,
    updateUniversity,
    deleteUniversity,
    registerStudent,
};

const University = require('../models/University');
const User = require('../models/User');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateUniqueUniversityId = async () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    let isUnique = false;
    let uniqueId = '';

    while (!isUnique) {
        let result = '';
        for (let i = 0; i < 4; i++) {
            result += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        for (let i = 0; i < 4; i++) {
            result += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }

        // Check if the ID is unique
        const existingUniversity = await University.findById(result);
        if (!existingUniversity) {
            isUnique = true;
            uniqueId = result;
        }
    }

    return uniqueId;
};

// Create a new University
const createUniversity = async (req, res) => {
    const { user, ...universityData } = req.body;

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

        // Generate and set the custom university ID
        const uniId = await generateUniqueUniversityId();
        universityData._id = uniId;

        // Create and save the university
        const university = new University(universityData);
        await university.save();

        res.status(201).json({ message: `Your University Id is ${uniId}`, user: newUser, university });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = createUniversity;

// Other functions remain unchanged

const getAllUniversities = async (req, res) => {
    try {
        const universities = await University.find();
        res.status(200).json(universities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

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

const registerStudent = async (req, res) => {
    const { user, ...studentData } = req.body;

    try {
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newUser = new User({
            email: user.email,
            password: hashedPassword,
            role: user.role,
        });
        await newUser.save();

        studentData.user = newUser._id;

        const newStudent = new Student(studentData);
        const savedStudent = await newStudent.save();

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

const getStudentsByUniversityId = async (req, res) => {
  try {
    const { universityId } = req.params;
    const students = await Student.find({ universityId });

    if (!students || students.length === 0) {
      return res.status(404).json({ message: 'No students found for this university' });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students by universityId:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
    createUniversity,
    getAllUniversities,
    getUniversityById,
    updateUniversity,
    deleteUniversity,
    registerStudent,
    getStudentsByUniversityId
};

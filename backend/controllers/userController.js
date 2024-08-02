const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const Government = require('../models/Government');
const University = require('../models/University');
const Student = require('../models/Student');

exports.register = async (req, res) => {
  const { user, ...profileData } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create the user
    const newUser = new User(user);
    await newUser.save();

    // Create the specific profile based on the user role
    switch (user.role) {
      case 'student':
        profileData.user = newUser._id;
        const student = new Student(profileData);
        await student.save();
        break;

      case 'government':
        profileData.user = newUser._id;
        const government = new Government(profileData);
        await government.save();
        break;

      case 'university':
        profileData.user = newUser._id;
        const university = new University(profileData);
        await university.save();
        break;

      default:
        return res.status(400).json({ message: 'Invalid role' });
    }

    res.status(201).json({ message: 'User and profile created successfully', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    let profileId;

    if (user.role === 'government') {
      const government = await Government.findOne({ user: user.id }).populate('user');
      if (!government) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      profileId = government._id;
    } else if (user.role === 'student') {
      const student = await Student.findOne({ user: user.id }).populate('user');
      if (!student) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      profileId = student._id;
    } else if (user.role === 'university') {
      const university = await University.findOne({ user: user.id }).populate('user');
      if (!university) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      profileId = university._id;
    } else {
      return res.status(400).json({ message: 'Invalid user role' });
    }

    jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiration }, (err, token) => {
      if (err) throw err;
      res.json({ token, role: user.role, id: user.id, profileId });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.verified = true;
    await user.save();
    res.json({ message: 'User verified successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id }).populate('user');
    if (!student) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getGovernmentProfile = async (req, res) => {
  try {
    const government = await Government.findOne({ user: req.params.id }).populate('user');
    if (!government) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(government);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getUniversityProfile = async (req, res) => {
  try {
    const university = await University.findOne({ user: req.user.id }).populate('user');
    if (!university) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(university);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('user');
    if (!students) {
      return res.status(404).json({ message: 'No students found' });
    }
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllGovernments = async (req, res) => {
  try {
    const governments = await Government.find().populate('user');
    if (!governments) {
      return res.status(404).json({ message: 'No government profiles found' });
    }
    res.json(governments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllUniversities = async (req, res) => {
  try {
    const universities = await University.find().populate('user');
    if (!universities) {
      return res.status(404).json({ message: 'No university profiles found' });
    }
    res.json(universities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getUserById = async (req, res) => {
  try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
  }
};
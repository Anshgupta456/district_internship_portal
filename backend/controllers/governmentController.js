const Government = require('../models/Government');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Create a new Government user
const createGovernment = async (req, res) => {
    const { user, ...governmentData } = req.body;
  
    try {
      // Check if the user with the given email already exists
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
  
      // Assign the new user's _id to the government data
      governmentData.user = newUser._id;
  
      // Create a new government profile
      const government = new Government(governmentData);
      await government.save();
  
      res.status(201).json({ message: 'Government profile created successfully', user: newUser, government });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


// Get all Government users
const getAllGovernments = async (req, res) => {
  try {
    const governments = await Government.find().populate('user');
    res.status(200).json(governments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single Government user by ID
const getGovernmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const government = await Government.findById(id).populate('user');
    if (!government) {
      return res.status(404).json({ message: 'Government user not found' });
    }
    res.status(200).json(government);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a Government user
const updateGovernment = async (req, res) => {
  const { id } = req.params;
  const { user, departmentName, name, phno, designation } = req.body;

  try {
    const updatedGovernment = await Government.findByIdAndUpdate(id, { user, departmentName, name, phno, designation }, { new: true });
    if (!updatedGovernment) {
      return res.status(404).json({ message: 'Government user not found' });
    }
    res.status(200).json(updatedGovernment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a Government user
const deleteGovernment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedGovernment = await Government.findByIdAndDelete(id);
    if (!deletedGovernment) {
      return res.status(404).json({ message: 'Government user not found' });
    }
    res.status(200).json({ message: 'Government user deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getGovernmentJobPosts = async (req, res) => {
  try {
    const governmentId = req.params.id;

    const government = await Government.findById(governmentId).populate('jobPosts');

    if (!government) {
      return res.status(404).json({ message: 'Government entity not found' });
    }

    res.status(200).json(government.jobPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job posts', error });
  }
};


module.exports = {
  createGovernment,
  getAllGovernments,
  getGovernmentById,
  updateGovernment,
  deleteGovernment,
  getGovernmentJobPosts
};

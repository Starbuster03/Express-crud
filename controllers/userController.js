const User = require('../models/user');
const { validationResult } = require('express-validator');

// Create a new user
exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password
    });

    await user.save();
    res.status(201).json({ msg: 'User created successfully', user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

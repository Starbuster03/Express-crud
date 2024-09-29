const express = require('express');
const { check } = require('express-validator');
const { createUser, getAllUsers } = require('../controllers/userController');
const router = express.Router();

// Route to create a user
router.post(
  '/create',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password should be at least 6 characters').isLength({ min: 6 }),
  ],
  createUser
);

// Route to get all users
router.get('/all', getAllUsers);

module.exports = router;

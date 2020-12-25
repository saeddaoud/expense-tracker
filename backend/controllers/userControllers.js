import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateWebToken from '../utils/generateToken.js';

// @desc        Authenticate a user
// @route       POST /api/v1/users/login
// @access      Public
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  await User.findOne({ email }, async (err1, foundUser) => {
    if (err1) {
      next(err1);
    } else if (foundUser && (await foundUser.matchPasswords(password))) {
      res.json({
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        token: generateWebToken(foundUser._id),
      });
    } else {
      res.status(401);
      next(new Error('Invalid credentials'));
    }
  });
});

// @desc        Register a user
// @route       POST /api/v1/users
// @access      Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  await User.findOne({ email }, async (err1, foundUser) => {
    if (err1) {
      console.log(err1);
      next(err1);
    } else if (foundUser) {
      res.status(400);
      next(new Error('User already exists'));
    } else {
      await User.create(req.body, (err2, newUser) => {
        if (err2) {
          const errors = Object.values(err2.errors).map((error) => {
            if (error.path === 'password') {
              return 'Please enter a password of length more than 6 and less than 12 characters';
            } else {
              return error.message;
            }
          });
          next(new Error(errors));
        } else {
          res.json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateWebToken(newUser._id),
          });
        }
      });
    }
  });
});

export { registerUser, authUser };

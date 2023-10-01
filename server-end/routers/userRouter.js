const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  try {
    console.log('red', req.body);
    const { email, password, passwordVerify } = req?.body;

    //validation

    if (!email || !password || !passwordVerify) {
      return res.status(400).json({
        errorMessage: 'Enter all required fields',
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        errorMessage: 'Please enter password of at least 6 characters',
      });
    }
    if (password !== passwordVerify) {
      return res.status(400).json({
        errorMessage: 'Please enter the same password twice for verification',
      });
    }

    //Make sure no account exists for this email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        errorMessage: 'An account with this email already exists',
      });
    }

    //hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    //save new user in the database
    const newUser = new User({
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();

    //create jwt token
    const token = jwt.sign(
      {
        id: savedUser._id,
      },
      process.env.JWT_SECRET
    );
    res.cookie('token', token, { httpOnly: true }).send();
  } catch (error) {
    res.status(500).send();
    console.log(error);
  }
});
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(400).json({
        errorMessage: 'Enter all required fields',
      });
    }
    //get user account
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        errorMessage: 'Wrong email or password',
      });
    }

    //compare password
    const correctPassword = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!correctPassword) {
      return res.status(401).json({
        errorMessage: 'Wrong email or password',
      });
    }
    //create jwt token
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_SECRET
    );
    res.cookie('token', token, { httpOnly: true }).send();
  } catch (error) {
    res.status(500).send();
  }
});
router.get('/loggedIn', (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(null);

    const validatedUser = jwt.verify(token, process.env.JWT_SECRET);
    res.json(validatedUser.id);
  } catch (error) {
    return res.json(null);
  }
});

router.get('/logOut', (req, res) => {
  try {
    res.clearCookie('token').send();
  } catch (error) {
    return res.json(null);
  }
});

module.exports = router;

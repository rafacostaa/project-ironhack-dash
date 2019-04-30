// Express
const express = require('express');

const authRoutes = express.Router();

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');

const bcryptSalt = 10;

// User model
const User = require('../models/user');


authRoutes.get('/signup', (req, res, next) => {
  // res.render('indexsignup');
  res.render('indexsignup', { layout: 'layout-login-signup.hbs' });
});

authRoutes.post('/signup', (req, res, next) => {
  const { firstName } = req.body;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  if (email === '' || password === '') {
    res.render('indexsignup', { message: 'Indicate username and password' });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (user !== null) {
        res.render('indexsignup', { message: 'The username already exists' });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashPass,
      });

      newUser.save((err) => {
        if (err) {
          res.render('indexsignup', { message: 'Something went wrong' });
        } else {
          console.log(firstName, lastName, email, password);
          res.redirect('/');
        }
      });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = authRoutes;

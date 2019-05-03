// Express
const express = require('express');

const authRoutes = express.Router();

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');

const bcryptSalt = 10;

// Passport
const passport = require('passport');


// Ensure
const ensureLogin = require('connect-ensure-login');
// User model
const User = require('../models/user');


// SIGN UP GET
authRoutes.get('/signup', (req, res, next) => {
  // res.render('indexsignup');
  res.render('indexsignup', { layout: 'layout-login-signup.hbs' });
});

// SIGN UP POST
authRoutes.post('/signup', (req, res, next) => {
  const { firstName } = req.body;
  const { lastName } = req.body;
  const { username } = req.body;
  const { email } = req.body;
  const { password } = req.body;

  if (username === '' || password === '') {
    res.render('indexsignup', { message: 'Indicate username and password' });
    return;
  }

  User.findOne({ username })
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
        username,
        email,
        password: hashPass,
      });

      newUser.save((err) => {
        if (err) {
          res.render('indexsignup', { message: 'Something went wrong' });
        } else {
          console.log(firstName, lastName, username, email, password);
          res.redirect('/');
        }
      });
    })
    .catch((error) => {
      next(error);
    });
});

// LOGIN GET
authRoutes.get('/', (req, res) => {
  res.render('indexlogin', { layout: 'layout-login-signup.hbs' });
  // res.render('indexlogin');
});

// LOGIN POST
authRoutes.post('/', passport.authenticate('local', {
  successRedirect: '/form',
  failureRedirect: '/',
  failureFlash: false,
  passReqToCallback: true,
}));

// ROUTE ENSURE AUTHENTICATION
authRoutes.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('private', { user: req.user });
});

// LOG OUT
authRoutes.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = authRoutes;

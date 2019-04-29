const express = require('express');

const router = express.Router();

/* GET log in page */
router.get('/', (req, res, next) => {
  res.render('indexlogin');
});

/* GET sign up page */
router.get('/signup', (req, res, next) => {
  res.render('indexsignup');
});

/* GET home page */
router.get('/home', (req, res, next) => {
  res.render('home');
});

/* GET form page */
router.get('/form', (req, res, next) => {
  res.render('form');
});

/* GET account page */
router.get('/account', (req, res, next) => {
  res.render('account');
});

/* GET timeline page */
router.get('/timeline', (req, res, next) => {
  res.render('timeline');
});

/* GET journal page */
router.get('/timeline/journal', (req, res, next) => {
  res.render('journal');
});

/* GET account page */
router.get('/flashcard', (req, res, next) => {
  res.render('flashcard');
});
module.exports = router;

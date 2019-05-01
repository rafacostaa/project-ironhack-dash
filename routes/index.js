const express = require('express');

const router = express.Router();

const Form = require('../models/form.js');

/* GET log in page */
router.get('/', (req, res) => {
  res.render('indexlogin', { layout: 'layout-login-signup.hbs' });
});

/* GET sign up page */
// router.get('/signup', (req, res, next) => {
//   // res.render('indexsignup');
//   // res.render('indexsignup', { layout: 'layout-login-signup.hbs' });
// });

/* GET home page */
router.get('/home', (req, res) => {
  res.render('home');
});

/* GET form page */
router.get('/form', (req, res) => {
  res.render('form');
});

/* GET account page */
router.get('/account', (req, res, next) => {
  res.render('account');
});

/* GET timeline page */
router.get('/timeline', (req, res) => {
  res.render('timeline');
});


/* GET account page */
router.get('/flashcard', (req, res, next) => {
  res.render('flashcard');
});

/* POST form page */
router.post('/form', (req, res) => {
  const { codingStatus, getBetter, questionText, answerText, journal, htmlRange, cssRange, jsRange, mongoRange, reactRange, user, timestamps } = req.body;
  const questAns = { questionText, answerText };
  const usedTools = { htmlRange, cssRange, jsRange, mongoRange, reactRange }
  const newForm = new Form({ codingStatus, getBetter, questAns, journal, usedTools, user, timestamps });
  newForm.save()
    .then(() => {
      res.redirect('/home');
    })
    .catch((error) => {
      console.log(error);
    });
});


/* GET journal page */

router.get('/journal', (req, res) => {
  Form.find()
    .then((result) => {
      res.render('journal', { obj: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/test', (req, res) => {
  Form.find()
    .then((result) => {
      res.render('test', { arrenha: result });
    })
    .catch((err) => {
      console.log(err);
    });
});


module.exports = router;

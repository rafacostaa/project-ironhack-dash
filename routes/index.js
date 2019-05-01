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


router.get('/private', ensureAuthenticated, (req, res) => {
  res.render('private', {user: req.user});
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

/* GET home page */
router.get('/home', ensureAuthenticated, (req, res) => {
  res.render('home', { user: req.user });
});

/* GET form page */
router.get('/form', ensureAuthenticated, (req, res) => {
  // console.log(req.user);
  res.render('form', { user: req.user });
});

/* GET account page */
router.get('/account', ensureAuthenticated, (req, res, next) => {
  res.render('account', { user: req.user });
});

/* GET timeline page */
router.get('/timeline', ensureAuthenticated, (req, res) => {
  res.render('timeline', { user: req.user });
});


/* GET account page */
router.get('/flashcard', ensureAuthenticated, (req, res, next) => {
  res.render('flashcard', { user: req.user });
});

/* GET journal page */
router.get('/journal', ensureAuthenticated, (req, res) => {
  Form.find()
    .then((result) => {
      res.render('journal', { obj: result }, { user: req.user });
    })
    .catch((err) => {
      console.log(err);
    });
});

// /* GET home page */
// router.get('/home', (req, res) => {
  //   res.render('home');
  // });
  
  // /* GET form page */
  // router.get('/form', (req, res) => {
    //   res.render('form');
    // });
    
// /* GET account page */
// router.get('/account', (req, res, next) => {
//   res.render('account');
// });

// /* GET timeline page */
// router.get('/timeline', (req, res) => {
//   res.render('timeline');
// });


// /* GET account page */
// router.get('/flashcard', (req, res, next) => {
//   res.render('flashcard');
// });

/* POST form page */
router.post('/form', ensureAuthenticated, (req, res) => {
  console.log(req.user);
  const user = req.user._id;
  const { codingStatus, getBetter, questionText, answerText, journal, htmlRange, cssRange, jsRange, mongoRange, reactRange, timestamps } = req.body;
  const questAns = { questionText, answerText };
  const usedTools = { htmlRange, cssRange, jsRange, mongoRange, reactRange }
  const newForm = new Form({ codingStatus, getBetter, questAns, journal, usedTools, user, timestamps });
  newForm.save()
    .then(() => {
      res.render('home', { user: req.user });
    })
    .catch((error) => {
      console.log(error);
    });
});


module.exports = router;

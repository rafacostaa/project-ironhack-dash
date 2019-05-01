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
  // Form.find()
  //   .then((result) => {
  //    switch(result[0].codingStatus) {
  //      case 0 : document.getElementById('code-phrase').innerHtml = 'Baby coder => “ Now baby you are, persist and master will be."'
  //    }
    // })
    //   res.render('journal', { obj: result });
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  // const babyCoder = 'Baby coder => “ Now baby you are, persist and master will be."';
  // const horseCoder = 'Horse Coder => “ Hard is to be a horse in a word of horseman. "';
  // const codeWarrior = 'Code Warrior => “ A calm mind make a better warrior. "';
  // const codeMaster = ' Code Master => “ Humbleness and learning are the master powerfull skill. "';
  // const coderPhrase = document.getElementById('code-phrase');



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
  Form.find()
    .then((result) => {
      res.render('timeline', { obj: result });
    })
    .catch((err) => {
      console.log(err);
    });
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




module.exports = router;

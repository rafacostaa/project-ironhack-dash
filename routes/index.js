const express = require('express');
const User = require('../models/user.js');

const router = express.Router();

const User = require('../models/user.js');
const Form = require('../models/form.js');
const Qa = require('../models/qa.js');

/* GET log in page */
router.get('/', (req, res) => {
  res.render('indexlogin', { layout: 'layout-login-signup.hbs' });
});


// router.get('/private', ensureAuthenticated, (req, res) => {
//   res.render('private', { user: req.user });
// });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

/* GET form page */
router.get('/home', ensureAuthenticated, (req, res) => {
  // console.log(req.user.firstName);
  // res.render('form', { user: req.user });
  Form.find({ user: req.user._id })
    .then((result) => {
      const status = result[result.length - 1].codingStatus;
      const study = result[result.length - 1].getBetter;
      res.render('home', {
        obj: result, phrase: status, tool: study, user: req.user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/chart', ensureAuthenticated, (req, res) => {
  Form.find({ user: req.user._id })
    .then((response) => {
      res.send(200, response);
    })
    .catch(error => console.log(error));
});

/* GET form page */
router.get('/form', ensureAuthenticated, (req, res) => {
  console.log(req.user);
  res.render('form', { layout: 'layout-login-signup.hbs' });
});

/* GET account page */
router.get('/account', ensureAuthenticated, (req, res) => {
  User.findById(req.user._id)
    .then((result) => {
      //console.log('account LOGGGGGGG', result);
      res.render('account', { obj: result });
    })
    .catch((err) => {
      console.log(err);
    });
});



/* GET chart page */
router.get('/chart', ensureAuthenticated, (req, res, next) => {
  res.render('chart', { user: req.user });
});

/* GET timeline page */
router.get('/timeline', (req, res) => {
  Form.find()
    // .populate('user')
    .then((result) => {
      // console.log(result)
      res.render('timeline', { form: result });
    })
    .catch((err) => {
      console.log(err);
    });
});


/* GET flashcard page */
router.get('/flashcard', ensureAuthenticated, (req, res, next) => {
  Qa.find({ user: req.user._id })
    .then((result) => {
      const ramdonObject = result[Math.round(Math.random() * (result.length))];
      console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$', ramdonObject);
      res.render('flashcard', { obj: result, rdnobj: ramdonObject });
    })
    .catch((err) => {
      console.log(err);
    });
});

/* GET journal page */
router.get('/journal', ensureAuthenticated, (req, res) => {
  Form.find({ user: req.user._id })
    .then((result) => {
      res.render('journal', { obj: result });
    })
    .catch((err) => {
      console.log(err);
    });
});


/* POST form page */
router.post('/form', ensureAuthenticated, (req, res) => {
  console.log(req.user);
  const user = req.user._id;
  const {
 codingStatus, getBetter, questionText, answerText, journal, htmlRange, cssRange, jsRange, mongoRange, reactRange, timestamps 
} = req.body;
  const questAns = { questionText, answerText };
  const usedTools = {
 htmlRange, cssRange, jsRange, mongoRange, reactRange 
};
  const newForm = new Form({
 codingStatus, getBetter, questAns, journal, usedTools, user, timestamps 
});
  newForm.save()
    .then(() => {
      res.redirect('home');
    })
    .catch((error) => {
      console.log(error);
    });
});

/* POST FlashCard page */
router.post('/flashcard', ensureAuthenticated, (req, res) => {
  console.log(req.user);
  const user = req.user._id;
  const { questionText, answerText, timestamps } = req.body;
  const questAns = { questionText, answerText };
  const newForm = new Qa({ questAns, user, timestamps });
  newForm.save()
    .then(() => {
      res.redirect('/flashcard');
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post('/update', ensureAuthenticated, (req, res) => {
  console.log('REQ-BODY>>>>>>>>>>>', req.body);
  const { firstName, lastName, email } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { $set: { firstName, lastName, email } })
    .then((result) => {
      console.log('UPDATE>>>>>>>>>>', result);
      res.redirect('/account');
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/delete', ensureAuthenticated, (req, res) => {
  User.findOneAndRemove({ _id: req.user._id })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;

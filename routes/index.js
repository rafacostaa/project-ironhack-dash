const User = require('../models/user.js');


const express = require('express');

const router = express.Router();

const Form = require('../models/form.js');

const Qa = require('../models/qa.js');
// const User = require('../models/user.js');
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
  res.render('private', { user: req.user });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

/* GET home page */
// router.get('/home/:id', ensureAuthenticated, (req, res) => {
//   let userId = req.params.id;
//   console.log(req.user, userId);
//   User.findOne({'_id': userId})
//   .populate('user')
//   .then(x => {
//     if (!x) {
//         return res.status(404).render('not-found');
//     }
//     res.render("home", { x })
//   })
//   .catch(next)
// });

// /* GET home page */
// router.get('/home', ensureAuthenticated, (req, res) => {

//   console.log(req.user);
//   res.render('home', { user: req.user });
//   // User.findById()
//   //   .then((result) => {
//   //     res.render('home', { banana: result });
//   //   })
//   //   .catch((err) => {
//   //     console.log(err);
//   //   });
// });


/* GET form page */
router.get('/home', ensureAuthenticated, (req, res) => {
  // console.log(req.user.firstName);
  // res.render('form', { user: req.user });
  Form.find({ user: req.user._id})
    .then((result) => {
      const arrHtml = [];
      result.forEach((element) => {
        arrHtml.push(element.usedTools.htmlRange);
      });
      const arrCSS = [];
      result.forEach((element) => {
        arrCSS.push(element.usedTools.cssRange);
      });
      const arrJS = [];
      result.forEach((element) => {
        arrJS.push(element.usedTools.jsRange);
      });
      const arrMongo = [];
      result.forEach((element) => {
        arrMongo.push(element.usedTools.mongoRange);
      });
      const arrReact = [];
      result.forEach((element) => {
        arrReact.push(element.usedTools.reactRange);
      });

      console.log('TESSSSSTE', arrReact);
      const status = result[result.length - 1].codingStatus;
      console.log('>>>>>>>>>>>>>>>>>>', status);
      res.render('home', { obj: result, phrase: status });
    })
    .catch((err) => {
      console.log(err);
    });
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
router.get('/form', ensureAuthenticated, (req, res) => {
  console.log(req.user);
  res.render('form');
});

/* GET account page */
router.get('/account', ensureAuthenticated, (req, res, next) => {
  res.render('account');
});

/* GET account page */
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


/* GET account page */
router.get('/flashcard', ensureAuthenticated, (req, res, next) => {
  Qa.find({ user: req.user._id})
    .then((result) => {
      console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$', result);
      res.render('flashcard', { obj: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

/* GET journal page */
router.get('/journal', ensureAuthenticated, (req, res) => {
  Form.find({ user: req.user._id})
    .then((result) => {
      res.render('journal', { obj: result });
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


module.exports = router;

var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var gravatar = require('gravatar');
var User = require("../models/user");
var Logs = require("../models/logs");

function createLog(action, category, username) {
  var logData = {
    username: username,
    action: action,
    time: new Date(),
    category: category
  }
  Logs.create(logData, (error, log) => {
    if (error) {
      return next(error);
    }
  });
}


//Render home page
router.get('/', (req, res, next) => {
  if(!req.user) {
    return res.redirect('/dashboard/login');
  } else if (req.user.firstUse){
    return res.redirect('/dashboard/team');
  } else {
    Logs.find({username: req.user.username}).sort('-time').limit(15).exec(function(err, logs) {
      return res.render('./dashboard/index', {logs: logs, imageURL: req.user.imageURL, currentDate: new Date()});
    });
  }
});

//Render login page
router.get('/login', (req, res, next) => {
  if (req.user) {
    return res.redirect('/dashboard');
  }
  return res.render('./dashboard/login');
});

//LOGIN user
router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user) {
    if (err) {
      return res.render('./dashboard/login', { error : err.message });
    }
    if (!user) {
      return res.render('./dashboard/login', { error : 'Invalid credentials.' });
    }
    req.logIn(user, function(err) {
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});

//LOGOUT user
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/dashboard');
});

//Render register page
router.get('/register', (req, res, next) => {
  // if (req.user.username != 'MINET' || !req.user.username) {
  //   return res.redirect('/dashboard');
  // }
  return res.render('./dashboard/register');
});

//REGISTER user
router.post('/register', function(req, res) {
  User.register(new User({
      username : req.body.username,
      email: req.body.email,
      schoolName: req.body.schoolName,
      slack: {
        email: req.body.slackEmail,
        password: req.body.password
      }
    }), req.body.password, function(err, user) {
    if (err) {
      return res.render('./dashboard/register', { error : 'That team-name has already been taken.' });
    }
    createLog('Account created', 'edit', req.body.username);
    return res.render('./dashboard/register', { error : 'Team registered successfully.' });
  });
});

//Render team page
router.get('/team', (req, res, next) => {
  return res.render('./dashboard/team');
});

//Edit team page
router.post('/team', function(req, res) {
  User.findById(req.user.id, function(err, user) {
    if (!user) {
      return res.redirect('/dashboard');
    } else {
      //design
      user.team.design.p1.name = req.body.designParticipant1Name;
      user.team.design.p1.email = req.body.designParticipant1Email;
      user.team.design.p1.imageURL = gravatar.url(user.team.design.p1.email);
      user.team.design.p2.name = req.body.designParticipant2Name;
      user.team.design.p2.email = req.body.designParticipant2Email;
      user.team.design.p2.imageURL = gravatar.url(user.team.design.p2.email);
      user.team.design.p3.name = req.body.designParticipant3Name;
      user.team.design.p3.email = req.body.designParticipant3Email;
      user.team.design.p3.imageURL = gravatar.url(user.team.design.p3.email);

      //quiz
      user.team.quiz.p1.name = req.body.quizParticipant1Name;
      user.team.quiz.p1.email = req.body.quizParticipant1Email;
      user.team.quiz.p1.imageURL = gravatar.url(user.team.quiz.p1.email);
      user.team.quiz.p2.name = req.body.quizParticipant2Name;
      user.team.quiz.p2.email = req.body.quizParticipant2Email;
      user.team.quiz.p2.imageURL = gravatar.url(user.team.quiz.p2.email);

      //programming
      user.team.programming.p1.name = req.body.programmingParticipant1Name;
      user.team.programming.p1.email = req.body.programmingParticipant1Email;
      user.team.programming.p1.imageURL = gravatar.url(user.team.programming.p1.email);
      user.team.programming.p2.name = req.body.programmingParticipant2Name;
      user.team.programming.p2.email = req.body.programmingParticipant2Email;
      user.team.programming.p2.imageURL = gravatar.url(user.team.programming.p2.email);

      //gaming
      user.team.gaming.p1.name = req.body.gamingParticipant1Name;
      user.team.gaming.p1.email = req.body.gamingParticipant1Email;
      user.team.gaming.p1.imageURL = gravatar.url(user.team.gaming.p1.email);
      user.team.gaming.p2.name = req.body.gamingParticipant2Name;
      user.team.gaming.p2.email = req.body.gamingParticipant2Email;
      user.team.gaming.p2.imageURL = gravatar.url(user.team.gaming.p2.email);

      //surprise
      user.team.surprise.p1.name = req.body.surpriseParticipant1Name;
      user.team.surprise.p1.email = req.body.surpriseParticipant1Email;
      user.team.surprise.p1.imageURL = gravatar.url(user.team.surprise.p1.email);
      user.team.surprise.p2.name = req.body.surpriseParticipant2Name;
      user.team.surprise.p2.email = req.body.surpriseParticipant2Email;
      user.team.surprise.p2.imageURL = gravatar.url(user.team.surprise.p2.email);

      //pitching
      user.team.pitching.p1.name = req.body.pitchingParticipant1Name;
      user.team.pitching.p1.email = req.body.pitchingParticipant1Email;
      user.team.pitching.p1.imageURL = gravatar.url(user.team.pitching.p1.email);

      user.firstUse = 0;

      user.save();
      createLog('Team Info Updated', 'edit', req.user.username);
      return res.redirect('/dashboard/team');
    }
  });
});

//Render startup page
router.get('/startup', (req, res, next) => {
  return res.render('./dashboard/startup');
});


//Edit startup page
router.post('/startup', function(req, res) {
  User.findById(req.user.id, function(err, user) {
    if (!user) {
      return res.redirect('/dashboard');
    } else {
      user.startup.name = req.body.startupName;
      user.startup.description = req.body.startupDescription;
      user.startup.industry = req.body.startupIndustry;
      user.startup.imageURL = req.body.startupImage;
      user.save();
      createLog('Startup Info Updated', 'edit', req.user.username);
      return res.redirect('/dashboard/startup');
    }
  });
});

//Render funds page
router.get('/funds', (req, res, next) => {
  if (!req.user.username) {
    return res.redirect('/dashboard');
  }
  Logs.find({username: req.user.username, 'category': 'funds'}).sort('-time').exec(function(err, logs) {
    return res.render('./dashboard/funds', {logs: logs});
  });
});


//Render manage page
router.get('/manage', (req, res, next) => {
  if (req.user.username != 'minet123' || !req.user.username) {
    return res.redirect('/dashboard');
  }
  User.find().sort('username').exec(function(err, teams) {
    return res.render('./dashboard/manage', { teams: teams });
  });
});

//ADD EVENT RESULTS
router.post('/manage-results', function(req, res) {
  User.findOne({schoolName: req.body.teamName1}).exec(function(err, team) {
    var fundsToBeAdded;
    if (req.body.eventPosition == 1) {
      fundsToBeAdded = 100000;
    } else if (req.body.eventPosition == 2) {
      fundsToBeAdded = 75000;
    } else if (req.body.eventPosition == 3) {
      fundsToBeAdded = 50000;
    }
    team.funds += parseInt(fundsToBeAdded);
    team.save();
    createLog('Obtained #' + req.body.eventPosition + ' in ' + req.body.eventName, 'funds', team.username);
    return res.redirect('/dashboard/manage');
  });
});

//ADD STOCKS MANUALLY
router.post('/manage-manual', function(req, res) {
  User.findOne({schoolName: req.body.teamName2}).exec(function(err, team) {
    var fundsToBeAdded = req.body.stockValue;
    team.funds += parseInt(fundsToBeAdded);
    team.save();
    createLog(fundsToBeAdded + ' due to ' + req.body.stockReason, 'funds', team.username);
    return res.redirect('/dashboard/manage');
  });
});

router.post('/manage-dq', function(req, res) {
  User.findOne({schoolName: req.body.teamName3}).remove().exec();
  return res.redirect('/dashboard/manage');
});

router.get('/logs', (req, res, next) => {
  if (req.user.username != 'minet123' || !req.user.username) {
    return res.redirect('/dashboard');
  }
  Logs.find().sort('-time').exec(function(err, logs) {
    return res.render('./dashboard/logs', { logs: logs });
  });
});

module.exports = router;

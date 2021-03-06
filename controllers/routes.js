var momentTimeZone = require('moment-timezone');
var moment = require('moment');
var Appointment = require('../models/appointment');

module.exports = function(app, passport) {

var timeZones = function() {
  return momentTimeZone.tz.names();
  }

//==========INDEX============
  app.get('/', function (req, res) {
      res.render('index', {
        user: req.user,
        title: 'Save My Date',
      });
  });

//========LOGIN=============
  app.get('/login', function(req, res) {
      res.render('login', {
      message: req.flash('loginMessage'),
      layout: 'home'
      });
  });

// process the login form
  app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/user', // redirect to /user secure
      failureRedirect : '/login',
      failureFlash : true
  }));

// ====SIGNUP =================
// show the signup form
  app.get('/signup', function(req, res) {
      res.render('signup', {
      message: req.flash('signupMessage')
        });
  });

// =====process the signup form==
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/user', //successful, send to user view
    failureRedirect : '/#downloads', //failure send back to form
    failureFlash : true
  }));


// ====LOGGED_IN===============
  app.get('/user', isLoggedIn, function(req, res) {
    // Appointment.find()
    //     .then(function (appointments) {
          res.render('user', {
              user : req.user,
              timeZone: timeZones(),
              // appointments: appointments,
              loggedIn: true, // get the user out of session and pass to template
              layout: 'home'
          });
      });
  // });

//==============FACEBOOK=============
  app.get('/auth/facebook', passport.authenticate('facebook', {scope : 'email'}));
  //callback after facebook authentication
  app.get('/auth/facebook/callback',
          passport.authenticate('facebook', {
              successRedirect : '/user',
              failureRedirect : '/login'
          }));

//==============GOOGLE=================
//send to google for auth return basic info
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
app.get('/auth/google/callback',
        passport.authenticate('google', {
                successRedirect : '/user',
                failureRedirect : '/login'
}));


// =====LOGOUT ======================
  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
      });

//===========APPOINTMENTS=============



// route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {
      if (req.isAuthenticated())
          return next();
      res.redirect('/');
  }


};


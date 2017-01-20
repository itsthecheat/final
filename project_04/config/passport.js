//load passport strategies
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var auth = require('./auth');
//load user model
var User = require('../models/users')
//export to app
module.exports = function(passport) {

//pp session setup for persistent login sessions
//pp serialize and unserialze users out of session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//===============LOCAL SIGNUP======================================
//=================================================================

//uses username by default, overiding with email
passport.use('local-signup', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true //passes entire request to callback
},
function(req, email, password, done) {
  //asynch, User.findOne won't fire unless data sent back
  process.nextTick(function() {

  //find user whose email is same as forms, checking if alredy exist
  User.findOne({ 'local.email' : email }, function(err, user) {
    //return errors
    if (err)
      return done(err);
    //check if email exists
    if (user) {
      return done(null, false, req.flash('signupMessage', 'Sorry! That email is already taken.'));
    } else {
      //if not, create user
      var newUser = new User();
      //set credentials
      newUser.local.email = email;
      newUser.local.password = newUser.generateHash(password);
      //save user
      newUser.save(function(err) {
        if (err)
          throw err;
        return done(null, newUser);
        console.log(newUser)
      });
    }
  });
  });
}));

//===============LOCAL LOGIN======================================
//================================================================
passport.use('local-login', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) { // callback w/ form email and password
  User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err)
        return done(err);
      if (!user)
        return done(null, false, req.flash('loginMessage', 'No user found.'));
// user found password wrong
      if (!user.validPassword(password))
        return done(null, false, req.flash('loginMessage', 'Email or password incorrect, please try again.'));
// success
         return done(null, user);
        });

    }));

//=================FACEBOOK LOGIN===================================
//==================================================================
passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : auth.facebookAuth.clientID,
        clientSecret    : auth.facebookAuth.clientSecret,
        callbackURL     : auth.facebookAuth.callbackURL,
        profileFields   : ["emails", "displayName"]
        // passReqToCallback: true

    },

    //facebook sends back token and profile
    function(token, refreshToken, profile, done) {

      process.nextTick(function(){
        User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
          if (err)
            return done(err);
          if (user) {
            return done(null, user);
          } else {
            var newUser = new User();

            newUser.facebook.id = profile.id;
            newUser.facebook.token = token;
            newUser.facebook.name = profile.displayName;
            newUser.facebook.email = profile.emails[0].value;

            newUser.save(function(err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
    });
}));

//================GOOGLE LOGIN========================================
//====================================================================
passport.use(new GoogleStrategy({

  clientID            : auth.googleAuth.clientID,
  clientSecret        : auth.googleAuth.clientSecret,
  callbackURL         : auth.googleAuth.callbackURL,
  profileFields   : ["emails", "displayName"]

},
function(token, refreshToken, profile, done) {
  //asynch, won't fin user until all data back from google
  process.nextTick(function() {
    User.findOne({ 'google.id' : profile.id }, function(err, user) {
      if (err)
        return done(err);
      if (user) {
        return done(null, user);
      } else {
        var newUser = new User();

        newUser.google.id = profile.id;
        newUser.google.token = token;
        newUser.google.name = profile.displayName;
        newUser.google.email = profile.emails[0].value;

        newUser.save(function(err) {
          if (err)
            throw err;
          return done(null, newUser);
        });
      }
    });
  });
}));

};


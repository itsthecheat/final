const dotenv = require('dotenv').config({path: '.env'});
const exp = require('express');
const bodyParser = require('body-parser'); //body parser
const methodOverride = require('method-override'); //method override
const app = exp();
const session = require('express-session');
const PORT = process.env.PORT || 3000;
const fetchUrl = require('fetch').fetchUrl;
const request = require('request');
const sass = require('node-sass');
const exphbs = require('express-handlebars');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

var ACCOUNTSID = process.env.TWILIO_ACCOUNT_ID;
var AUTHTOKEN = process.env.TWILIO_AUTH_TOKEN;

var twilio = require('twilio');
var client = new twilio.RestClient(ACCOUNTSID, AUTHTOKEN);

var appointments = require('./controllers/appointments');
var scheduler = require('./scheduler');

//databse stuff
const db = require('./config/database.js');
// mongoose.connect(db.url); // connect to our database


//passport
const passport = require('passport');
const flash    = require('connect-flash');
app.use(session({ secret: 'blahblahblahbleck' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//views/middleware configs
app.engine('handlebars', exphbs({
  layoutsDir: __dirname + '/views/layouts/',
  defaultLayout: 'main',
  partialsDir: [__dirname + '/views/partials/']
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.locals.pretty = true
app.use('/', exp.static(__dirname + '/public'));
app.use('/bower_components',  exp.static(__dirname + '/bower_components'));
app.use(methodOverride('_method')) //method override
app.use(bodyParser.urlencoded({
  extended: false
  // app.use(favicon(__dirname + '/public/imgages/favicon.ico'));
})); //body parser
app.use(bodyParser.json()); //body parser
app.use(cookieParser());
app.use(morgan('dev'));
app.locals.moment = require('moment');

require('./config/passport')(passport);
require('./controllers/routes')(app, passport);
require('./controllers/appointments')(app, client, db);
var scheduler = require('./scheduler');

app.use('./controllers/appointments', appointments);
app.use('/user', appointments);


// dynamically set controllers(routes)
fs.readdirSync('./controllers').forEach(function(file) {
    routes = require('./controllers/' + file);
});

//start the server
app.listen(PORT, function() {
  console.log('things that make you go hmmm on port ' + PORT);
});

scheduler.start();

module.exports = app;

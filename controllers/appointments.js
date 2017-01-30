var momentTimeZone = require('moment-timezone');
var Appointment = require('../models/appointment');
var moment = require('moment');

module.exports = function(app, client) {


app.post('/', function(req, res, next) {
  var phoneNumber = req.body.phoneNumber;
  var notification = req.body.notification;
  var timeZone = req.body.timeZone;
  var time = moment(req.body.time, "MM-DD-YYYY hh:mma");

  var appointment = new Appointment({
    phoneNumber: phoneNumber,
    notification: notification,
    timeZone: timeZone,
    time: time
  });
  appointment.save()
    .then(function () {
      console.log(appointment)
      res.redirect('/user');
    });
});


// var job = new CronJob({
//   cronTime: '00 58 11 * * *',
//   onTick: function() {
//     client.messages.create({
//       from:'+17755834363',
//       to: '+16105041170',
//       body: "Hello from leslies Node Server!"
//     }, function(err, message) {
//       if(err) {
//         console.log(err.message);
//       }
//     })
//   },
//   start: false,
//   timeZone: 'America/New_York'
// })
// job.start();

}
// app.get('/test', function(req,res) {

//     client.messages.create({
//       from:'+17755834363',
//       to: '+16105041170',
//       body: "Hello from Node"
//     }, function(err, message) {
//       if(err) {
//         console.log(err.message);
//       }
//     })

// });

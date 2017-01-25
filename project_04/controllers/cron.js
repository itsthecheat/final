var CronJob = require('cron').CronJob;
var Appointment = require('../models/appointment')
var mongoose = require('mongoose')
var moment = require('moment')

module.exports = function(app, client) {

// app.get('/appointments', function(req, res) {

// })

app.post('/user', function(req, res, next) {
  var phoneNumber = req.body.phoneNumber;
  var notification = req.body.notification;
  var time = moment(req.body.time, "MM-DD-YYYY hh:mma");
  console.log(req.body)
  var appointment = new Appointment({
    phoneNumber: phoneNumber,
    notification: notification,
    time: time
  });
  appointment.save()
    .then(function () {
      console.log(appointment)
      res.redirect('/user');
    });
});


var job = new CronJob({
  cronTime: '00 58 11 * * *',
  onTick: function() {
    client.messages.create({
      from:'+17755834363',
      to: '+16105041170',
      body: "Hello from leslies Node Server!"
    }, function(err, message) {
      if(err) {
        console.log(err.message);
      }
    })
  },
  start: false,
  timeZone: 'America/New_York'
})
job.start();

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

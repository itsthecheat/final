var mongoose = require('mongoose');
var moment = require('moment');
var twilio = require('twilio');
var momentTimeZone = require('moment-timezone');



var AppointmentSchema = new mongoose.Schema({
  phoneNumber: String,
  notification : String,
  timeZone: String,
  time : {type : Date, index : true}
});


AppointmentSchema.methods.requiresNotification = function (date) {
  return Math.round(moment.duration(moment(this.time).tz(this.timeZone).utc()
                          .diff(moment(date).utc())
                        ).asMinutes()) === this.notification;
  console.log(date)
};

AppointmentSchema.statics.sendNotifications = function(callback) {

  // now
  var searchDate = new Date();
  Appointment
    .find()
    .then(function (appointments) {
      appointments = appointments.filter(function(appointment) {
              return appointment.requiresNotification(searchDate);
      });
      if (appointments.length > 0) {
        sendNotifications(appointments);
      }
    });

    // Send messages to all appoinment owners via Twilio
    function sendNotifications(docs) {
        var client = new twilio.RestClient(ACCOUNTSID, AUTHTOKEN);
        docs.forEach(function(appointment) {
            // Create options to send the message
            var options = {
                to: "+1" + appointment.phoneNumber,
                from: '+17755834363',
                body: "Just a reminder that you have an appointment coming up  " + moment(appointment.time).calendar() +"."
            };

            // Send the message!
            client.sendMessage(options, function(err, response) {
                if (err) {
                    // Just log it for now
                    console.error(err);
                } else {
                    // Log the last few digits of a phone number
                    var masked = appointment.phoneNumber.substr(0,
                        appointment.phoneNumber.length - 5);
                    masked += '*****';
                    console.log('Message sent to ' + masked);
                }
            });
        });

        // Don't wait on success/failure, just indicate all messages have been
        // queued for delivery
        if (callback) {
          callback.call(this);
        }
    }
};
var Appointment = mongoose.model('appointment', AppointmentSchema);
module.exports = Appointment;
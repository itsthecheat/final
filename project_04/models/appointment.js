var mongoose = require('mongoose');
var moment = require('moment');
var twilio = require('twilio');

var AppointmentSchema = new mongoose.Schema({
  phoneNumber: String,
  notification : String,
  time : {type : Date, index : true}
});


var Appointment = mongoose.model('appointment', AppointmentSchema);
module.exports = Appointment;

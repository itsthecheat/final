var mongoose = require('mongoose');
var moment = require('moment');
var cfg = require('../config');
var twilio = require('twilio');

var AppointmentSchema = new mongoose.Schema({
  name:String,
  phoneNumber: String,
  notification : Number,
  timeZone : String,
  time : {type : Date, index : true}
});


var Appointment = mongoose.model('appointment', AppointmentSchema);
module.exports = Appointment;

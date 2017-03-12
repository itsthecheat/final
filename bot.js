var Appointment = require('../models/appointment')

module.exports = {
  start: function() {
    Appointment.sendNotifications();
 }
};

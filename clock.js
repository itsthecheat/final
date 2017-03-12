var CronJob = require('cron').CronJob;
var bot = require('./bot.js');

new CronJob({
  cronTime: "00 * * * * *",
  onTick: bot.start(),
  start: true,
});

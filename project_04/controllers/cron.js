var CronJob = require('cron').CronJob;

module.exports = function(app, client, db) {

app.get('/appointments', function(req, res) {

})

app.post('/appointments', function(req, res) {
  console.log(req.body)
})


// var job = new CronJob({
//   cronTime: '00 01 19 * * *',
//   onTick: function() {
//     client.messages.create({
//       from:'+17755834363',
//       to: '+16468296511',
//       body: "Hello from LBrs Node Server!"
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

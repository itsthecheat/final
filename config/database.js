var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var uri = 'mongodb://heroku_3l38vkt2:u5p08rh9d2mfpb4li7lv0mrodq@ds139969.mlab.com:39969/heroku_3l38vkt2';

  mongoose.connect(uri || 'mongodb://localhost:27017/users_p04');



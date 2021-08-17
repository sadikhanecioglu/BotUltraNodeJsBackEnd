var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password: String,
  phone:String,
  roles:[String],
  createddate:Date,
  lastlogindate:Date,
  lastloginip:String

});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
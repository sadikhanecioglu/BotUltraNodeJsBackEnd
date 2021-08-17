var mongoose = require('mongoose'); 


var ZyngaSchema = new mongoose.Schema({  
    name: String,
    description: String,
    status:Number,
    isactive:Boolean,
    createddate:Date,
    loginusername:String,
    loginpassword:String,
    currentimage: 
    { data: Buffer, contentType: String }
  });
  mongoose.model('ZyngaBot', ZyngaSchema);
  
  module.exports = mongoose.model('ZyngaBot');
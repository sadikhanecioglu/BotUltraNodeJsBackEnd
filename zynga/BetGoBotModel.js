var mongoose = require('mongoose'); 


var BetGoSchema = new mongoose.Schema({  
    botname: String,
    method: String,
    log_level:String,
    log_date:Date,
    message:String,
    current_image: 
    { data: Buffer, contentType: String }
  });
  mongoose.model('BetGoBot', BetGoSchema); 
  module.exports = mongoose.model('BetGoBot');
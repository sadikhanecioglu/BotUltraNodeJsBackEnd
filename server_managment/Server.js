var mongoose = require('mongoose'); 

const ServerSchema = new mongoose.Schema({  
    
    name: String,
    description: String,
    type:Number,
    status:Number,
    ip:String,
    username:String,
    password:new mongoose.Schema({iv:String,content:String},{_id:false}),
    isactive:Boolean
    
  });



mongoose.model('Server', ServerSchema);
module.exports = mongoose.model('Server');
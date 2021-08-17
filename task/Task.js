var mongoose = require('mongoose'); 


var TaskSessionProcess = new mongoose.Schema({
    _id:false,
    processtype:String,
    action:String,
    runafterwaittime:Number
});

var TaskSessionInfo = new mongoose.Schema({
    _id:false,
    url:String,
    drivertype:Number,
    cron:String,
    pageloadtimeout:Number,
    hub:String,
    waitqueroutingkey:String,
    sendroutingkey:String,
    process:[
        TaskSessionProcess
    ]

});

var TaskExportInfo = new mongoose.Schema({
    _id:false,
    exporttype:Number,
    options:{}

});

var TaskSession = new mongoose.Schema({
    taskid:{type:mongoose.Schema.Types.ObjectId,ref:'Task'},
    cron: String,
    url:String,
    drivertype:Number,
    pageloadtimeout:Number,
    hub:String,
    sendqueroutingkey:String,
    senddate:Date,
    wantquerotingkey:String,
    complatedate:Date,
    status:Number,
    statusdesc:String,
    message:String,
    reviceddate:Date,
    process:[
        TaskSessionProcess
    ]

});




var TaskSchema = new mongoose.Schema({  
  name: String,
  description: String,
  createddate:Date,
  status:Number,
  sourceid:String,
  source:String,
  lastrundate:Date,
  lastcomplatedate:Date,
  sessioninfo:TaskSessionInfo,
  exportinfo:TaskExportInfo,
  sessions:[TaskSession],
  isactive:Boolean

});
mongoose.model('Task', TaskSchema);

module.exports = mongoose.model('Task');
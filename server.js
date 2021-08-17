var app = require('./app');
var port = process.env.PORT || 3000;
const rhub = require('./channel/hub');
const taskconsumes = require('./task/TaskConsume')
const zyngaConsume = require('./zynga/ZyngaConsume')
const taskjops = require('./task/TaskJops')
const realtime = require('./realtime/index')
var http = require('http').Server(app);
var db = require("./database/mongodb");

rhub.connect(function () {
  taskconsumes.initConsumes();

  //zyngaConsume.initConsumes();
  //concceted rabbit

  //start task jops
  taskjops.startJops().then(function (jops) { 
    console.log("finish register");
  }
  , function (err) { 
  
    console.log("start jop error");
    console.log(err);
  
  });


});

db.initDatabase();

var server = app.listen(port, function () {
  console.log('Express server listening on port ' + port);
});




realtime.realtimestart(server);
var joprunner = require('../jop/joprunner');
var hub = require('../channel/hub')
var Task = require('./Task');

taskQueueName = 'taskqueue'
const botExchange = 'nodejs.bot.radarbot'
const botRoutingKey = 'nodejs.bot.command'
var callback = function (jop, done) {
    //executeing task jop
    //send bot command

    console.log(`${Date().toString()} - cron:${jop.data.sessioninfo.cron} %s taskid işleme alınıyor`, jop.data._id);

    //sleep(10000);

    //console.log(jop.data);

    var botsession =  {

        SessionId:"",
        TaskId:jop.data._id.toString(),
        Hub:jop.data.sessioninfo.hub,
        Heandless:jop.data.sessioninfo.heandless,
        UseDriver:jop.data.sessioninfo.drivertype,
        Url:jop.data.sessioninfo.url,
        UrlFamily:'genel',
        PageLoadTimeOut:jop.data.sessioninfo.pageloadtimeout,
        SendRoutingKey:jop.data.sessioninfo.waitqueroutingkey,
        RadarBotProcess:[]
    }
   // console.log("Bot session tamam");
    for (const process of jop.data.sessioninfo.process) {
        
        botsession.RadarBotProcess.push({

            ProcessType:process.processtype,
            Action:process.action,
            RunAfterWaitTime:process.runafterwaittime
        });
    }
   // console.log("process tamam");
    
   
    var botcommand =  {

        Command:1,
        Message:JSON.stringify(botsession)


    }
   // console.log(jop.data.sessioninfo.sendroutingkey);
   // console.log(botcommand)
    hub.sendMessageExchange(botExchange,jop.data.sessioninfo.sendroutingkey,botcommand);
    //console.log(botsession);
    console.log(`bota gönderilen mesaj`)

    done();


};


module.exports.startJops = function () {


    return new Promise(function (resolve, reject) {


        Task.find({isactive:true}, function (err, tasks) {


            for (const task of tasks) {
    
                console.log(task.sessioninfo.cron);
                joprunner.taskRegister(task._id.toString(), task, callback, {
                    delay: 100
                    //,
                //    repeat: {
                //         every: 5000
                //     }
                    // ,removeOnComplete: true
                });
                console.log("task: %s register", task.name);
            }

            if (err)
                reject(err);
            else
                resolve(joprunner.queues);

        });


    });
    //joprunner.queueRegister(taskQueueName);

}


function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}
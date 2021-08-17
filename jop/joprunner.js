const Queue = require('bull');
var config = require('../config');

queues = []
tasks = []
module.exports.queues = queues;

const queueRegister = function (queueName) {


    const q = new Queue(queueName, config.redis_connection);
    queues.push({ queueName: queueName, queue: q,lastRunDate:null });
 


}

module.exports.queueRegister = queueRegister;

const taskRegister = function (queueName,task_data, call_back,options) {

    var qmodel = queues.find(_ => _.queueName == queueName);
    if(qmodel == null){
        console.log("qmodel bulunamadı yeni que oluşturuluyor");
        const q = new Queue(queueName, config.redis_connection);
        qmodel = { queueName: queueName, queue: q,lastRunDate:null };
        queues.push(qmodel);
    }
    var qq = qmodel.queue;
    qq.empty();
    qq.process(call_back);
    qq.add(task_data, options);
 
}

module.exports.taskRegister = taskRegister;


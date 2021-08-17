const amqp = require("amqplib/callback_api");
var config = require('../config'); // get config file

let ch = null;

const initWorker = async () => {

    amqp.connect(config.rabbit_connection, function (err, conn) {
        if (err) { console.log(err); throw err; }
    
        else {
            conn.createChannel(function (err, channel) {
                if (err) { console.log(err); throw err; }
                ch = channel;
                console.log("connected rabbit channel");
               
            });
        }
    });


};

// initWorker().then(() => {
//     console.log("> Worker running");
//   });

process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});
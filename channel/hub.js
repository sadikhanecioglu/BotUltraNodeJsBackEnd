const amqp = require("amqplib/callback_api");
var config = require('../config'); // get config file

let ch = null;

const connect = function (call_back){

    amqp.connect(config.rabbit_connection, function (err, conn) {
        if (err) { console.log(err); throw err; }

        else {
            console.log("connected rabbit");
            conn.createChannel(function (err, channel) {
                if (err) { console.log(err); throw err; }
                ch = channel;
                console.log("connected rabbit channel");
                call_back(ch);

            });
        }
    });


};

module.exports.connect = connect;



function registerExchangeConsume(exchange, routingKey, call_back) {
    //console.log(ch);
    ch.assertExchange(exchange, 'direct', { durable: true });
    ch.assertQueue('', { exclusive: true }, function (err, q) {

        if (err) throw err;

        ch.bindQueue(q.queue, exchange, routingKey);

        ch.consume(q.queue, call_back);
        console.log(`consume ${routingKey} dinleniyor `);
    });

}

module.exports.registerExchangeConsume = registerExchangeConsume;

function sendMessageExchange(exchange,routingKey,msg){
    ch.assertExchange(exchange, 'direct', {
        durable: true
      });

      //console.log(`${exchange} - ${routingKey} - ${JSON.stringify(msg)} Mesaj gönderiliyor`)

    ch.publish(exchange,routingKey,Buffer.from(JSON.stringify(msg)));
    
   // console.log(`${exchange} - ${routingKey} - ${msg} Mesaj gönderildi`)
}

module.exports.sendMessageExchange = sendMessageExchange;


function registerExchange(exchange) {
    ch.assertExchange(exchange, 'direct', { durable: false });
}

module.exports.registerExchange = registerExchange;
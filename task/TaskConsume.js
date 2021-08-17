const rhub = require('../channel/hub');

const exchange = "nodejs.bot.radarbot";
const consumebotkey = "nodejs.bot.testlisten";

// const exchange = "rivalo.exchange.live";
// const consumebotkey = "rivalo.bot.pylive";

const initConsumes = function ()  {


    rhub.registerExchangeConsume(exchange,consumebotkey,function(msg){

        console.log("Gelen Mesaj");
        
        console.log(msg.content.toString());

    });

};

module.exports.initConsumes = initConsumes;
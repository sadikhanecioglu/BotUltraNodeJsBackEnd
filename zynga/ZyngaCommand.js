var hub = require('../channel/hub')
const botExchange = 'nodejs.bot.radarbot'
const sendCommand = function(command,value){





    var botcommand =  {
        Command:command,
        Message:JSON.stringify(value)

    }
   // console.log(jop.data.sessioninfo.sendroutingkey);
   // console.log(botcommand)
    hub.sendMessageExchange(botExchange,'nodejs.bot.command',botcommand);
    //console.log(botsession);
    console.log(`bota gönderilen mesaj`)

} 



module.exports.sendCommnad = sendCommand;
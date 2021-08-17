const rhub = require('../channel/hub');
var ZyngaBotModel = require('./ZyngaBotModel');
var BetGoBotModel = require('./BetGoBotModel');
const realtime = require('../realtime/index');

const exchange = "nodejs.bot.zyngabot";
const consumebotkey = "nodejs.bot.current_screen";
const consumebetgobotkey = "nodejs.betgobot.logdata";

// const exchange = "rivalo.exchange.live";
// const consumebotkey = "rivalo.bot.pylive";

const initConsumes = function () {

    console.log("zynga consume edildi");
    rhub.registerExchangeConsume(exchange, consumebotkey, function (msg) {

        console.log("Zynga Gelen Mesaj");

        reviceData = JSON.parse(msg.content.toString())
        // console.log(typeof(reviceData.curentScreen))
        // console.log(reviceData)
        //var baseImage = new Buffer(reviceData.curentScreen, 'base64').toString('binary');
        //console.log(reviceData.curentScreen.toString('base64'))

        var buffer = new Buffer.from(reviceData.curentScreen);
        var bufferBase64 = buffer.toString('base64');
        //console.log(bufferBase64.substring(0,5));
        //  var base64data = Buffer.from('some binary data', 'binary').toString('base64');
        //console.log(reviceData.curentScreen.toString().substring(0,5))
        //console.log(reviceData.curentScreen.getBytes())
        var img = { data: reviceData.curentScreen, contentType: 'image/png' }
        // require("fs").writeFile("out.png", img.data, 'base64', function(err) {
        //     console.log(err);
        //   });
        realtime.realtimeemit(img.data)

        ZyngaBotModel.findOneAndUpdate({ _id: '5ed76095e7e5f93ddcc15531' }, {
            $set: {
                "currentimage": img
            }
        }, { new: true }, function (err, task) {
            if (err) console.log(err);
            else
                console.log("Kayıt Başarılı");
        });

    });

    //for betgo bots
    rhub.registerExchangeConsume(exchange, consumebetgobotkey, function (msg) {


        console.log("Betgo Gelen Mesaj");
        reviceData = JSON.parse(msg.content.toString())
        var img = { data: reviceData.current_image, contentType: 'image/png' }
        realtime.realtimeemit(img.data)

        BetGoBotModel.create({

            log_date: new Date(),
            log_level: reviceData.log_level,
            botname: reviceData.botname,
            message: reviceData.message,
            method: reviceData.method,
            current_image: img


        }, function (err, model) {
            if (err) console.log(err);
            else
                console.log("Kayıt Başarılı");

        });




    });


};

module.exports.initConsumes = initConsumes;
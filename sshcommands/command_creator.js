const {
    KillAll,
    Selenium,
    LiveBotCommand,
    GenericBotCreateCommand,
    EndCommand,
    ScreenListCommand,
    StartVpn,
    StopVpn,
    CurlIp,
    RestartServer,
    BullitenLiveBot,
    BotNodeCreateCommand
} = require("./gobots");

const AllComands = {
    KillAll,
    Selenium,
    LiveBotCommand,
    GenericBotCreateCommand,
    ScreenListCommand,
    KillAll,
    StartVpn,
    StopVpn,
    CurlIp,
    RestartServer,
    BullitenLiveBot,
    BotNodeCreateCommand
};

module.exports = {
    createCommand(context) {
        let returnCommand = "";
        const commands = context.GetCommand(";");
        var type = commands[0].split("=")[1];
        const CommandType = AllComands[type];

        var atr = commands[1].split("=");
        var attr;

        console.log(`Atr ${JSON.stringify(atr)} \n`)
        if (atr[0] == "attrs") {

            var attrs = JSON.parse(atr[1]);
            console.log(`attrs ${JSON.stringify(attrs)} \n`)
            for (let index = 0; index < attrs.length; index++) {
                const attrElement = attrs[index];
                returnCommand += new CommandType(attrElement).command;
            }
            //console.log(`returnCommand \n ${returnCommand} \n`)
        } else {
            attr = JSON.parse(atr[1]);
            returnCommand = new CommandType(attr).command;
        }

        return returnCommand;
        // console.log(type);
        // console.log(attr);
    },
    createParams(context) {
        var params = context.GetParams(";");
        return JSON.parse(params);
    },
    createKillAllCommand(appName) {
        return new KillAll({ apps: appName }).command;
    },
    createSeleniumCommand() {
        return new Selenium().command;
    },
    endCommand(command) {
        return new EndCommand(command).command;
    },
    screenListCommand() {
        return new ScreenListCommand().command;
    },
    startVpnCommand(region) {
        return new StartVpn({ region: region }).command;
    },
    stopVpnCommand() {
        return StopVpn().command
    },
    curlIpCommand(url) {
        return CurlIp(url).command
    }
};
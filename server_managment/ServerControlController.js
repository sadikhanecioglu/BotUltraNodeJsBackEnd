var express = require("express");
var exec = require("ssh-exec");
var router = express.Router();
var VerifyToken = require(__root + "auth/VerifyToken");
var Server = require("./Server");
var StreamPlayist = require("../video_stream/StreamPlayist");
var bcrypt = require("bcryptjs");
const { decrypt } = require("../utility/crypto");
const {
  lockercommand,
  bulletincommand,
  livebotcommand,
} = require("../sshcommands/gobots");
const { ffmpegStreamCommand } = require("../sshcommands/streamcommands");
const commandFactory = require("../sshcommands/command_creator");
const { CommandContext } = require("../sshcommands/interpret _command");
const { registerExchange } = require("../channel/hub");
const path = require("path");
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.post("/", async function (req, res) {
  //console.log(req.body);

  Server.findOne({ _id: req.body.serverid }, async function (err, server) {
    var command = "";
    // console.log(server);
    // console.log(server.password.iv);

    if (req.body.runtype == 1) {
      switch (req.body.command) {
        case "lockercommand":
          command = lockercommand();

          break;
        case "bulletincommand":
          command = bulletincommand();
          break;
        case "ffmpegcommand":
          let playists = await StreamPlayist.find({ isactive: true });
          command = ffmpegStreamCommand(playists);

          break;
        case "livebotcommand":
          command = livebotcommand(req.body.parameter);
          break;
      }
    } else if (req.body.runtype == 2) {
      command = `#!/bin/bash`;
      var context = new CommandContext(req.body.command, req.body.parameter);
      const cmd = commandFactory.createCommand(context);
      const prm = commandFactory.createParams(context);

      if (prm.killall) {
        //console.log(commandFactory.createKillAllCommand(prm.killall).command);
        command += commandFactory.createKillAllCommand(prm.killall);
      }
      if (prm.selenium) {
        command += commandFactory.createSeleniumCommand();
      }
      command += cmd;
      command = commandFactory.endCommand(command);

      if (prm.screenlist) {
        command += commandFactory.screenListCommand();
      }

      //console.log(command);
      console.log(`returnCommand \n ${command} \n`);
      // var cmdTree = [];
      // for (let index = 0; index < expressionsValues.length; index++) {

      //   const cmd = expressionsValues[index].split(':');

      // }

      //return res.status(500).send("Test");
    } else {
      command = req.body.command;
    }

    console.log(
      `Runing exec \\n Server_ip: ${server.ip}/${server.username} \\n Command: ${command}`
    );
    try {
      exec(
        command,
        {
          user: server.username,
          host: server.ip,
          password: decrypt(server.password),
        },
        function (err, stdout, stderr) {
          // console.log(err, stdout, stderr);

          if (err) {
            console.log(err);
            return res.status(500).send(`Command Error ${err}`);
          }
          res.status(200).send({ result: "System Status", output: stdout });
          // return ReS(res, { result: "System Status", output: stdout }, 200);
        }
      );
    } catch (error) {
      res.status(200).send({ result: "System Status", output: error });
    }

    if (err)
      return res.status(500).send("There was a problem finding the Server.");
    //res.status(200).send(server);
  });
});

module.exports = router;

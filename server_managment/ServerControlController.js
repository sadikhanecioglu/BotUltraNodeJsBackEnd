var express = require("express");
var exec = require("ssh-exec");
var rexec = require('remote-exec');
var router = express.Router();
var VerifyToken = require(__root + "auth/VerifyToken");
var Server = require("./Server");
var StreamPlayist = require("../video_stream/StreamPlayist");
var bcrypt = require("bcryptjs");
const { decrypt } = require("../utility/crypto");
const {
    lockercommand,
    bulletincommand,
    bahigoBulletincommand,
    otherbullitencommand,
    tipicocommand,
    tipicoTestcommand,
    tipbetTestcommand,
    prsTestcommand
} = require("../sshcommands/gobots");
const { ffmpegStreamCommand } = require("../sshcommands/streamcommands");
const commandFactory = require("../sshcommands/command_creator");
const { CommandContext } = require("../sshcommands/interpret _command");
const { registerExchange } = require("../channel/hub");
const path = require("path");
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.post("/", async function(req, res) {
    //console.log(req.body);

    try {
        Server.findOne({ _id: req.body.serverid }, async function(err, server) {
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
                    case "bahigobulletincommand":
                        command = bahigoBulletincommand();
                        break;
                    case "otherbulletincommand":
                        break;
                        command = otherbullitencommand();
                        break;
                    case "tipicocommand":
                        command = tipicocommand()
                        break;
                    case "tipicoTestcommand":
                        command = tipicoTestcommand()
                        break;
                    case "tipbetTestcommand":
                        command = tipbetTestcommand()
                        break;
                    case "prsTestcommand":
                        command = prsTestcommand()
                        break;
                    case "ffmpegcommand":
                        let playists = await StreamPlayist.find({ isactive: true });
                        command = ffmpegStreamCommand(playists);

                        break;
                    case "livebotcommand":
                        // command = livebotcommand(req.body.parameter);
                        break;
                }
            } else if (req.body.runtype == 2) {

                command = `#!/bin/bash`;
                var context = new CommandContext(req.body.command, req.body.parameter);
                const cmd = commandFactory.createCommand(context);
                const prm = commandFactory.createParams(context);

                if (prm.killall) {
                    command += commandFactory.createKillAllCommand(prm.killall);
                }
                if (prm.selenium) {
                    command += commandFactory.createSeleniumCommand();
                }
                command += cmd;
                //command = commandFactory.endCommand(command);

                if (prm.screenlist) {
                    command += commandFactory.screenListCommand();
                }


                console.log(`returnCommand \n ${command} \n`);

            } else {
                command = req.body.command;
            }

            console.log(
                `Runing exec \\n Server_ip: ${server.ip}/${server.username} \\n Command: ${command}`
            );

            if (true) {
                executeCommand(command, {
                        user: server.username,
                        host: server.ip,
                        password: decrypt(server.password),
                    }).then(data => res.status(200).send(data))
                    .catch(err => res.status(200).send(err))
            } else {
                executeRemoteCommand(command, {
                        user: server.username,
                        host: server.ip.toString(),
                        password: decrypt(server.password),
                    }).then(data => res.status(200).send(data))
                    .catch(err => res.status(200).send(err))
            }

            // try {

            // } catch (error) {
            //   res.status(200).send({ result: "System Status", output: error });
            // }

            if (err)
                return res.status(500).send("There was a problem finding the Server.");
            //res.status(200).send(server);
        });
    } catch (error) {
        res.status(500).send("Exception Server.");
    }

});

const executeCommand = (command, opts) => {
    return new Promise((resolve, reject) => {

        try {
            exec(
                command,
                opts,
                function(err, stdout, stderr) {

                    if (err) {
                        console.log(err);
                        reject({ result: "System Status Error", output: err.message })
                        return
                        // return res.status(500).send(`Command Error ${err}`);
                    }
                    resolve({ result: "System Status", output: stdout })
                        //res.status(200).send({ result: "System Status", output: stdout });

                }
            ).pipe(process.stdout, function(err, data) {
                if (err) {
                    reject({ result: "System Status Error", output: err.message })
                    return
                }
                resolve({ result: "System Status", output: data })
                    //resolve(data)
                    //console.log(data)
            });


        } catch (error) {
            reject({ result: "System Status Error", output: error.message }) // calling `reject` will cause the promise to fail with or without the error passed as an argument
            return // and we don't want to go any further
        }


    });
}

const executeRemoteCommand = (commands, opts) => {
    return new Promise((resolve, reject) => {

        try {
            rexec(
                opts.host,
                commands, {

                    username: opts.user,
                    password: opts.password,
                    pty: true

                },
                function(err, stdout) {

                    console.log("stdout", stdout)
                    if (err) {
                        console.log(err);
                        reject({ result: "System Status Error", output: err })
                        return
                        // return res.status(500).send(`Command Error ${err}`);
                    } else {
                        resolve({ result: "System Status", output: process.stdout })
                    }

                    //res.status(200).send({ result: "System Status", output: stdout });

                }
            );


        } catch (error) {
            reject({ result: "System Status Error", output: error }) // calling `reject` will cause the promise to fail with or without the error passed as an argument
            return // and we don't want to go any further
        }


    });
}

module.exports = router;
var express = require('express');
var router = express.Router();
var VerifyToken = require(__root + 'auth/VerifyToken');
var Server = require('./Server');
const { encrypt } = require('../utility/crypto');
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
//Create New Task

router.post('/', VerifyToken, function(req, res) {

    var hashedPassword = encrypt(req.body.password);
    console.log(req.body);

    Server.create({
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        status: req.body.status,
        ip: req.body.ip,
        username: req.body.username,
        password: hashedPassword,
        isactive: req.body.isactive
    }, function(err, server) {

        console.log(err)

        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(server);

    });

});

//Getall task for user
router.get('/', function(req, res) {

    Server.find({}, function(err, servers) {

        if (err) return res.status(500).send("There was a problem finding the servers.");
        res.status(200).send(servers);

    });

});

// UPDATES A SINGLE Task IN THE DATABASE
router.put('/', VerifyToken, function(req, res) {


    Server.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, function(err, server) {
        if (err) return res.status(500).send("There was a problem updating the Server.");
        res.status(200).send(server);
    });
});

//Get single task for user
router.get('/:id', VerifyToken, function(req, res) {

    Server.find({ _id: req.params.id }, function(err, server) {

        if (err) return res.status(500).send("There was a problem finding the Server.");
        res.status(200).send(server);

    });

});

// DELETES A task FROM THE DATABASE
router.delete('/:id', VerifyToken, function(req, res) {
    Server.findOneAndRemove({ _id: req.params.id }, function(err, server) {
        if (err) return res.status(500).send("There was a problem deleting the Server.");
        res.status(200).send("Task: " + server.name + " was deleted.");
    });
});








module.exports = router;
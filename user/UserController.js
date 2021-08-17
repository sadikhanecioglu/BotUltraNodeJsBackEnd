var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require(__root + 'auth/VerifyToken');
var VerifyAdminToken = require(__root + 'auth/VerifyAdminToken');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('./User');
var bcrypt = require('bcryptjs');

// CREATES A NEW USER
router.post('/', VerifyAdminToken, function (req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        roles: req.body.roles
    },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', VerifyAdminToken, function (req, res) {

    const pageindex = req.query.pageindex || 0 ;
    const pagesize = req.query.pagesize || 1000;

    User.find({}).skip(pagesize * pageindex).limit(Number.parseInt(pagesize)).then(
        function (users) {
            res.status(200).send(users);
        }, function (err) {
            console.log(err)
            res.status(500).send("There was a problem finding the users.");
        });

});

// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/', VerifyAdminToken, function (req, res) {
    User.findByIdAndUpdate(req.body._id, req.body, { new: true }, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', VerifyAdminToken, function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', VerifyAdminToken, function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        console.log(err)
        console.log(user)
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: " + user.name + " was deleted.");
    });
});




module.exports = router;
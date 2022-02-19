var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var VerifyToken = require(__root + "auth/VerifyToken");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const path = require('path');

router.get("/:id", function(req, res) {
    res.sendFile(path.join(__dirname, '/view/index.html'));
});

module.exports = router;
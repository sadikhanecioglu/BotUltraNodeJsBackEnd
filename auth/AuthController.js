var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var VerifyToken = require("./VerifyToken");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require("../user/User");
var request = require("request");

/**
 * Configure JWT
 */
var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
var bcrypt = require("bcryptjs");
var config = require("../config"); // get config file

router.post("/login", function (req, res) {
  console.log(req.body.Email);
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send("Error on the server.");
    if (!user)
      return res.status(401).send({
        success: false,
        token: null,
        message: "Kullanıcı Adınız Yanlıştır",
      });

    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid)
      return res
        .status(401)
        .send({ success: false, token: null, message: "Şifreniz Yanlıştır" });

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id, roles: user.roles }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({ success: true, token: token });
  });
});

router.get("/logout", function (req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.post("/register", function (req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    },
    function (err, user) {
      if (err)
        return res
          .status(500)
          .send("There was a problem registering the user`.");

      // if user is registered without errors
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400, // expires in 24 hours
      });

      res.status(200).send({ auth: true, token: token });
    }
  );
});

router.get("/me", VerifyToken, function (req, res, next) {
  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });
});

router.get("/convertlink/:id", function (req, res, next) {
  request.get(
    "https://wlc.fn.sportradar.com/rivalo/tr/Europe:Berlin/gismo/match_timeline/" +
      req.params.id,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const match = JSON.parse(body);
        console.log(match.doc);

        let unix_timestamp = match.doc[0].data.match.ptime;
        var date = new Date(unix_timestamp * 1000);

        var diff = Math.abs(new Date() - date);

        if (match.doc[0].data.match.p == "2") diff += 45;

        var minutes = Math.floor(diff / 1000 / 60);
        // console.log(" m: " +minutes + " start: "+ format_time(match.doc[0].data.match._dt.uts) + " current: " + format_time(match.doc[0].data.match.ptime) );
        var xmlStr =
          '<?xml version="1.0" encoding="UTF-8"?>' +
          '<match id="' +
          req.params.id +
          '" name="' +
          match.doc[0].data.match.teams.home.abbr +
          " - " +
          match.doc[0].data.match.teams.away.abbr +
          '" time = "' +
          minutes +
          '" score = "'+match.doc[0].data.match.result.home+':'+match.doc[0].data.match.result.away+'"  >' +
          "</match>";

        res.set("Content-Type", "text/xml");
        res.status(200).send(xmlStr);
        //console.log(body);
      }
    }
  );
});

module.exports = router;

var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var VerifyToken = require(__root + "auth/VerifyToken");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var ZyngaBotModel = require("./ZyngaBotModel");
var zyngabotcommand = require("./ZyngaCommand");
var BetGoBotModel = require("./BetGoBotModel");

router.post("/", VerifyToken, function (req, res) {
  ZyngaBotModel.create(
    {
      name: req.body.name,
      description: req.body.description,
      createddate: Date().toString(),
      status: req.body.status,
      isactive: req.body.isactive,
      loginusername: req.body.loginusername,
      loginpassword: req.body.loginpassword,
    },
    function (err, ZyngaBotModel) {
      console.log(err);

      if (err)
        return res
          .status(500)
          .send("There was a problem adding the information to the database.");
      res.status(200).send(ZyngaBotModel);
    }
  );
});

//Getall task for user
router.get("/", function (req, res) {
  ZyngaBotModel.find({ isactive: true }, function (err, zyngabots) {
    if (err)
      return res.status(500).send("There was a problem finding the tasks get.");

    for (let index = 0; index < zyngabots.length; index++) {
      const element = zyngabots[index];
      element.imageData = element.currentimage.data.toString("base64");
      //zynga[index] = element;
      // console.log(zyngabots)
    }

    res.status(200).send(zyngabots);
  });
});
//Get single task for user
router.get("/:id", function (req, res) {
  ZyngaBotModel.find({ _id: req.params.id }, function (err, zynga) {
    if (err)
      return res.status(500).send("There was a problem finding the task id.");

    for (let index = 0; index < zynga.length; index++) {
      const element = zynga[index];
      element.imageData = element.currentimage.data.toString();
      zynga[index] = element;
      // console.log(zynga)
    }

    res.status(200).send(zynga);
  });
});
router.get("/images/:id", function (req, res) {
  ZyngaBotModel.findById(req.params.id, function (err, zynga) {
    if (err)
      return res.status(500).send("There was a problem finding the task.");

    zynga.imageData = zynga.currentimage.data.toString("base64");
    res.status(200).send(zynga.imageData);
  });
});
router.get("/webrtc/player", function (req, res) {
  console.log("webrtc istek geldi");
  res.sendfile("zynga/webplayer/index.html");
});
router.get("/bots/betgobots", function (req, res) {
  console.log("get betgobots");

  BetGoBotModel.find({})
    .limit(50)
    .sort("-log_date")
    .exec(function (err, bot_datas) {
      if (err)
        return res
          .status(500)
          .send("There was a problem finding the task id." + err);

          

      for (let index = 0; index < bot_datas.length; index++) {
        const element = bot_datas[index];

        element.imageData = (element.current_image.data != null)?element.current_image.data.toString():"";
        bot_datas[index] = element;
        // console.log(zynga)
      }

      res.status(200).send(bot_datas);
    });
});
router.post("/bot/command", function (req, res) {
  var model = {
    destbotid: req.body.destbotid,
    createddate: Date().toString(),
    sourceusername: req.body.sourceusername,
    sourcepassword: req.body.sourcepassword,
    sendblance: req.body.sendblance,
  };

  zyngabotcommand.sendCommnad(1, model);
  res.status(200).send();
});

module.exports = router;

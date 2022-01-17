var express = require("express");
const router = express.Router();
var app = express();
global.__root = __dirname + "/";

const cors = require("cors");
const whitelist = ["http://localhost:4200", "http://localhost:3000"];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    console.log(origin);
    if (whitelist.includes(origin)) return callback(null, true);

    callback(new Error("Not allowed by CORS"));
  },
};

app.use(cors());

//app.options('*', cors());

app.get("/api", function (req, res) {
  res.status(200).send("API works.");
});

app.post("/api", function (req, res) {
  console.log(req.body);
  res.status(200).send(req.body);
});

var swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", router);

var UserController = require(__root + "user/UserController");
app.use("/api/admin/user", UserController);

var AuthController = require(__root + "auth/AuthController");
app.use("/api/auth", AuthController);

var TaskController = require(__root + "task/TaskController");
app.use("/api/task", TaskController);

var ZyngaBotController = require(__root + "zynga/ZyngaBotController");
app.use("/api/zyngabot", ZyngaBotController);


var ServerManagmentController = require(__root + "server_managment/ServerManagmentController");
app.use("/api/servermanagment", ServerManagmentController);


var ServerControlController = require(__root + "server_managment/ServerControlController");
app.use("/api/servercommand", ServerControlController);


var PlayistController = require(__root + "video_stream/PlayistController");
app.use("/api/playistmanagment", PlayistController);

const ProxyController = require(__root+"proxy/LinkProxyController");
app.use("/api/proxy",ProxyController);

module.exports = app;

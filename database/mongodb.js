var config = require("../config");
var mongoose = require("mongoose");

const initDatabase = function () {
  mongoose.connect(config.mongo_connection, { useMongoClient: true });
};
module.exports.initDatabase = initDatabase;
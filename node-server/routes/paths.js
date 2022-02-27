var express = require("express");
var router = express.Router();
const dbo = require("../data/db");

router.route("/").get(function (req, res) {
  res.send(`Reached Server`);
});

router.route("/paths").get(function (req, res) {
  let db_connect = dbo.getDb("movement");
  db_connect
    .collection("paths")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

router.route("/paths/add").post(function (req, response) {
  let db_connect = dbo.getDb("movement");
  let myobj = req.body;
  db_connect.collection("paths").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

module.exports = router;

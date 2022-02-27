const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const WebSocket = require("ws");

const Helper = require("./utils/helper");

require("dotenv").config();
const dbo = require("./data/db");

const app = express();
const server = require("http").Server(app);
const wss = new WebSocket.Server({ server: server });

app.use(logger("dev"));
app.use(cors(), bodyParser.json());

wss.on("connection", function connection(ws) {
  console.log("A new client Connected!");
  Helper.initialiseClient(ws, dbo);
});

dbo.connectToServer(function (err) {
  if (err) console.error(err);
  else Helper.initialiseDB(dbo);
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port:${process.env.PORT}`);
});

require("./routes")(app);

process.on("uncaughtException", (error) => {
  console.error("Error occurred!!!", error);
});

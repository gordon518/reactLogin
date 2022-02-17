const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", router);

app.use("/",express.static(__dirname+"/dist"));

var server = app.listen("8888", () => {
    console.log("server created at port:8888!");
});
module.exports = server;
var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/add", function (req, res) {
    res.render("addTender");
});

app.get("/login", function (req, res) {
    res.render("login");
});

app.listen(3000, "localhost", function(req, res) {
    console.log("SERVER STARTED");
});

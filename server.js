var express = require('express');
var mongoose = require('mongoose');
var app = express();
var router = express.Router();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var TICKETS_COLLECTION = "tickets";
var ObjectID = mongodb.ObjectID;
var db = require('./config/key').mongoURI;

// connect to mongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.log(err);
    console.log('MongoDB Not Connected');
  });

var ticketss = [{
        "id": 1,
        "created_at" : "Andrew Sievers",
        "updated_at" : "Math homework due",
        "type": "homework",
        "subject": "Math",
        "description": "Really hard stuff from calculus",
        "priority": "urgent",
        "status": "incomplete",
        "recipient": "Math teacher",
        "submitter": "kc",
        "assignee_id": 123,
        "follower_ids": [123, 1],
        "tags": ["school", "homework"]
    }];

app.get('/', function(req, res){
  res.send("Hello world");
});    

router.get("/api/tickets/:id", function(req, res) {
});

router.put("/api/tickets/:id", function(req, res) {
});

router.delete("/api/tickets/:id", function(req, res) {
});


//express.use() 
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/rest', router);
app.use('/api/ticket/:id', router);

app.listen(port, () => console.log("The server is up and running"));

//mongodb://<dbuser>:<dbpassword>@ds137651.mlab.com:37651/heroku_4q67dbx2
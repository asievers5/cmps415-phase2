var express = require('express');
var app = express();
var router = express.Router();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var TICKETS_COLLECTION = "tickets";




var tickets = [{
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


// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// Tickets API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}


router.get("/api/tickets", function(req, res) {
});

router.post("/api/tickets", function(req, res) {
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

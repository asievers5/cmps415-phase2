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

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
  }


// GET https://polar-castle-32257.herokuapp.com/rest/list
// returns list of tickets in memoryd
router.get('/list', function(req, res) {
    res.status(200).send(tickets);
});

// POST http://localhost:8080/api/users
// parameters sent with 
router.post('/ticket', function(req, res) {
    var id = req.body.id;
    var created_at = req.body.created_at;
    var updated_at = req.body.updated_at;
    var type = req.body.type;
    var subject = req.body.subject;
    var description = req.body.description;
    var priority = req.body.priority;
    var status = req.body.status;
    var recipient = req.body.recipient;
    var submitter = req.body.submitter;
    var assignee_id = req.body.assignee_id;
    var follower_ids = req.body.follower_ids;
    var tags = req.body.tags;
    var ticket = {
        id,
        created_at,
        updated_at,
        type,
        subject,
        description,
        priority,
        status,
        recipient,
        submitter,
        assignee_id,
        follower_ids,
        tags
        }
    tickets.push(ticket);

    res.send("POST Successfull");
});

router.get('/ticket/:id', function(req, res) {
    for(var i = 0; i < tickets.length; i++){
        if(tickets[i].id == req.params.id) {
            sendjson = tickets[i];
            break;
        }
        else {
            sendjson = "Ticket not found";
        }
    }
    res.status(200).send(sendjson);
});

//express.use() 
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/rest', router);
app.use('/api/ticket/:id', router);

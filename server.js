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

  //create model based on ticketSChema
let TicketModel = require('./ticket')
let tick = new TicketModel({
  name: "Andrew",
  issue: "I suck at programming",
  employeenum: 1
})

tick.save()
  .then(doc => {
    console.log()
  })
  .catch(err => {
    console.error(err)
  })

tick = new TicketModel({
  name: "KC",
  issue: "School",
  employeenum: 2
})

tick.save()
  .then(doc => {
    console.log()
  })
  .catch(err => {
    console.error(err)
  })

// routes
app.get('/', function(req, res){
  res.send("Hello world");
});    

router.get('/tickets', function(req, res){
  TicketModel.find(function(err, tickets) {
    if (err) return console.error(err);
    res.status(200).send(tickets)
  });
});

router.get("/tickets/:id", function(req, res) {
 TicketModel.find({
   employeenum: req.params.id
 }, function(err, obj) { res.send(obj)})
});


router.post("/tickets/", function(req,res) {
  var addTicket = new TicketModel(req.body);

  console.log(req.body);

  addTicket.save()
  .then(obj => {
    res.send("Success")})
  .catch(err => {
  res.status(400).send("Failure to POST")})});

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
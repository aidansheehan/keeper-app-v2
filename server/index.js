const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cors());

// Connect to the Database
mongoose.connect("mongodb://localhost:27017/notesDB", {useNewUrlParser: true, useUnifiedTopology: true});

//Test if connected to DB
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("we're connected!");
// });

// Define Model for Notes Lists
const listsSchema = new mongoose.Schema({
  userId: {
    username: String,
    password: String
  },
  notes: [{
    title: String,
    content: String
  }]
});
const List = mongoose.model("List", listsSchema);

// Login Route
app.post("/login", function(req, res) {
  List.findOne({"userId.username": req.body.username}, function(err, foundList) {
    if (foundList) {
      bcrypt.compare(req.body.password, foundList.userId.password, function(err, result) {
        if (result === true) {
          res.send(foundList._id)
        } else {
          res.sendStatus(401);
        }
      });
     }
    else if (!foundList) res.sendStatus(401);
    else res.send(err)
  });
});

//Register Route
app.post("/register", function(req, res) {
  List.findOne({"userId.username": req.body.username}, function(err, foundList) {
    if (!foundList) {
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        List.create(
          {
            userId: {username: req.body.username, password: hash},
            notes: []
          }
        );
        return res.sendStatus(200);
      });
    } else if (foundList) {
      res.sendStatus(409);
    } else {
      res.send(err);
    }
  });
});

// User Routes
app.route("/notes/:userId")
.get(function(req, res) {
  List.findOne({_id: req.params.userId}, function(err, foundList) {
    if (!err) {
      res.send(foundList.notes);
    } else {
      res.send(err)
    }
  });
})
.patch(function(req, res) {
  List.updateOne({_id: req.params.userId}, {$push: {notes: req.body}}, function(err) {
    if (!err) res.send("Successfully updated note");
    else res.send(err);
  })
});

app.delete("/notes/:userId/:noteId", function(req, res) {
  List.updateOne({_id: req.params.userId}, {$pull: {notes: {"_id": req.params.noteId}}}, function(err) {
    if (!err) res.send("Successfully deleted note");
    else res.send(err);
  } )
})

// Return HTTP Server Object
const port = 8000;
app.listen(port, function() {
  console.log("Server started on port " + port);
})

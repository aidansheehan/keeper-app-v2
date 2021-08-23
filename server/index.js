const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Connect to the Database
mongoose.connect("mongodb://localhost:27017/notesDB", {useNewUrlParser: true, useUnifiedTopology: true});

//Test if connected to DB
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("we're connected!");
// });

// Define Notes Schema
const notesSchema = new mongoose.Schema({
  title: String,
  content: String
});

// Compile Schema Into Model
const Note = mongoose.model("Note", notesSchema);

// Define RESTful API for root route

///////////////////// Requests Targeting All Routes
app.route("/")
.get(function(req,res){
  Note.find(function(err, foundNotes) {
    if (!err) {
      res.send(foundNotes);
    } else {
      res.send(err);
    }

  });
})
.post(function(req, res) {
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content
  });
  newNote.save();
  res.redirect("/");
})
.delete(function(req, res) {
  Note.deleteMany(function(err){
    if (!err) {
      res.redirect("/");
    } else {
      res.send(err);
    }
  });
});

// /////////////// Requests Targeting Specific Routes

app.route("/:noteTitle")
.get(function(req, res) {
  Note.findOne({title: req.params.noteTitle}, function(err, foundNote) {
    if (foundNote) {
      res.send(foundNote)
    } else {
      res.send("No note matching that title was found.");
    }
  })
})
.put(function(req, res) {
  Note.update(
    {title: req.params.noteTitle},
    {title: req.body.title, content: req.body.content},
    {overwrite: true},
    function(err) {
      res.redirect("/");
    }
  )
})
.patch(function(req, res) {
  Note.update(
    {title: req.params.noteTitle},
    {$set: req.body},
    function(err) {
      if (!err) {
        res.send("Successfully updated note");
      } else {
        res.send(err);
      }
    }
  )
})
.delete(function(req, res) {
  Note.deleteOne(
    {title: req.params.noteTitle},
    function(err) {
      if (!err) {
        res.send("Successfully deleted note");
      } else {
        res.send(err);
      }
    }
  )
});

// Return HTTP Server Object
app.listen(3000, function() {
  console.log("Server started on port 3000");
})

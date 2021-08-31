const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const cors = require("cors");
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

// Define Notes Schema
// const notesSchema = new mongoose.Schema({
//   title: String,
//   content: String
// });

// Define Users Model
const usersSchema = new mongoose.Schema({
  userId: String,
  notes: [{
    title: String,
    content: String
  }]
});

const User = mongoose.model("User", usersSchema);

// Compile Schema Into Model
// const Note = mongoose.model("Note", notesSchema);
// Define RESTful API For User Route
app.route("/:userId")
.get(function(req, res) {
  console.log("GET request " + new Date());             //Log GET requests to make sure no memory leak
  User.findOne({userId: req.params.userId}, function(err, foundUser) {
    if (!err) {
      res.send(foundUser.notes);
    } else {
      res.send(err)
    }
  });
})
.patch(function(req, res) {
  User.update({userId: req.params.userId}, {$push: {notes: req.body}}, function(err) {
    if (!err) res.send("Successfully updated note");
    else res.send(err);
  })
});         // update so userId is unique mongoose generated id

app.delete("/:userId/:noteId", function(req, res) {
  User.update({userId: req.params.userId}, {$pull: {notes: {"_id": req.params.noteId}}}, function(err) {
    if (!err) res.send("Successfully deleted note");
    else res.send(err);
  } )
})



// Define RESTful API for root route

///////////////////// Requests Targeting All Routes
app.route("/")
.get(function(req,res){
  console.log("GET request" + new Date());
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

// app.route("/:noteTitle")
// .get(function(req, res) {
//   Note.findOne({title: req.params.noteTitle}, function(err, foundNote) {
//     if (foundNote) {
//       res.send(foundNote)
//     } else {
//       res.send("No note matching that title was found.");
//     }
//   })
// })
// .put(function(req, res) {
//   Note.update(
//     {title: req.params.noteTitle},
//     {title: req.body.title, content: req.body.content},
//     {overwrite: true},
//     function(err) {
//       res.redirect("/");
//     }
//   )
// })
// .patch(function(req, res) {
//   Note.update(
//     {title: req.params.noteTitle},
//     {$set: req.body},
//     function(err) {
//       if (!err) {
//         res.send("Successfully updated note");
//       } else {
//         res.send(err);
//       }
//     }
//   )
// })
// .delete(function(req, res) {
//   Note.deleteOne(
//     {title: req.params.noteTitle},
//     function(err) {
//       if (!err) {
//         res.send("Successfully deleted note");
//       } else {
//         res.send(err);
//       }
//     }
//   )
// });

// Return HTTP Server Object
const port = 8000;
app.listen(port, function() {
  console.log("Server started on port " + port);
})

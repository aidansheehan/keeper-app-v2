const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const cors = require("cors");
const app = express();

//NOTE:
  //   - Test as many weird cases as you can, try to break your code and defensively program to ensure it can deal
  //   - Add password, salt and hash -> better level of (internal) encryption, think about when and how to do this to ensure
  //     safety when passing props around etc.

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
  List.findOne({userId: req.body}, function(err, foundList) {
    if (foundList) {
      return res.send(foundList._id)
     }
    else if (!foundList) res.sendStatus(401);          // need to handle in app (should it be 401?)
    else res.send(err)
  })
  console.log("Login request completed");
})

//Register Route
app.post("/register", function(req, res) {
  const newUser = req.body;
  List.findOne({"userId.username": req.body.username}, function(err, foundList) {
    if (!foundList) {
      List.create(
        {
          userId: {username: newUser.username, password: newUser.password},
          notes: []
        }
      );
      return res.sendStatus(200);
    } else if (foundList) {
      res.sendStatus(409);
    } else {
      res.send(err);
    }
  });
  console.log("Register request completed.");
});

// Define RESTful API For User Route
app.route("/notes/:userId")
.get(function(req, res) {
  console.log("GET request " + new Date());             //Log GET requests to make sure no memory leak
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

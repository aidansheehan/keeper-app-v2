import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import LogIn from "./LogIn";
import { getNotes, setNote, removeNote, findUser, createUser } from "../services/note";

function App() {

  const [notes, setNotes] = useState([]);       // notes for render on page
  const [update, setUpdate] = useState(false);  // update var tells app to update notes list when changed
  const [userId, setUserId] = useState("");

  // Take username input and send to db to check
  function checkUser(user) {
    findUser(user).then((response) => {
      if (response === 401) {
        alert("This username and password combination doesn't exist. Please try again, or register a new account.");
        return;
      } else {
        setUserId(response);
      }
  });
  };

// Create new user in DB
  function newUser(user) {
    createUser(user).then(response => {
      if (response === 409) {
        alert("This username is already registered. Please log in or register with a different username.")
      } else if (response === 200) {
        checkUser(user);
      } else {
        console.log(response);
      }
    });
  };

//Change update Var Back to False to Escape Infinite Loop Behaviour
  useEffect(() => {
    if (update) {
      setUpdate(false);
    }
  }, [notes]);

//Get Notes From API And Set Our Notes State On Render and After User Submits New Note,
  useEffect(() => {
    let mounted = true;
    if (userId.length) {
    getNotes(userId).then(notes => {
      if (mounted) {
        setNotes(notes)
      }});
    return () => mounted = false;
  }}, [userId, update]);      //remove update


  // Take New Note Object From CreateArea.jsx and POST to notes
  function addNote(newNote) {
    setNote(userId, newNote);
    setUpdate(true);
  }

  // Take User Clicked Note and DELETE
  function deleteNote(id) {
    removeNote(userId, id);
    setUpdate(true);
  }

  if (!userId.length) {
    return(
      <div>
        <Header />
        <LogIn onLoginClick={checkUser} onRegisterClick={newUser} />
        <Footer />
      </div>
    )
  } else {
    return(
      <div>
        <Header />
        <CreateArea onAdd={addNote} />
        {notes.map(note => {
          return (<Note
            key={note._id}
            id={note._id}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
            />
        );
        })}
        <Footer />
      </div>
    )};
}

export default App;

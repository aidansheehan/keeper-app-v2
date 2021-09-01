import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import LogIn from "./LogIn";
import { getNotes, setNote, removeNote, findUser } from "../services/note";

function App() {

  const [notes, setNotes] = useState([]);       // notes for render on page
  const [update, setUpdate] = useState(false);  // update var tells app to update notes list when changed
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  // Take username input and send to db to check
  function checkUser(user) {
    //console.log(user);
    findUser(user).then((response) => {setUserId(response)})//.then(setIsLoggedIn(true));   //if statement
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
    // if (notes.length && update === false ) {
    //   return;
    // }
    if (userId.length) {
    getNotes(userId).then(notes => {
      if (mounted) {
        setNotes(notes)
      }});
    return () => mounted = false;
  }}, [userId, update]);


  // Take New Note Object From CreateArea.jsx and POST to notes
  function addNote(newNote) {
    // console.log(userId);
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
        <LogIn onClick={checkUser} />
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

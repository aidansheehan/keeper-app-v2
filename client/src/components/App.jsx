import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { getNotes, setNote, removeNote } from "../services/note";

function App() {

  const [notes, setNotes] = useState([]);       // notes for render on page
  const [update, setUpdate] = useState(false);  // update var tells app to update notes list when changed

//Change update Var Back to False to Escape Infinite Loop Behaviour
  useEffect(() => {
    if (update) {
      setUpdate(false);
    }
  }, [notes]);

//Get Notes From API And Set Our Notes State On Render and After User Submits New Note,
  useEffect(() => {
    let mounted = true;
    if (notes.length && update === false ) {
      return;
    }
    getNotes().then(notes => {
      if (mounted) {
        setNotes(notes)
      }});
    return () => mounted = false;
  }, [update]);


  // Function addItem() to Take New Note Object From CreateArea.jsx and POST to notes
  function addNote(newNote) {
    setNote(newNote);
    setUpdate(true);
  }

  // Function for Deleting a note
  // function deleteNote(id) {
  //   setNotes( (prevNotes) => {
  //     return prevNotes.filter( (note) => note.title !== id )
  //   })
  // }
  function deleteNote(id) {
    removeNote(id);
    setUpdate(true);
  }

    return(
      <div>
        <Header />
          <CreateArea onAdd={addNote} />
          {notes.map(note => {
            return (<Note
              key={note.title}
              id={note.id}
              title={note.title}
              content={note.content}
              onDelete={deleteNote}
              />)
          })}
        <Footer />
      </div>
    );
}

export default App;

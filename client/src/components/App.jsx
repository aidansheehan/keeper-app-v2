import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import notes from "../notes.js";
import { getNotes } from "../services/note";

function App() {

  const [updatedNotes, setUpdatedNotes] = useState([]);

  useEffect(() => {
    let mounted = true;
    getNotes().then(notes => {
      if (mounted) {
        setUpdatedNotes(notes)
      }
    })
    return () => mounted = false;
  }, [])

  // Function addItem() to Take New Note Object From CreateArea.jsx and Add to notes
  function addNote(newNote) {
    return setUpdatedNotes( (prevValue) => [...prevValue, newNote] );
  }

  // Function for Deleting a note
  function deleteNote(id) {
    setUpdatedNotes( (prevNotes) => {
      return prevNotes.filter( (note) => note.title !== id )
    })
  }

    return(
      <div>
        <Header />
          {updatedNotes.map(note => {
            return (<Note
              key={note.title}
              id={note.title}
              title={note.title}
              content={note.content}
              />)
          })}
        <Footer />
      </div>
        // <div>
        //     <Header />
            // <CreateArea onAdd={addNote} />
            // {updatedNotes.map(note => (
            //     <Note
            //         onDelete={deleteNote}
            //         key={note.title}
            //         id={note.title}
            //         title={note.title}
            //         content={note.content}
            //     />
            //     ))}
        //     <Footer />
        // </div>
    );
}

export default App;

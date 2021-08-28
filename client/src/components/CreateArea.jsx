import React, {useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {

  const [isExpanded, setIsExpanded] = useState(false);

  // Create Complex State to Track New Note Input
  const [newNote, setNewNote] = useState({title: "", content: ""});

  // Function to Handle Change in New Note Input
  function handleChange(event) {
    const {name, value} = event.target;
    setNewNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    props.onAdd(newNote);
    setNewNote({title: "", content: ""});
  }

  function handleTextClick() {
    setIsExpanded(true);
  }

  return (<div>
    <form className="create-note">
      {isExpanded && <input onChange={handleChange} name="title" placeholder="Title" value={newNote.title}/>}
      <textarea
        onChange={handleChange}
        onClick={handleTextClick}
        name="content"
        placeholder="Take a note..."
        rows={isExpanded
          ? "3"
          : "1"}
          value={newNote.content}/>
      <Zoom in={isExpanded}>
        <Fab onClick={submitNote}>
          <AddIcon/>
        </Fab >
      </Zoom>
    </form>
  </div>);
}

export default CreateArea;

import React from 'react';
import axios from "axios";
import { connect } from "react-redux";

const options = {
  withCredentials: true
};

const Notes = () => {
    const [text, setText] = React.useState("");
    const [notes, setNotes] = React.useState([]);
    const [displayError, setDisplayError] = React.useState(false);
    const [activeNote, setActiveNote] = React.useState("test note");
    const [activeNoteId, setActiveNoteId] = React.useState("");
    const [showEdit, setShowEdit] = React.useState(false);

    const listNotes = () => {
      axios
          .get("/service1/list")
          .then(res => {
            console.log(res.data.notes);
            if (res.data.notes) {
                setNotes(res.data.notes)
            } else {
                setDisplayError(true)
            }
          })
          .catch(console.log);
  };

  const createNote = () => {
    const body = {
        body: text
    };
    axios
        .post("/service1/create", body)
        .then(res => {
          if (res.status) {
              listNotes()
          } else {
              setDisplayError(true)
          }
        })
        .catch(console.log);
  };

  const updateNote = () => {
    const body = {
      _id: activeNoteId,
      body: activeNote
    };
    axios
        .post("/service1/update", body)
        .then(res => {
          if (res.status) {
              listNotes()
          } else {
              setDisplayError(true)
          }
          console.log(res);
        })
        .catch(console.log);
  };

    // hit service 1 to obtain notes list
    React.useEffect(() => {
      listNotes();
    }, []);

    return (
        <React.Fragment>
            <div className="notes-container">
                <h2>Notes</h2>
                {displayError && <p>Oh no! An error occurred.</p>}
                <div className="notes-input-container">
                    <input className="notes-input" value={text} onChange={e => setText(e.target.value)} />
                    <button className="notes-input-button" onClick={createNote}>Add Note</button>
                </div>
                <br />
                <div>
                    {notes.map((item) => (
                        <div className="notes-item">
                            <div id={item._id} className="notes-item-content">
                                {item.body}
                            </div>
                            <button
                              className="notes-edit-button"
                              onClick={(e) => {
                                setShowEdit(true);
                                setActiveNote(document.getElementById(item._id).innerHTML);
                                setActiveNoteId(item._id)
                              }}
                            >
                                Edit
                            </button>
                        </div> 
                    ))}
                </div>
                {showEdit &&
                  <div>
                    <h2>Edit Note</h2>
                    <input 
                      className="notes-edit-input"
                      value={activeNote}
                      onChange={ e => {
                        setActiveNote(e.target.value)
                      }}
                    ></input>
                    <br/>
                    <br/>
                    <button 
                      className="notes-update-button"
                      onClick={() => {
                        updateNote();
                        setShowEdit(false)
                    }}>
                      Update Note
                    </button>
                  </div>
                }
            </div>
        </React.Fragment>
    )
}

export default Notes;
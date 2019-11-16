import React from "react";
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
  const [showEdit, setShowEdit] = React.useState(false);

  const fetchProtectedData = () => {
    axios
      .get("/service1/", options)
      .then(res => {
        console.log(res);
      })
      .catch(console.log);
  };

  const handleSubmit = () => {
    const data = {
      type: "SEND_MESSAGE",
      newNote: text
    };
    // client to server
    window.ws.send(JSON.stringify(data));
    setText("");
  };

  const listNotes = () => {
    axios
      .get("/service1/list")
      .then(res => {
        console.log(res.data.notes);
        if (res.data.notes) {
          setNotes(res.data.notes);
        } else {
          setDisplayError(true);
        }
        console.log(res.data);
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
          listNotes();
        } else {
          setDisplayError(true);
        }
        console.log(res);
      })
      .catch(console.log);
  };

  // hit service 1 to obtain notes list
  React.useEffect(() => {
    listNotes();
  }, []); // VERY IMPORTANT NEEDS THE EMPTY ARRAY!!!

  return (
    <React.Fragment>
      <div className="notes-container">
        <h2>Notes</h2>
        {displayError && <p>Oh no! An error occurred.</p>}
        <div>
          <input value={text} onChange={e => setText(e.target.value)} />
          <button onClick={createNote}>Add Item</button>
        </div>
        <div>
          {notes.map(item => (
            <div className="notes-item">
              <div id={item._id}>{item.body}</div>
              <button
                onClick={e => {
                  setShowEdit(true);
                  // use setActiveNote to set current note to activeNote
                  setActiveNote(document.getElementById(item._id).innerHTML);
                }}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
        {showEdit && (
          <div>
            <h2>Edit Note</h2>
            <input
              value={activeNote}
              onChange={e => {
                setActiveNote(e.target.value);
              }}
            ></input>
            <br />
            <br />
            <button
              onClick={() => {
                setShowEdit(false);
                // trigger update to mongoDB with contents of activeNote
              }}
            >
              submit
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  //notes: state.notesReducer.notes
});

export default connect(mapStateToProps)(Notes);

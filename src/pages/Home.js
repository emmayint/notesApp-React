import React from "react";
import { connect } from "react-redux";

const Home = ({ notes }) => {
  const [text, setText] = React.useState("");

  const handleSubmit = () => {
    const data = {
      type: "SEND_MESSAGE",
      newNote: text
    };
    // client to server
    window.ws.send(JSON.stringify(data));
    setText("");
  };

  return (
    <div>
      <h2>Home</h2>
      <div>
        <input value={text} onChange={e => setText(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        {notes.map((note, i) => (
          <div key={i}>{note}</div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  notes: state.notesReducer.notes
});

export default connect(mapStateToProps)(Home);

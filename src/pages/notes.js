import React from 'react';
import axios from "axios";
import { connect } from "react-redux";

const options = {
  withCredentials: true
};

const Notes = ({ notes }) => {
    const [text, setText] = React.useState("");

    // hit service 1 to obtain notes list
    React.useEffect(() => {
        axios
          .get("/service1/", options)
          .then(res => {
            console.log(res);
          })
          .catch(console.log);
    }, []); // VERY IMPORTANT NEEDS THE EMPTY ARRAY!!!

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

    return (
        <React.Fragment>
            <div className="notes-container">
                <h2>Notes</h2>
                <div>
                    <input value={text} onChange={e => setText(e.target.value)} />
                    <button onClick={handleSubmit}>Add Item</button>
                </div>
                <div>
                    {notes.map((note, i) => (
                        <div className="notes-item">
                            <div key={i}>
                                {note}
                            </div>
                            <button>
                                Edit
                            </button>
                        </div> 
                    ))}
                </div>
                <button onClick={fetchProtectedData}>contact service 1</button>
            </div>




{/* 
            <div className="todo-list">

        {todoList.map((item, index) => (
          <div class="todo-item">
            <div>
              <input className="checkbox" type="checkbox" checked={item.done} data-index={index} onClick={  
                () => {
                  // onClick uses the item's index to locate item in state and toggles the 'done' boolean value
                  const updatedList = [...todoList];
                  updatedList[index].done = !updatedList[index].done
                  setTodoList(updatedList);
                }
              } />
              <span className={todoList[index].done ? "done" : ""}>{item.text}</span>
            </div>
            <button class="delete-button" onClick={
              () => {
                // onClick uses the item's index to locate and remove the item from state
                const modifiedList = [...todoList];
                modifiedList.splice(index, 1);
                setTodoList(modifiedList);
              }
            }>DELETE</button>
          </div>
        ))}
      </div> */}



        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    notes: state.notesReducer.notes
  });
  
export default connect(mapStateToProps)(Notes);
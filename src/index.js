// frontend couting user
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import rootReducer from "./redux/reducers/rootReducer";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { setActiveUsers } from "./redux/actions/userActions";
import { updateNotes } from "./redux/actions/notesActions";

const ws = new WebSocket("ws://localhost:4000"); // build in class
const store = createStore(rootReducer);

ws.onclose = () => {
  console.log("connection has closed!");
};

ws.onopen = () => {
  // store.dispatch(setActiveUsers("test"));
  console.log("connection has opened!");
};

ws.onmessage = message => {
  const messageObject = JSON.parse(message.data);
  switch (messageObject.type) {
    case "UPDATE_USER_COUNT":
      store.dispatch(setActiveUsers(messageObject.count));
      break;
    case "UPDATE_MESSAGES":
      store.dispatch(updateNotes(messageObject.notes));
      break;
  }
  console.log(messageObject);
};

ws.onerror = e => {
  console.log(e);
};

window.ws = ws; // temporary for demonstration, used to access globally, 9 times out of 10 don't do this

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

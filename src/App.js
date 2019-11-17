// frontend Static file server
import React from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import md5 from "md5";

import { Switch, Route, Link } from "react-router-dom";
// import Home from "./pages/Home";
import { connect } from "react-redux";
import Header from "./components/header";
import Auth from "./pages/auth";
import Notes from "./pages/notes";

// const options = {
//   withCredentials: true
// };

const App = ({ activeUsers }) => {
  // React.useEffect(() => {
  //   const body = {
  //     username: "asd",
  //     password: "asd"
  //   };
  //   axios
  //     .post("/service2/", body, options)
  //     .then(res => {
  //       // document.cookie = "username=username"; //set cookies with key/value pairs
  //       // document.cookie = "password=password"; //set cookies with key/value pairs
  //       console.log(res);
  //     })
  //     .catch(console.log);
  // }, []); // VERY IMPORTANT NEEDS THE EMPTY ARRAY

  return (
    <React.Fragment>
      <div className="App">
        <Header />
      </div>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/notes" component={Notes} />
        <Route path="/" component={Auth} />
      </Switch>
    </React.Fragment>
  );
};

// export default App;
const mapStateToProps = state => ({
  activeUsers: state.userReducer.activeUsers
});

export default connect(mapStateToProps)(App);

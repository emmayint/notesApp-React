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
  // const [username, setUsername] = React.useState("");
  // const [password, setPassword] = React.useState("");

  // // everytime when fronend page is loaded (refreshed),
  // // hit service1 and service2 in turn
  // React.useEffect(() => {
  //   axios
  //     .get("/service1/", options)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(console.log);
  // }, []); // VERY IMPORTANT NEEDS THE EMPTY ARRAY!!!

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

  // const validate = () => {
  //   const body = {
  //     username,
  //     password: md5(password)
  //   };
  //   axios
  //     .post("/service2/login", body, options)
  //     .then(res => {
  //       if (res.data.valid) {
  //         document.cookie = `username=${username}`; //set cookies with key/value pairs
  //         document.cookie = `password=${md5(password)}`; //set cookies with key/value pairs
  //       } else {
  //         document.cookie = "username="; //set cookies with key/value pairs
  //         document.cookie = "password=";
  //       }
  //       // document.cookie = "username=username"; //set cookies with key/value pairs
  //       // document.cookie = "password=password"; //set cookies with key/value pairs
  //       console.log(res);
  //     })
  //     .catch(console.log);
  // };

  // const create = () => {
  //   const body = {
  //     username,
  //     password: md5(password)
  //   };
  //   axios
  //     .post("/service2/create", body, options)
  //     .then(res => {
  //       if (res.data.valid) {
  //         document.cookie = `username=${username}`; //set cookies with key/value pairs
  //         document.cookie = `password=${md5(password)}`; //set cookies with key/value pairs
  //       } else {
  //         document.cookie = "username="; //set cookies with key/value pairs
  //         document.cookie = "password=";
  //       }
  //       // document.cookie = "username=username"; //set cookies with key/value pairs
  //       // document.cookie = "password=password"; //set cookies with key/value pairs
  //       console.log(res);
  //     })
  //     .catch(console.log);
  // };

  // const fetchProtectedData = () => {
  //   axios
  //     .get("/service1/", options)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(console.log);
  // };

  return (
    <React.Fragment>
      <div className="App">
        <Header />
        {/* <div className="active-users">active users: {activeUsers}</div>
        <header className="login">
          <img src={logo} className="App-logo" alt="logo" />
          <input value={username} onChange={e => setUsername(e.target.value)} />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={validate}>login</button>
          <button onClick={fetchProtectedData}>fetch data service1</button>
          <button onClick={create}>signup</button>
        </header> */}
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

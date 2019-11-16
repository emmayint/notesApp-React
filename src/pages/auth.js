// frontend Static file server
import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
// import "./App.css";
import md5 from "md5";
import { setIsLoggedIn } from "../redux/actions/userActions";

const options = {
  withCredentials: false
};

const Auth = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [newUsername, setNewUsername] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [toggle, setToggle] = React.useState(true);

  const dispatch = useDispatch();

  const login = () => {
    const body = {
      username,
      password: md5(password)
    };
    axios
      .post("/service2/login", body, options)
      .then(res => {
        if (res.data.valid) {
          document.cookie = `token=${res.data.token}`; //set cookies with key/value pairs
          dispatch(setIsLoggedIn(true));
        } else {
          document.cookie = "token="; //set cookies with key/value pairs
        }
        // document.cookie = "username=username"; //set cookies with key/value pairs
        // document.cookie = "password=password"; //set cookies with key/value pairs
        console.log(res);
      })
      .catch(console.log);
  };

  const create = () => {
    const body = {
      username: newUsername,
      password: md5(newPassword)
    };
    axios
      .post("/service2/create", body, options)
      .then(res => {
        if (res.data.valid) {
          document.cookie = `token=${res.data.token}`; //set cookies with key/value pairs
          dispatch(setIsLoggedIn(true));
        } else {
          document.cookie = "token="; //set cookies with key/value pairs
        }
        console.log(res);
      })
      .catch(console.log);
  };

  const fetchProtectedData = () => {
    axios
      .get("/service1/", options)
      .then(res => {
        console.log(res);
      })
      .catch(console.log);
  };

  return (
    <div className="authenticate-container">
      <div>
        <button onClick={() => setToggle(true)}>Login Tab</button>
        <button onClick={() => setToggle(false)}>Signup Tab</button>
      </div>
      {toggle ? (
        <div className="login">
          <h2>Login</h2>
          <p>
            Username:{" "}
            <span>
              <input
                className="auth-input"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </span>
          </p>
          <p>
            Password:{" "}
            <span>
              <input
                className="auth-input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </span>
          </p>

          <button className="auth-button" onClick={login}>login</button>
        </div>
      ) : (
        <div className="sign-up">
          <h2>Sign Up</h2>
          <p>
            Username:{" "}
            <span>
              <input
                className="auth-input"
                value={newUsername}
                onChange={e => setNewUsername(e.target.value)}
              />
            </span>
          </p>
          <p>
            Password:{" "}
            <span>
              <input
                className="auth-input"
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
            </span>
          </p>
          <button className="auth-button" onClick={create}>signup</button>
        </div>
      )}
    </div>
  );
};

export default Auth;

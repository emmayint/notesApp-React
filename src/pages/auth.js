// frontend Static file server
import React from "react";
import { useDispatch } from 'react-redux';
import axios from "axios";
// import "./App.css";
import md5 from "md5";
import { setIsLoggedIn } from "../redux/actions/userActions";

const options = {
  withCredentials: false
};

{/* <div className="active-users">active users: {activeUsers}</div>
<header className="login">
<input value={username} onChange={e => setUsername(e.target.value)} />
<input
    type="password"
    value={password}
    onChange={e => setPassword(e.target.value)}
/>
<button onClick={validate}>submit</button> */}


const Auth = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [newUsername, setNewUsername] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");

    const dispatch = useDispatch();


    React.useEffect(() => {
        axios
          .get("/service1/", options)
          .then(res => {
            console.log(res);
          })
          .catch(console.log);
      }, []); // VERY IMPORTANT NEEDS THE EMPTY ARRAY!!!
    
      React.useEffect(() => {
        const body = {
          username: "asd",
          password: "asd"
        };
        axios
          .post("/service2/", body, options)
          .then(res => {
            // document.cookie = "username=username"; //set cookies with key/value pairs
            // document.cookie = "password=password"; //set cookies with key/value pairs
            console.log(res);
          })
          .catch(console.log);
      }, []); // VERY IMPORTANT NEEDS THE EMPTY ARRAY




    const validate = () => {
        const body = {
            username,
            password: md5(password)
        };
        axios
            .post("/service2/login", body, options)
            .then(res => {
            if (res.data.valid) {
                document.cookie = `username=${username}`; //set cookies with key/value pairs
                document.cookie = `password=${md5(password)}`; //set cookies with key/value pairs
                dispatch(setIsLoggedIn(true));
            } else {
                document.cookie = "username="; //set cookies with key/value pairs
                document.cookie = "password=";
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
                document.cookie = `username=${newUsername}`; //set cookies with key/value pairs
                document.cookie = `password=${md5(newPassword)}`; //set cookies with key/value pairs
            } else {
                document.cookie = "username="; //set cookies with key/value pairs
                document.cookie = "password=";
            }
            // document.cookie = "username=username"; //set cookies with key/value pairs
            // document.cookie = "password=password"; //set cookies with key/value pairs
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

                // const validate = () => {
                //     const body = {
                //     username,
                //     password: md5(password)
                //     };
                //     axios
                //     .post("/service2/", body, options)
                //     .then(res => {
                //         if (res.data.valid) {
                //         document.cookie = `username=${username}`; //set cookies with key/value pairs
                //         document.cookie = `password=${md5(password)}`; //set cookies with key/value pairs
                //         dispatch(setIsLoggedIn(true));
                //         console.log("service 2 returned data.valid");
                //         } else {
                //         document.cookie = "username="; //set cookies with key/value pairs
                //         document.cookie = "password=";
                //         }
                //         console.log(res);
                //     })
                //     .catch(console.log);
                // };



  return (
    <div className="authenticate-container">
      <div className="login">
        <h2>Login</h2>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Username: <span><input value={username} onChange={e => setUsername(e.target.value)} /></span></p>
        <p>Password: <span><input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          /></span>
        </p>

        <button onClick={validate}>login</button>
        {/* <button onClick={fetchProtectedData}>get data</button> */}
      </div>
      <div className="sign-up">
        <h2>Sign Up</h2>
        <p>Username: <span><input value={newUsername} onChange={e => setNewUsername(e.target.value)} /></span></p>
        <p>Password: <span><input
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          /></span>
        </p>
        <button onClick={create}>signup</button>



            {/* <button onClick={validate}>login</button>
            <button onClick={fetchProtectedData}>fetch data service1</button>
            <button onClick={create}>signup</button> */}
      </div>
    </div>
  );
};

export default Auth;

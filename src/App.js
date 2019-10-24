import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

const options = {
  withCredentials: true
};

function App() {
  React.useEffect(() => {
    axios.get('/service1/', options)
      .then((res) => {
        console.log(res)
      })
      .catch(console.log);
  }, []); // VERY IMPORTANT NEEDS THE EMPTY ARRAY

  React.useEffect(() => {
    const body = {
      username: 'asd',
      password: 'asd',
    };
    axios.post('/service2/', body, options)
      .then((res) => {
        document.cookie = 'username=username'; //set cookies with key/value pairs
        document.cookie = 'password=password'; //set cookies with key/value pairs
        console.log(res)
      })
      .catch(console.log);
  }, []); // VERY IMPORTANT NEEDS THE EMPTY ARRAY

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

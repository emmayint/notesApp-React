// AuthServer
const express = require("express");
const app = express();
app.use(express.json());

const port = 3002;

/**
 * Determines if a user's credentials are valid. If so, return a token that can be used for recurring requests
 * req.body: { username: string, password: string }
 * res: { status: boolean(whether account credentials are valid), token: string }
 */
app.post("/service2/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.send({
      status: false,
      token: ''
    });
  }
  // check if credentials are invalid
  if ( false ) {
    // if true, send invalid
    return res.send({
      status: false,
      token: ''
    });
  }
  
  // generate token? Or use same token, generate once on creation?...
  const token = '';
  // simple check if valid response
  if(token) {
    return res.send({
      status: true,
      token
    });
  }
  // otherwise some error occurred...
  return res.send({
    status: false,
    token: ''
  });

});

/**
 * Function determines if given token is a valid one...
 * req.body: { token: string }
 * res: { status: boolean }
 */
app.post("/service2/auth", (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.send({ status: false });
  }
  // check if token in db or redis store? 
  if ( false ) {

    // blah blah
    return res.send({ status: true });
  }
  // after all else
  return res.send({ status: false });
});

/**
 * Function creates a new user if username not already in database.)
 * req.body: { username: string, password: string }
 * res: { status: boolean(whether account was created or not), token: string }
 */
app.post("/service2/create", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.send({
      status: false,
      token: ''
    });
  }
  
  // check if username is in db.
  if ( false ) {
    // if true, send invalid
    return res.send({
      status: false,
      token: ''
    });
  } else {
    // create new account
  }

  // generate token? Or use same token, generate once on creation?...
  const token = '';
  // simple check if valid response
  if(token) {
    return res.send({
      status: true,
      token
    });
  }
  // otherwise some error occurred...
  return res.send({
    status: false,
    token: ''
  });

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

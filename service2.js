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
  counter++;
  console.log("count", counter);
  console.log(req.body);
  let valid = false;
  if (
    req.body.username === "existinmongodb" &&
    req.body.password === "202cb962ac59075b964b07152d234b70"
  ) {
    valid = true;
  }
  console.log(valid);
  res.send({
    valid
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
  if (  ) {

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

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

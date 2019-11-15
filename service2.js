// AuthServer
const express = require("express");
const app = express();
const { MongoClient, ObjectID } = require('mongodb');

app.use(express.json());
// service port
const port = 3002;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'best_notes';

// Create a new MongoClient
const client = new MongoClient(url);

// connect to server
client.connect((err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Connected successfully to server");
  const db = client.db(dbName);

  // create collection. If already exists, ignores by default
  const collection = db.collection('users', function(err, collection) {});

  /**
   * Determines if a user's credentials are valid. If so, return a token that can be used for recurring requests
   * req.body: { username: string, password: string }
   * res: { valid: boolean(whether account credentials are valid), token: string }
   */
  app.post("/service2/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.send({
        valid: false,
      });
    }
    collection.findOne({ username })
    .then((response) => {
      if ( response && response.password === password ) {
        console.log("Loggin user in");
        return res.send({
          valid: true,
        });
      } else {
        return res.send({
          valid: false,
        });
      }
    })
    .catch((e) => {
      console.log(e.message);
      return res.send({
        valid: false
      });
    });
  });

  /**
   * Function creates a new user if username not already in database.)
   * req.body: { username: string, password: string }
   * res: { valid: boolean(whether account was created or not), message: 'Some custom message'}
   */
  app.post("/service2/create", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    

    if (!username || !password) {
      return res.send({
        valid: false,
        message: 'Username or Password fields are missing'
      });
    }

    const checkExists = (err, response) => {
      console.log("Checking")
      if ( response != null ) {
        // user exists
        console.log('Username exists');
        return res.send({
          valid: false,
          message: 'User already exists'
        });
      } else {
        if (err) {
          console.log(err);
        }
        console.log("Adding new user")
        // create new account
        let document = {username, password};
        // w:1 ensures key is placed in properly
        collection.insertOne(document)
        .then((response) => {
          if ( response ) {
            return res.send({
              valid: true,
              message: 'Welcome!'
            });
          }
        })
        .catch((e) => {
          console.log(e.message);
          return res.send({
            valid: false,
            message: 'Something went wrong with writing db'
          });
        });
      }
    };

    // find user based off of user name
    collection.findOne({ username }, checkExists);
   
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

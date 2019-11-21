// NoteServer
// Display how many users are looking at a note
// Note taking service, Note taking endpoints must be authenticated all calls with middleware
// Display how many users are looking at a note

const express = require("express");
const redis = require("redis");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const { MongoClient, ObjectID } = require('mongodb');

const redisClient = redis.createClient();

const app = express();

const port = 3001;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'best_notes';

// Create a new MongoClient
const mongoClient = new MongoClient(url);

app.use(cookieParser());
app.use(express.json());



app.use((req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.token;
  if (!token) {
    // null check
    res.status(403);
    return res.send({
      status: false,
    });
  }

  redisClient.get(token, (err, cachedValue) => {
    console.log(err);
    console.log("cached value is", cachedValue);

    const body = {
      token
    };

    if (cachedValue !== null) {
      console.log("cache hit");
      if (cachedValue === "true") {
        return next();
      } else {
        res.status(403);
        return res.send({
          status: false
        });
      }
    } else {
      console.log("cache miss");
      // move rest of code in here
      axios
        .post("http://localhost:3004/service2/auth", body)
        .then(res => {
          if (res.data.valid) {
            redisClient.set(token, true);
            redisClient.incr("USERS", (err, updateValue) => {
              // updateUserCount();
            });
            return next();
          } else {
            redisClient.set(token, false);
            res.status(403);
            return res.send({
              status: false
            });
          }
        })
        .catch(console.log);
    }
  });
});

// connect to server
mongoClient.connect((err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Connected successfully to server");
  const db = mongoClient.db(dbName);

  // create collection. If already exists, ignores by default
  const collection = db.collection('notes', function(err, collection) {});

  /**
   * Creates a new note
   * req.body: { body: "note body" }
   * res: { status: true/false if note created successfully }
   */
  app.post("/service1/create", (req, res) => {
    const body = req.body.body;

    if (!body) {
      return res.send({
        status: false,
      });
    }
    const document = {body};
    collection.insertOne(document)
    .then((response) => {
      if ( response ) {
        console.log("New note added");
        return res.send({
          status: true,
        });
      } else {
        return res.send({
          status: false,
        });
      }
    })
    .catch((e) => {
      console.log(e.message);
      return res.send({
        status: false
      });
    });
  });

  /**
   * Updates current note
   * req.body: { body: "note body", id: Object_id }
   * res: { status: true/false if note updated successfully }
   */
  app.post("/service1/update", (req, res) => {
    if ( !req.body._id ) {
      return res.send({
        status: false
      });
    }
    const updater = {
      $set: {
        body: req.body.body || '',
      }
    };
    db.collection('notes')
      // update vs findOneAndUpdate
      .findOneAndUpdate({
        _id: ObjectID.createFromHexString(req.body._id),
      }, updater)
      .then((response) => {
        console.log(response);
        if ( response ) {
          console.log("Successfully updated note");
          res.send({
            status: true
          });
        } else {
          // did something go wrong?
          console.log("Something went wrong with update response");
          res.send({
            status: false
          });
        }
      })
      .catch((e) => {
        console.log(e.message);
        res.send({
          status: false
        });
      });
  });

  /**
   * Returns list of notes
   * res: { notes: [{id:, body:}] }
   */
  app.get("/service1/list", (req, res) => {
    db.collection('notes')
      .find({})
      .toArray()
      .then((docs) => {
        console.log(docs);
        console.log("Succesfully got docs");
        docs = docs || []; // some checking
        res.send({
          notes: docs
        });
      })
      .catch((e) => {
        console.log(e.message);
        res.send({
          notes: []
        });
      });
  });


});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));



const express = require('express');
const redis = require('redis');

const client = redis.createClient();

const app = express()
const port = 3001;

let counter = 0;

app.get('/service1/*', (req, res) => {
  // counter++;
  client.incr('myCounter', (err, updatedValue) => {
    console.log('Hitting service', process.env.NODE_APP_INSTANCE);
    res.send(`Hello from instance: ${process.env.NODE_APP_INSTANCE}, ${updatedValue} Visits!!!`);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
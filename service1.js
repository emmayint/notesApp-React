const express = require('express');
const redis = require('redis');
const cookieParser = require('cookie-parser');
const axios = require('axios');

const client = redis.createClient();

const app = express();
app.use(cookieParser());
const port = 3001;

app.use((req, res, next) => {
  console.log(req.cookies)
  if (!req.cookies.username || !req.cookies.password) {
    // null check
    res.status(403);
    return res.send('You need access to this endpoint!');
  }
  const body = {
    username: req.cookies.username,
    password: req.cookies.password,
  };
  const key = req.cookies.username + '_' + req.cookies.password;

  console.log('test');
  client.get(key, (err, cachedValue) => {
    console.log(err);
    console.log('cached value is', cachedValue);
    if (cachedValue !== null) {
      console.log('cache hit');
      if (cachedValue === 'true') {
        return next();
      } else {
        res.status(403);
        return res.send('You need access to this endpoint!');
      }
    } else {
      console.log('cache miss');
      // move rest of code in here
      axios.post('http://localhost:3002/service2/', body)
        .then((res) => {
          if (res.data.valid) {
            client.set(key, true);
            return next();
          } else {
            client.set(key, false);
            res.status(403);
            return res.send('You need access to this endpoint!');
          }
        })
        .catch(console.log);
    }
  });


  // if (false) { // validation check
  //   return next();
  // } else {
  //   res.status(403);
  //   return res.send('You need access to this endpoint!');
  // }
})

app.get('/service1/*', (req, res) => {
  console.log(req.cookies)
  res.send("ads");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
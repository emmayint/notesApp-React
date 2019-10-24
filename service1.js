const express = require('express');
const redis = require('redis');
const cookieParser = require('cookie-parser');

const client = redis.createClient();

const app = express();
app.use(cookieParser());
const port = 3001;

app.use((req, res, next) => {
  if (true) {
    return next();
  } else {
    res.status(403);
    return res.send('You need access to this endpoint!');
  }
})

app.get('/service1/*', (req, res) => {
  cosnsole.log(req.cookies)
  client.set('myKey', 'myValue', 'EX', 3000);
  res.send("ads");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
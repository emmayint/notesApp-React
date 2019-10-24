const express = require('express');
const app = express();
const port = 3002;

app.get('/service2/*', (req, res) => res.send('Service 2'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
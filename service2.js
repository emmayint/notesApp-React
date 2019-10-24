const express = require('express');
const app = express();
app.use(express.json());

const port = 3002;

app.post('/service2/*', (req, res) => res.send('Service 2'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
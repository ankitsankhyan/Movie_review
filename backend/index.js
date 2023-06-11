const express = require('express');
const app = express();
const db = require('./config/db');
const port = 5000;
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Listening on port ${port}`));
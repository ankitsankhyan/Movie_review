const express = require('express');
const app = express();
app.use(express.json());
const routes = require('./routes/index');
// this will parse the data to the json 

const db = require('./config/db');
const port = 5000;

app.use('/', routes);
app.listen(port, () => console.log(`Listening on port ${port}`));
const express = require('express');
const app = express();
 require("dotenv").config();

const morgan = require('morgan');
console.log(process.env.Nodemailer_user);
console.log(process.env.Nodemailer_pass);
app.use(express.json());
const routes = require('./routes/index');
// this will parse the data to the json 

const db = require('./config/db');
const port = 5000;
app.use(morgan('dev'));
app.use('/', routes);
app.listen(port, () => console.log(`Listening on port ${port}`));
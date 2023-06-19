const express = require('express');
const app = express();
const cors = require('cors');
 require("dotenv").config();
 require('express-async-errors');
const morgan = require('morgan');
console.log(process.env.Nodemailer_user);
console.log(process.env.Nodemailer_pass);
app.use(cors());
app.use(express.json());
app.use((err,req,res,next)=>{
  res.status(500).json({error: err.message});
})
const routes = require('./routes/index');
// this will parse the data to the json 
app.use((err, req, res, next) => {
    
    
      res.status(403).json({ error: err.message });
    
});

const db = require('./config/db');

const port = 5000;
app.use(morgan('dev'));
app.use('/api', routes);
app.use('/*', (req, res) => {
  res.status(401).json({ error: 'url not found' });
});
app.listen(port, () => console.log(`Listening on port ${port}`));
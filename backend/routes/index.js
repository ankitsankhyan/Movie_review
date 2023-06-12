const express = require("express");
const router = express.Router();
const user_routes = require('./user');
router.use('/user', user_routes);
module.exports = router;
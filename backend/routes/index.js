const express = require("express");
const router = express.Router();

const user_routes = require('./user');
const actor_routes = require('./actor');
router.use('/user', user_routes);
router.use('/actor', actor_routes);   
router.use('/movie', require('./movie'))
module.exports = router;
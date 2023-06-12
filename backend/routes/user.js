const express = require("express");
const { create } = require("../controller/user");
const {userValidor} = require("../middleware/validator");
const {validationHandler} = require("../middleware/validator");

const router = express.Router();
router.post('/', (req, res) => res.send('Hello World! from user router'));
router.post("/create", create);

module.exports = router;

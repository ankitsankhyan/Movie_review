const express = require("express");
const { create } = require("../controllers/user");
const {userValidor} = require("../middleware/validator");
const {validationHandler} = require("../middleware/validator");

const router = express.Router();

router.post("/create",userValidor,validationHandler, create);

module.exports = router;

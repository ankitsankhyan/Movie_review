const express = require("express");
const user = require("../controller/user");
const {userValidor} = require("../middleware/validator");
const {validationHandler} = require("../middleware/validator");

const router = express.Router();
router.post('/', (req, res) => res.send('Hello World! from user router'));
router.post("/create", userValidor,validationHandler, user.create);
console.log(user.verifyEmail);
router.post("/verifyEmail", user.verifyEmail);
router.post('/reset-password', user.forgetPassword)

module.exports = router;

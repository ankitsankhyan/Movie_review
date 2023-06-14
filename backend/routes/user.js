const express = require("express");
const user = require("../controller/user");
const {userValidor} = require("../middleware/validator");
const {validationHandler} = require("../middleware/validator");
const {validatePassword} = require('../middleware/validator');
const {isValidPassResetToken} = require("../middleware/user");
const router = express.Router();
router.post('/', (req, res) => res.send('Hello World! from user router'));
router.post("/create", userValidor,validationHandler, user.create);
console.log(user.verifyEmail);
router.post("/verifyEmail", user.verifyEmail);
router.post('/forget-password', user.forgetPassword)
router.post('/verify-pass-reset-token',isValidPassResetToken,  user.verifyLink);
router.post('/reset-password',validatePassword,validationHandler,isValidPassResetToken, user.resetPassword);
router.post('/sign-in', user.signIn);
module.exports = router;

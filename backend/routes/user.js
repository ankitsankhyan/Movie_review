const express = require("express");
const jwt = require("jsonwebtoken");
const user = require("../controller/user");
const {userValidor} = require("../middleware/validator");
const {validationHandler} = require("../middleware/validator");
const {validatePassword} = require('../middleware/validator');
const {isValidPassResetToken} = require("../middleware/user");
const { sendError } = require("../utils/helper");
const User = require("../Model/user");
const { findById } = require("../Model/emailVerificationToken");
const router = express.Router();
const {isAuth} = require('../middleware/auth')

// ##############################  ROUTES  ##########################################

router.post('/', (req, res) => res.send('Hello World! from user router'));
router.post("/create", userValidor,validationHandler, user.create);
console.log(user.verifyEmail);
router.post("/verifyEmail", user.verifyEmail);
router.post('/forget-password', user.forgetPassword)
router.post('/verify-pass-reset-token',isValidPassResetToken,  user.verifyLink);
router.post('/reset-password',validatePassword,validationHandler,isValidPassResetToken, user.resetPassword);
router.post('/signin', user.signIn);

router.get('/is-auth',isAuth, (req,res)=>{
   res.json({user: req.user});
  
     
})
module.exports = router;

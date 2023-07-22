const express = require("express");
const jwt = require("jsonwebtoken");
const user = require("../controller/user");
const {userValidtor} = require("../middleware/validator");
const {validate} = require("../middleware/validator");
const {validatePassword} = require('../middleware/validator');
const {isValidPassResetToken} = require("../middleware/user");
const { sendError } = require("../utils/helper");
const User = require("../Model/user");
const { findById } = require("../Model/emailVerificationToken");
const router = express.Router();
const {isAuth} = require('../middleware/auth')

// ##############################  ROUTES  ##########################################

router.post('/', (req, res) => res.send('Hello World! from user router'));
router.post("/create", userValidtor,validate, user.create);
console.log(user.verifyEmail);
router.post("/verifyEmail", user.verifyEmail);
router.post('/forget-password', user.forgetPassword)
router.post('/verify-pass-reset-token',isValidPassResetToken,  user.verifyLink);
router.post('/reset-password',validatePassword,validate,isValidPassResetToken, user.resetPassword);
router.post('/signin', user.signIn);

router.get('/is-auth',isAuth, (req,res)=>{
   res.json({user: req.user});
  
     
})
module.exports = router;

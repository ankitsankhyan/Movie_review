const User = require('../Model/user')
const EmailVerificationToken = require('../Model/emailVerificationToken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const mongoose = require('mongoose');
// this determines the format of user_id
const {isValidObjectId} = require('mongoose');
const { sendError } = require('../utils/helper');
const PasswordResetToken = require('../Model/passwordResetToken');
const { generateRandomByte } = require('../utils/helper');
const {generateMailTransporter} = require('../utils/mail')

module.exports.create = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body

  const oldUser = await User.findOne({ email });

  if (oldUser) return res.status(401).json({ error: "This email is already in use!" });

  const newUser = new User({ name, email, password })
  await newUser.save()
  // generate 6 digit otp
  let otp = '';
  for(let i = 0; i <= 5; i++){
    // math.random() generates a random number between 0 and 1 and *10 means generate between 0 to 10
    otp += Math.floor(Math.random() * 10);
  }
  console.log(otp);

// new keyword is used to create a new instance of the model but it does not save it to the database

  const newEmailVerificationToken = new EmailVerificationToken({owner: newUser._id, token: otp});
// //  this is used to save the new instance to the database
  await newEmailVerificationToken.save();

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5999fbf3b5e0ed",
      pass: "ba445e53d1c142"
    }
  });

  transport.sendMail({
    from:'ankitsankhyan04@gmail.com',
    to: newUser.email,
    subject: "Email Verification",
    html: `<h1>Hi ${newUser.name}</h1><p>Your OTP is ${otp}</p>`
  }, (err,info)=>{
    if(err){
      console.log('error is there');
      return;
    }
    console.log('info is' , info);
  });

  res.status(201).json({ message:'Otp has been sent to you' });
};



module.exports.verifyEmail= async (req,res)=>{
 const {otp, user_id} = req.body;
 console.log(otp, user_id);
//  this is function of mongoose to check if the id is valid or not
  if(!isValidObjectId(user_id)){
    return res.status(401).json({error: 'Invalid user id'});
  }

  const user = await User.findById(user_id);
  
  console.log(user);
 if(!user){
  res.status(401).json({error: 'USER NOT FOUND'});
  return;
 }
 

  const emailVerificationToken = await EmailVerificationToken.findOne({owner: user_id});
  console.log(emailVerificationToken );
  if(!emailVerificationToken){
    return res.status(401).json({error: 'USER NOT FOUND'});
  }

  const isMatch = await bcrypt.compare(otp, emailVerificationToken.token);
  console.log(isMatch);
  if(!isMatch){
    await User.findByIdAndDelete(user_id);
    res.status(404).json({message: 'OTP does not match'});
    return;
  }
   
  
  
  user.isVerified = true;
  await user.save();
  
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5999fbf3b5e0ed",
      pass: "ba445e53d1c142"
    }
    
  })

  transport.sendMail({
    from:'ankitsankhyan04@gmail.com',
    to: user.email,
    subject: "Email Verification",
    html: `<h1>Hi ${user.name}</h1><p>Your email has been verified</p>`
  })
  await EmailVerificationToken.deleteOne({owner: user_id});
  user.isVerified = true;
  await user.save();
 res.status(201).json({message: 'Email has been verified'});
}

module.exports.resendMOtp = async (req,res)=>{
  const {user_id} = req.body;

  if(!isValidObjectId(user_id)){
    return res.status(401).json({error: 'Invalid user id'});
  }
  const user = await User.findById(user_id);
  if(!user){
    return res.status(401).json({error: 'Invalid user id'});
  }
  if(user.isVerified){
    return res.status(401).json({error: 'Email is already verified'});
  }
  const tokenExits = await EmailVerificationToken.find({owner: user_id});
  if(tokenExits.length > 0){
     res.status(401).json({error: 'OTP already sent wait for 1 hour to generate new OTP'});
     return;
  }
  let otp = '';
  for(let i = 0; i <= 5; i++){
    otp += (Math.random()*9);
  }
  const newEmailVerificationToken = new EmailVerificationToken({owner: user_id, token: otp});
  await newEmailVerificationToken.save();

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {   user: "5999fbf3b5e0ed",
    pass: "ba445e53d1c142"
  }
  })
  transport.sendMail({
    from:'ankitsankhyan04@gmail.com',
    to: user.email,
    subject: "Email Verification",
    html: `<h1>Hi ${user.name}</h1><p>Your OTP is ${otp}</p>`
  })

  res.status(201).json({message: 'Otp has been sent to you'});
}


async function deleteUnverifiedUsers(){
   const time = new Date();
   time.setHours(time.getHours()- 1);
 var users =  await User.deleteMany({isVerified:false, createdAt:{$lte:time}});
 console.log(users);


}

// calling the function after 1 hour
var id  = setInterval(deleteUnverifiedUsers, 3600000);

module.exports.forgetPassword = async (req,res)=>{
const {email} = req.body;
if(!email) return sendError(res, 'email is missing');

const user = await User.findOne({email});
console.log(user.id);

const availToken = await PasswordResetToken.findOne({owner:user.id});
console.log(availToken);
if(availToken){
   return sendError(res,"only after one hour you can request for another token");
}

// using crypto model to generate strong token

  const token = await generateRandomByte();
  console.log(token);
  const newPasswordResetToken = await PasswordResetToken({owner:user._id, token});
  await newPasswordResetToken.save();

  const resetPasswordUrl = `http://localhost:3000?reset-password?token=${token}&id=${user._id}`;
  var transport = generateMailTransporter();
  
  transport.sendMail({
    from:'ankitsankhyan04@gmail.com',
    to:user.email,
    subject:'Reset Password Link',
    html:`
    <p> Click here to reset password</p>
    <a href = '${resetPasswordUrl}'> Change Password</a> `,

  })
  res.status(200).json({
     message:'data sent successfully'
  });
}

module.exports.verifyLink = (req, res)=>{
  res.json({ valid: true });
}

module.exports.resetPassword = async (req,res)=>{
  const {newPassword, userId} = req.body;
  if(!newPassword) return sendError(res, 'new password is missing');
  const user = await User.findById(userId);
  if(!user) return sendError(res, 'user not found');
  const matched = await bcrypt.compare(newPassword, user.password);
  if(matched) return sendError(res, 'new password should not be same as old password');

  user.password = newPassword;
  await user.save();
  const transport = generateMailTransporter();

  transport.sendMail({
    from:'ankitsankhyan04@gmail.com',
    to:user.email,
    subject:'Password Changed',
    html:`${user.name} your password has been changed successfully`
  });
// this allow us to create multiple token for the user and delete only that token from where password is changed
  await PasswordResetToken.findByIdAndDelete(req.resetToken._id);
  res.status(200).json({message: 'password changed successfully'});
}

module.exports.signIn = async (req,res)=>{
      const {email,password} = req.body;

      const user = await User.findOne({email});
      if(!user) return sendError(res, 'user not found');

      const matched = await bcrypt.compare(password, user.password);
      if(!matched) return sendError(res, 'invalid credentials');

  const jwt_token = jwt.sign({id:user_id},'ankit ka server',{expiresIn:'30d'});
  return res.status(200).json({id:user._id, name:user.name,email:user.email,jwt_token});
}
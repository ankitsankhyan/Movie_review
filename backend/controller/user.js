const User = require('../Model/user')
const EmailVerificationToken = require('../Model/emailVerificationToken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// this determines the format of user_id
const {isValidObjectId} = require('mongoose');

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

module.verifyEmail= async (req,res)=>{
  const {userId, otp} = req.body;
  if(!isValidObjectId(userId)){
    return res.status(401).json({error: 'Invalid User Id'});
  }
  let emailVerificationToken = await EmailVerificationToken.findOne({owner: userId});
  if(!emailVerificationToken){
    return res.status(401).json({error: 'Invalid Token'});
  }
  if(otp === emailVerificationToken.otp){
    res.status(200).json({message: 'Email Verified'});
  }else{
    res.status(401).json({error: 'Invalid OTP'});
  }
 
}
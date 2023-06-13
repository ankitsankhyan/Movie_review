const User = require('../Model/user')
const EmailVerificationToken = require('../Model/emailVerificationToken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
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

module.resendMOtp = async (req,res)=>{
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


// function deleteUnverifiedUsers() {
//   const oneHourAgo = new Date();
//   oneHourAgo.setHours(oneHourAgo.getHours() - 1);

//   User.deleteMany({ isVerified: false, createdAt: { $lte: oneHourAgo } })
//     .then((result) => {
//       console.log(`${result.deletedCount} unverified user(s) deleted.`);
//     })
//     .catch((error) => {
//       console.error('Error deleting unverified users:', error);
//     });
// }

// // Run the function every hour (3600000 milliseconds)
// setInterval(deleteUnverifiedUsers, 3600000);

async function deleteUnverifiedUsers(){
   const time = new Date();
   time.setHours(time.getHours()- 1);
 var users =  await User.deleteMany({isVerified:false, createdAt:{$lte:time}});
 console.log(users);


}

// calling the function after 1 hour
var id  = setInterval(deleteUnverifiedUsers, 3600000);
  
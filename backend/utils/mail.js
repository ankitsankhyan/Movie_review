const nodemailer = require('nodemailer');

const generateMailTransporter =()=>{
  return  nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.Nodemailer_user,
            pass: process.env.Nodemailer_pass
          }
    })
}

const generateOTP = (otp_length = 6) => {
   var otp = '';
    for (let i = 1; i <= otp_length; i++) {
        const randomVal = Math.round(Math.random() * 9);
        otp += randomVal;
    }
    return otp;
}

module.exports = {
    generateMailTransporter,generateOTP
}
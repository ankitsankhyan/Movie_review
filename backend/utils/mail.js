const nodemailer = require('nodemailer');

const generateMailTransporter =()=>{
    nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "5999fbf3b5e0ed",
            pass: "ba445e53d1c142"
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
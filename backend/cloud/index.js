const cloudinary = require("cloudinary").v2;
  console.log(process.env.CLOUD_API_KEY,'is api key');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

module.exports = cloudinary;

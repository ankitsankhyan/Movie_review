const cloudinary = require("cloudinary").v2;
const Actor = require("../models/actor");
cloudinary.config({ 
  cloud_name: 'djpfisxot', 
  api_key: '512926511114761', 
  api_secret: '7AglEiMhTUXpMs4mbAIec1HqtZg',
  secure: true
});
module.exports.create = (req, res) => {
  console.log(req.body);
    res.json({
        message: "Actor created successfully",
    });
};
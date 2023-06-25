const cloudinary = require("cloudinary").v2;
const Actor = require("../Model/actor");
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret,
  secure: true
});
// secure creates https url

module.exports.create = async(req, res) => {
try{
  const file = req.file;
  const {name, about, gender} = req.body;
  const actor = new Actor({
    name,about, gender
  });
 console.log(file);
  if (file) {
    const result = await cloudinary.uploader.upload(file.path, {pages:true});
   console.log(result);
    actor.avatar = {
      url: result.secure_url,
      public_id: result.public_id
    };
   console.log(result);
  }
  
  await actor.save();
  res.send(
    `<img src="${actor.avatar.url}" alt="">`
  )
}catch(e){
  console.log(e);
  // throw new Error(e.message);
  res.status(e.http_code).json({
    message: e.message
  });

}
 
  
};
const {sendError} = require('../utils/helper');
const cloudinary = require('../cloud');
exports.uploadTrailer = async(req, res) => {
   const {file} = req;
   console.log(file);
   if(!file) return sendError(res,400,'No file found');
//    this means change secure url to url
   const {secure_url:url, public_id} = await cloudinary.uploader.upload(file.path, {
    resource_type:"video"
   });

   res.json({url, public_id});
}
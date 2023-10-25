const {sendError} = require('../utils/helper');
const cloudinary = require('../cloud');
const Movie = require('../models/movie');
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

exports.createMovie = async(req, res) => {
   const {file, body} = req;
   const {title, storyline, director, releseDate, status, genres,type, cast, tags, poster, trailer,writers,language} = body;
  
   const newMovie = new Movie({
      title, storyline,  releseDate, status, genres,type, cast, tags,  trailer,language
   })

   if(director){
      if(!isValidObjectId(director)) return sendError(res,400,'Invalid director id');
      newMovie.director = director;
   }
   if(writers){
      for(let id of writers){
         if(!isValidObjectId(id)) return sendError(res,400,'Invalid writer id');
      }
      newMovie.writers = writers;
      if (file) {
         const {
           secure_url: url,
           public_id,
           responsive_breakpoints,
         } = await cloudinary.uploader.upload(file.path, {
           transformation: {
             width: 1280,
             height: 720,
           },
           responsive_breakpoints: {
             create_derived: true,
             max_width: 640,
             max_images: 3,
           },
         });
      
    const finalposter = {url,public_id,responsive:[]};
    const {breakpoints} = responsive_breakpoints[0];
    for(let imgObj of breakpoints){
      const {secure_url} = imgObj;
      finalposter.responsive.push(secure_url);
    }
   //  Note 201 is status code for created in mongoDB database
    newMovie.poster = finalposter;
   }
      await newMovie.save();
     res.status(201).json({
      id:newMovie._id,
      title:newMovie.title,

     })
   }
}

// entire doc change put
// partial doc change patch

// we will have 2 routes one to update entire doc and one to update partial doc


const multer = require('multer');
const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
   
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }else{
        
        cb(new Error('only images are allowed'), false);
    }
    // cb(null, true);

}

const fileFilterVideo = (req, file, cb) => {
   console.log(file);
   console.log('running');
    if(file.mimetype.startsWith('video')){
        cb(null, true);
    }else{
        
        cb(new Error('only videos are allowed'), false);
    }
    // cb(null, true);

}

exports.uploadImage = multer({storage:storage, fileFilter:fileFilter});
exports.uploadVideo = multer({storage:storage, fileFilter:fileFilterVideo});


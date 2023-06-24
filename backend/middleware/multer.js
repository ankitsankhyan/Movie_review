const multer = require('multer');
const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
    console.log('running');
    console.log(file);
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }else{
        
        cb(new Error('only images are allowed'), false);
    }
    cb(null, true);

}

exports.uploadImage = multer({storage:storage, fileFilter:fileFilter});
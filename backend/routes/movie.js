const express = require('express');
const router = express.Router();
const {uploadTrailer} = require('../controller/movie')
const {isAuth, isAdmin} = require('../middleware/auth');
const { uploadVideo} = require('../middleware/multer');
// Note name of attribute same as passed in sigle
router.post('/upload-trailer', isAuth, isAdmin, uploadVideo.single('video'), uploadTrailer);
module.exports = router;
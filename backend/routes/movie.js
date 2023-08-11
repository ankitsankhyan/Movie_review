const express = require('express');
const router = express.Router();
const {createMovie} = require('../controller/movie');
const {uploadTrailer} = require('../controller/movie')
const {isAuth, isAdmin} = require('../middleware/auth');
const { uploadVideo, uploadImage} = require('../middleware/multer');
// Note name of attribute same as passed in sigle
router.post('/upload-trailer', isAuth, isAdmin, uploadVideo.single('video'), uploadTrailer);
router.post('/create', isAuth, isAdmin, uploadImage.single('poster'), createMovie);

module.exports = router;
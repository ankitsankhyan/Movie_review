const express = require('express');
const router = express.Router();
const {createMovie} = require('../controller/movie');
const {uploadTrailer} = require('../controller/movie')
const {isAuth, isAdmin} = require('../middleware/auth');
const { uploadVideo, uploadImage} = require('../middleware/multer');
const { validateMovie, validate } = require('../middleware/validator');
const {parseData} = require('../utils/helper');
// Note name of attribute same as passed in sigle
router.post('/upload-trailer', isAuth, isAdmin, uploadVideo.single('video'), uploadTrailer);
router.post('/create', isAuth, isAdmin, uploadImage.single('poster'),parseData, validateMovie,validate, createMovie);

module.exports = router;

// IMP NOTE:

// TO SEND A Array from form first convert it into the JSON.stringify() and then send it via form data
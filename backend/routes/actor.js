
const express = require('express');
const router = express.Router();
const ActorController = require('../controller/actor');
const {uploadImage} = require('../middleware/multer');
const {actorValidator,validationHandler} = require('../middleware/validator');
router.post('/create',uploadImage.single("avatar"),actorValidator,validationHandler, ActorController.create);

module.exports = router;

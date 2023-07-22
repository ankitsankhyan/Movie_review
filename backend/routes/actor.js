const express = require("express");
const {
  createActor,
  updateActor,
  removeActor,
  searchActor,
  getLatestActors,
  getSingleActor,
} = require("../controller/actor");
const { uploadImage } = require("../middleware/multer");
const { actorInfoValidator, validate } = require("../middleware/validator");
const {isAuth, isAdmin} = require('../middleware/auth');
const router = express.Router();
router.post(
  "/create",
  isAuth,
  isAdmin,
  uploadImage.single("avatar"),
  actorInfoValidator,
  validate,
  createActor
);

router.post(
  "/update/:actorId",
  isAuth,
  isAdmin,
  uploadImage.single("avatar"),
  actorInfoValidator,
  validate,
  updateActor
);

router.delete("/:actorId", isAuth,
isAdmin, removeActor);
router.get("/search", isAuth,
isAdmin, searchActor);
router.get("/latest-uploads", isAuth,
isAdmin, getLatestActors);
router.get("/single/:id", getSingleActor);

module.exports = router;

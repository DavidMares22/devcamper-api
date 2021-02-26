const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  deleteBootcamp,
  updateBootcamp,
  createBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require("../controllers/bootcamps");

const Bootcamp = require("../models/Bootcamp")
const advancedResults = require('../middleware/advancedResults')

// Include other resource routers
const courseRouter = require("./courses");

const router = express.Router();

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router.route("/").get(advancedResults(Bootcamp,'courses'),getBootcamps).post(createBootcamp);
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router.route("/:id/photo").put(bootcampPhotoUpload)

router
  .route("/:id")
  .put(updateBootcamp)
  .delete(deleteBootcamp)
  .get(getBootcamp);

module.exports = router;

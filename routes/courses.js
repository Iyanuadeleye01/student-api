const express = require("express");
const router = express.Router();

const courseController = require("../controller/courseController");

const {isAuthenticated} = require('../middleware/authenticate');

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getSingleCourse);
router.post("/", isAuthenticated, courseController.createCourse);
router.put("/:id", isAuthenticated, courseController.updateCourse);
router.delete("/:id", isAuthenticated, courseController.deleteCourse);

module.exports = router;
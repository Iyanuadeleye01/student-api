const express = require("express");
const router = express.Router();

const courseController = require("../controller/courseController");

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getSingleCourse);
router.post("/", courseController.createCourse);
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
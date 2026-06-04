const express = require("express");
const router = express.Router();

const studentController = require("../controller/studentController");

const {isAuthenticated} = require('../middleware/authenticate');

router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getSingleStudent);
router.post("/", isAuthenticated, studentController.createStudent);
router.put("/:id", isAuthenticated, studentController.updateStudent);
router.delete("/:id", isAuthenticated, studentController.deleteStudent);

module.exports = router;
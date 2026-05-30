const express = require("express");
const router = express.Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
    res.status(200).json({ message: "API running successfully" });
});

router.use("/api/students", require("./students"));
router.use("/api/courses", require("./courses"));

module.exports = router;
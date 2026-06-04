const express = require("express");
const passport = require("passport");
const router = express.Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
    //#swagger.tags = ['Home']
    res.status(200).json({ message: "API running successfully" });
});

router.use("/api/students", require("./students"));
router.use("/api/courses", require("./courses"));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logOut(function(err) {
        res.redirect('/');
    });
});

module.exports = router;
const express = require("express");
const router = express.Router();
const swaggerIu = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.use("/api-docs", swaggerIu.serve);
router.get("/api-docs", swaggerIu.setup(swaggerDocument));

module.exports = router;
const express = require("express");
const pingController = require("../controller/pingController");

const router = express.Router();

router.get("/:host", pingController.ping);

module.exports = router;

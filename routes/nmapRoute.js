const express = require("express");
const nmapController = require("../controller/nmapController");

const router = express.Router();

router.get("/:host", nmapController.scan);

module.exports = router;

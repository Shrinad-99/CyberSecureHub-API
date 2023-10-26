const express = require("express");
const whoisController = require("../controller/whoisController");

const router = express.Router();

router.get("/:domain", whoisController.lookup);

module.exports = router;

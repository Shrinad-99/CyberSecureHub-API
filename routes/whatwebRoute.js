const express = require("express");
const whatwebController = require("../controller/whatwebController");

const router = express.Router();

router.get("/:url", whatwebController.info);

module.exports = router;

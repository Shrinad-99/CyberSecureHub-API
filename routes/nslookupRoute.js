const express = require("express");
const nslookupController = require("../controller/nslookupController");

const router = express.Router();

router.get("/:host", nslookupController.resolve);

module.exports = router;

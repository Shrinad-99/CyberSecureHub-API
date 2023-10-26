const express = require("express");
const passwordStrengthController = require("../controller/passwordStrengthController");

const router = express.Router();

router.post("/check", passwordStrengthController.check);

module.exports = router;

const express = require("express");
const informationController = require("../controllers/InformationController");

const router = express.Router();

// Authors data Table
router.get("/authors", informationController.getAuthorsInformation);

module.exports = router;
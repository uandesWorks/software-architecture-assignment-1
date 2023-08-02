const express = require("express");
const router = express.Router();

router.get("", (req, res) => {
  const locals = {
    title: "chell",
    description: "Assigment 01"
  }
  res.render("index", { locals });
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
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

router.get("/books", (req, res) => {
  res.render("books");
});

router.get("/sales", (req, res) => {
  res.render("sales");
});

router.get("/authors", (req, res) => {
  res.render("authors");
});

router.get("/reviews", (req, res) => {
  res.render("reviews");
});

module.exports = router;
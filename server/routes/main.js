const express = require("express");
const Author = require("../models/Author");
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

router.get("/booksView", (req, res) => {
  res.render("books");
});

router.get("/salesView", (req, res) => {
  res.render("sales");
});

router.get("/authorsView", async (req, res) => {
  try {
    const allAuthors = await Author.find();
    res.render("authors", { allAuthors }); 
  } catch (error) {
    res.status(500).json({ error: "Error fetching authors" });
  }
});

router.get("/reviewsView", (req, res) => {
  res.render("reviews");
});

module.exports = router;
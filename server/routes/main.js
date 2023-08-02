const express = require("express");
const router = express.Router();
const Author = require("../models/Author");
const Book = require("../models/Book");
const Review = require("../models/Review");
const Sale = require("../models/Sale");


router.get("", (req, res) => {
  const locals = {
    title: "chell",
    description: "Assigment 01"
  }
  res.render("index", { locals });
});


function insertAuthorData() {
  Author.insertMany([{
    name: "J.K. Rowling",
    birth: "1965-07-31",
    country: "United Kingdom",
    description: "Joanne Rowling CH, OBE, HonFRSE, FRCPE, FRSL, better known by her pen name J. K. Rowling, is a British author, screenwriter, producer, and philanthropist. She is best known for writing the Harry Potter fantasy series, which has won multiple awards and sold more than 500 million copies, becoming the best-selling book series in history. The books are the basis of a popular film series, over which Rowling had overall approval on the scripts and was a producer on the final films. She also writes crime fiction under the pen name Robert Galbraith."
  },
  {
    name: "Stephen King",
    birth: "1947-09-21",
    country: "United States",
    description: "Stephen Edwin King is an American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels. His books have sold more than 350 million copies, and many have been adapted into films, television series, miniseries, and comic books. King has published 61 novels, including seven under the pen name Richard Bachman, and five non-fiction books. He has also written approximately 200 short stories, most of which have been published in book collections."
  }])
}

//insertAuthorData()

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
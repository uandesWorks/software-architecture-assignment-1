const express = require("express");
const Author = require("../models/Author");
const Book = require("../models/Book");
const Review = require("../models/Review");
const Sale = require("../models/Sale");
const router = express.Router();
const fetch = require("node-fetch");


router.get("", (req, res) => {
  const locals = {
    title: "chell",
    description: "Assigment 01"
  }
  res.render("index", { locals });
});

router.get("/authorsView", async (req, res) => {
  try {
    const response = await fetch("http://localhost:8000/authors");
    const data = await response.json();

    const allAuthors = data; 

    res.render("authors", { allAuthors });
  } catch (error) {
    res.status(500).json({ error: "Error fetching authors" });
  }
});

router.get("/booksView", async (req, res) => {
  try {
    const response = await fetch("http://localhost:8000/books");
    const data = await response.json();
    
    const allBooks = data; 

    res.render("books", { allBooks });
  } catch (error) {
    res.status(500).json({ error: "Error fetching books" });
  }
});

router.get("/reviewsView", async (req, res) => {
  try {
    const response = await fetch("http://localhost:8000/reviews");
    const data = await response.json();
    
    const allReviews = data; 

    res.render("reviews", { allReviews });
  } catch (error) {
    res.status(500).json({ error: "Error fetching review" });
  }
});

router.get("/salesView", async (req, res) => {
  try {
    const response = await fetch("http://localhost:8000/sales");
    const data = await response.json();

    const allSales = data; 

    res.render("sales", { allSales }); 
  } catch (error) {
    res.status(500).json({ error: "Error fetching sales" });
  }
});


router.get("/informationView", async (req, res) => {
  try {
    const response = await fetch("http://localhost:8000/information/authors?sort=authorName&order=asc");
    const data = await response.json();

    const ascAuthorName = data["authorsData"]; 

    res.render("information", { ascAuthorName }); 
  } catch (error) {
    res.status(500).json({ error: "Error fetching sales" });
  }
});

router.get("/searchView", (req, res) => {
  res.render("search");
});

module.exports = router;
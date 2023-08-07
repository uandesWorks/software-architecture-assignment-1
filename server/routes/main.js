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
    let response = await fetch("http://localhost:8000/authors");
    let data = await response.json();
    const allAuthors = data; 

    response = await fetch("http://localhost:8000/books");
    data = await response.json();
    const allBooks = data; 

    res.render("books", { allBooks, allAuthors });
  } catch (error) {
    res.status(500).json({ error: "Error fetching books" });
  }
});

router.get("/reviewsView", async (req, res) => {
  try {
    let response = await fetch("http://localhost:8000/reviews");
    let data = await response.json();
    const allReviews = data; 

    response = await fetch("http://localhost:8000/books");
    data = await response.json();
    const allBooks = data; 

    res.render("reviews", { allReviews, allBooks });
  } catch (error) {
    res.status(500).json({ error: "Error fetching review" });
  }
});

router.get("/salesView", async (req, res) => {
  try {
    let response = await fetch("http://localhost:8000/sales");
    let data = await response.json();
    const allSales = data; 

    response = await fetch("http://localhost:8000/books");
    data = await response.json();
    const allBooks = data; 

    res.render("sales", { allSales, allBooks }); 
  } catch (error) {
    res.status(500).json({ error: "Error fetching sales" });
  }
});


router.get("/informationView", async (req, res) => {
  const description = req.query.description;
  try {

    // Authors Data
    const insideBody = { search: description };

    const authors = await fetch("http://localhost:8000/information/authors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(insideBody),
    });

    const authorsData = await authors.json();

    // Top 10 rated books
    const ratedBooks = await fetch("http://localhost:8000/information/top-rated-books");
    const ratedBooksData = await ratedBooks.json();

    // Top 50 selling books
    const sellingBooks = await fetch("http://localhost:8000/information/top50SellingBooks");
    const sellingBooksData = await sellingBooks.json();

    res.render("information", { authorsData, ratedBooksData, sellingBooksData }); 
  } catch (error) {
    res.status(500).json({ error: "Error fetching sales" });
  }
});

router.get("/searchView", async (req, res) => {
  const description = req.query.description;
  try {
    
    const insideBody = { search: description }


    const response = await fetch("http://localhost:8000/information/searchbooks", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(insideBody), 
    });

    const data = await response.json();

    const coincidences = data; 

    res.render("search", { coincidences }); 
  } catch (error) {
    res.status(500).json({ error: "Error fetching search" });
  }
});

module.exports = router;
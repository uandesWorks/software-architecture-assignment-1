const express = require("express");
const bookController = require("../controllers/BookController");

const router = express.Router();

// Create a new book
router.post("/", bookController.createBook);

// Get all books
//router.get("/", bookController.getAllBooks);

// Get a specific book by ID
//router.get("/:id", bookController.getBookById);

// Update a book by ID
//router.put("/:id", bookController.updateBook);

// Delete a book by ID
//router.delete("/:id", bookController.deleteBook);

module.exports = router;

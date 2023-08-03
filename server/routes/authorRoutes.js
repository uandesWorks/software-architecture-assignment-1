const express = require("express");
const authorController = require("../controllers/AuthorController");

const router = express.Router();

// Create a new author
router.post("/", authorController.createAuthor);

// Get all authors
router.get("/", authorController.getAllAuthors);

// Get a specific author by ID
router.get("/:id", authorController.getAuthorById);

// Update a author by ID
router.put("/:id", authorController.updateAuthor);

// Delete a author by ID
router.delete("/:id", authorController.deleteAuthor);

module.exports = router;

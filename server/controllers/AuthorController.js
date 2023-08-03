// controllers/authorController.js
const Author = require("../models/Author");

// Create a new author
exports.createAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all authors
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific author by ID
exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an author by ID
exports.updateAuthor = async (req, res) => {
  try {
    const { name, birth, country, description } = req.body;
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      { name, birth, country, description },
      { new: true }
    );
    res.json(updatedAuthor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an author by ID
exports.deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.json({ message: "Author deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

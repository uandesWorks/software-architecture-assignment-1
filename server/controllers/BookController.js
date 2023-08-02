const Book = require("../models/Book");


// Create a new book
exports.createBook = async (req, res) => {
   try {
      const book = new Book(req.body);
      await book.save();
      res.status(201).json(book.name);
   } catch (err) {
      res.status(400).json({ error: err.message });
  }
};
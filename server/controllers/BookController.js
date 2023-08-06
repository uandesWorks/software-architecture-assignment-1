const Book = require("../models/Book");
const Author = require("../models/Author");

// Create a new book
exports.createBook = async (req, res) => {
   try {
      const book = new Book(req.body);
      const authorName = await Author.findById(book.author._id, 'name');
      if (!authorName) {
        return res.status(404).json({ error: "Author not found" });
      }
      book.author.name = authorName.name;
      await book.save();
      res.status(201).json(book);
   } catch (err) {
      res.status(400).json({ error: err.message });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('author', '_id name');
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
  try {
    const { name, summary, publication_date, sales, author } = req.body;

    const updateObj = { name, summary, publication_date, sales, author };

    if (author) {
      const newAuthor = await Author.findById(author._id, 'name');
      if (!newAuthor) {
        return res.status(404).json({ error: "Author not found" });
      }
      updateObj.author._id = newAuthor._id;
      updateObj.author.name = newAuthor.name;
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, updateObj, {
      new: true,
    });

    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Delete a book by ID
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
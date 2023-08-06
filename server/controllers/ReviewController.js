const Review = require("../models/Review");
const Book = require("../models/Book");

// Create a new Review
exports.createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    const bookName = await Book.findById(review.book._id, 'name');
      if (!bookName) {
        return res.status(404).json({ error: "Book not found" });
      }
      review.book.name = bookName.name;
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('book', '_id name');;
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get a specific review by ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a review by ID
exports.updateReview = async (req, res) => {
  try {
    const { book, review, score, up_votes } = req.body;

    const updateObj = {book, review, score, up_votes };

    if (book) {
      const newBook = await Book.findById(book._id, 'name');
      if (!newBook) {
        return res.status(404).json({ error: "Book not found" });
      }
      updateObj.book._id = newBook._id;
      updateObj.book.name = newBook.name;
    }

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id, updateObj, {
         new: true 
        }
    );

    res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a review by ID
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

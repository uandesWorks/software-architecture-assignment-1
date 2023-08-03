const mongoose = require("mongoose");
const casual = require("casual");
const Review = require("../server/models/Review");
const Book = require("../server/models/Book");

require("dotenv").config();

function generateReview(bookId) {
  return {
    book: bookId,
    review: casual.sentences(n = 2),
    score: casual.integer(from = 1, to = 5),
    up_votes: casual.integer(from = 0, to = 100),
  };
}

async function seedData() {
  try {
    console.log("Seeding Reviews...");
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const books = await Book.find();

    for (const book of books) {
      const numberOfReviews = casual.integer(from = 1, to = 10);
      for (let j = 0; j < numberOfReviews; j++) {
        const reviewData = generateReview(book._id);
        const review = new Review(reviewData);
        await review.save();
      }
    }

    console.log(`Reviews have been added to the database for existing books.`);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding reviews for existing books:', error);
  }
}

seedData();

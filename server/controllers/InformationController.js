const Author = require("../models/Author");
const Book = require("../models/Book");
const Review = require("../models/Review");
const Sale = require("../models/Sale");


// Authors data Table
exports.getAuthorsInformation = async (req, res) => {
  try {
   
    const authors = await Author.find();

    const authorsData = await Promise.all(
      authors.map(async (author) => {
        const publishedBooks = await Book.countDocuments({
          author: author._id,
        });
         console.log(publishedBooks);
         const reviews = await Review.find({ book: { $in: [author._id] } });
         console.log(reviews)
        const totalReviews = reviews.length;
        const totalScore = reviews.reduce(
          (total, review) => total + review.score,
          0
        );
        const averageScore = totalScore / totalReviews || 0;

        const sales = await Sale.find({ book: { $in: [author._id] } });
        const totalSales = sales.reduce((total, sale) => total + sale.sales, 0);

        return {
          author,
          publishedBooks,
          averageScore,
          totalSales,
        };
      })
    );


    // Sorting
    const { sort, order } = req.query;
    if (sort === "publishedBooks") {
      authorsData.sort((a, b) =>
        order === "asc"
          ? a.publishedBooks - b.publishedBooks
          : b.publishedBooks - a.publishedBooks
      );
    } else if (sort === "averageScore") {
      authorsData.sort((a, b) =>
        order === "asc"
          ? a.averageScore - b.averageScore
          : b.averageScore - a.averageScore
      );
    } else if (sort === "totalSales") {
      authorsData.sort((a, b) =>
        order === "asc"
          ? a.totalSales - b.totalSales
          : b.totalSales - a.totalSales
      );
    }

    res.json({ authorsData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// Top 10 rated Books

// Top 50 selling Books

// Search
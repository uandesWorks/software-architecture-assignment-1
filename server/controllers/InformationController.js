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
         const authorName = author.name;

         // publishedBooksCount
         const publishedBooks = await Book.find({
           author_id: author._id,
         });
         const publishedBooksCount = publishedBooks.length;

         // averageScore
         const reviews = await Review.find({
            book_id: { $in: publishedBooks.map((book) => book._id) },
          });
         const totalReviews = reviews.length;
         const totalScore = reviews.reduce(
           (total, review) => total + review.score,
           0
         );
         const averageScore = totalScore / totalReviews || 0;

         // totalSales
         const sales = await Sale.find({
            book_id: { $in: publishedBooks.map((book) => book._id) },
         });

         const totalSales = sales.reduce(
           (total, sale) => total + sale.sales,
           0
         );

         return {
           "author_name": authorName,
           "published_books":publishedBooksCount,
           "average_score":averageScore,
           "total_sales":totalSales,
         };
       })
    );


   // Sorting Bad
   const { sort, order } = req.body;
    if (sort === "publishedBooks") {
      authorsData.sort((a, b) =>
        order === "asc"
          ? a.published_books - b.published_books
          : b.published_books - a.published_books
      );
    } else if (sort === "averageScore") {
      authorsData.sort((a, b) =>
        order === "asc"
          ? a.average_score - b.average_score
          : b.average_score - a.average_score
      );
    } else if (sort === "totalSales") {
      authorsData.sort((a, b) =>
        order === "asc"
          ? a.total_sales - b.total_sales
          : b.total_sales - a.total_sales
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
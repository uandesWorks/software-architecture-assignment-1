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
           "authorName": authorName,
           "publishedBooks":publishedBooksCount,
           "averageScore":averageScore,
           "totalSales":totalSales,
         };
       })
    );


   // Sorting
   const { sort, order } = req.body;
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
// and if the book was the on the top 5 selling books the year of its publication.
exports.top50SellingBooks = async (req, res) => {
   try {
      // top 50 selling books of all time
      const books = await Book.find()
        .sort({ sales: -1 })
         .limit(50);
            
      const topSellingBooks = await Promise.all(
         books.map(async (book) => {
         
         // total sales for the author  
         const authorBooks = await Book.find({ author_id: book.author_id });
         const totalAuthorSales = authorBooks.reduce(
            (total, book) => total + book.sales,
            0
         );
         
        return {
          bookName: book.name,
          totalSales: book.sales, // showing their total sales for the book,
          totalAuthorSales: totalAuthorSales,
          isTop5Year: "add",
        };
      }));

      res.json(topSellingBooks);
   } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Search Books Description
exports.searchByDescription = async (req, res) => {
  const { search } = req.body;
   
  try {
    const searchWords = search.split(" ");

    const regexQueries = searchWords.map((word) => ({
      summary: { $regex: new RegExp(`\\b${word}\\b`, "i") },
    }));

    const books = await Book.find({ $and: regexQueries });

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
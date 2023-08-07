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
           'author._id': author._id
         });
         const publishedBooksCount = publishedBooks.length;

         // averageScore
         const reviews = await Review.find({
            'book._id': { $in: publishedBooks.map((book) => book._id) },
          });
         const totalReviews = reviews.length;
         const totalScore = reviews.reduce(
           (total, review) => total + review.score,
           0
         );
         const averageScore = totalScore / totalReviews || 0;

         // totalSales
         const sales = await Sale.find({
            'book._id': { $in: publishedBooks.map((book) => book._id) },
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
exports.getTopRatedBooks = async (req, res) => {
  try {
  const books = await Book.find();

  const topBooks = await Promise.all(
    books.map(async (book) => {
      const bookName = book.name;
      const reviews = await Review.find({ 'book._id': book._id });
        
      const totalReviews = reviews.length;
      if(totalReviews){
  
        const positiveReviews = await Review.find({'book._id': book._id});
        var topPositiveReview = positiveReviews.sort((a, b) => b.score - a.score);
        const highestScore = topPositiveReview[0].score;
        topPositiveReview = topPositiveReview.filter((review) => review.score === highestScore);
        const topPopularPositiveReview = topPositiveReview.sort((a,b) => b.up_votes - a.up_votes);
        const popularPositiveReview = topPopularPositiveReview[0].review;
        const popularPositiveScore = topPopularPositiveReview[0].score;
  
        
  
        const negativeReviews = await Review.find({'book._id': book._id});
        var topNegativeReview = negativeReviews.sort((a, b) => a.score - b.score);
        const lowestScore = topNegativeReview[0].score;
        topNegativeReview = topNegativeReview.filter((review) => review.score === lowestScore);
        const topPopularNegativeReview = topNegativeReview.sort((a,b) => b.up_votes - a.up_votes);
        const popularNegativeReview = topPopularNegativeReview[0].review;
        const popularNegativeScore = topPopularNegativeReview[0].score;
  
  
        const totalScore = reviews.reduce(
          (total, review) => total + review.score,
          0
        );
        const averageScore = totalScore / totalReviews || 0;
  
        return {
          bookName,
          averageScore,
          popularPositiveReview,
          popularPositiveScore,
          popularNegativeReview,
          popularNegativeScore
        };
      }
    })
  );

  topBooks.sort((a, b) => b.averageScore - a.averageScore);
  const topTenBook = topBooks.slice(0, 10);
  res.json({ topTenBook });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
// Top 50 selling Books
exports.top50SellingBooks = async (req, res) => {
   try {
      // top 50 selling books of all time
      const books = await Book.find()
        .sort({ sales: -1 })
         .limit(50);
            
      const topSellingBooks = await Promise.all(
         books.map(async (book) => {

           // total sales for the author
           const authorBooks = await Book.find({ 'author._id': book.author._id });
           const totalAuthorSales = authorBooks.reduce(
             (total, book) => total + book.sales,
             0
           );
            
           // if the book was the on the top 5 selling books the year of its publication.
            const publicationYear = new Date(book.publication_date).getFullYear();

            const highestSales = await Sale.find({ year: publicationYear })
              .sort({ sales: -1 })
               .limit(5);
            
            const top5BookIds = highestSales.map((sale) =>
              sale.book._id.toString()
            );
            const isTop5 = top5BookIds.includes(book._id.toString())
              
           return {
             bookName: book.name,
             totalSales: book.sales, 
             totalAuthorSales: totalAuthorSales,
             isTop5Year: isTop5,
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
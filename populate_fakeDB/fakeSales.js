const mongoose = require("mongoose");
const casual = require("casual");
const Sale = require("../server/models/Sale");
const Book = require("../server/models/Book");

require("dotenv").config();

const numberOfYears = 5; 

function generateSales(bookId, bookName) {
  const salesData = [];
  const currentYear = new Date().getFullYear();

   for (let year = currentYear - numberOfYears + 1; year <= currentYear; year++)
   {
      const sale = {
        book: {
          _id: bookId,
          name: bookName,
        },
        year: year,
        sales: casual.integer(1, 100),
      };
      salesData.push(sale);
  }

  return salesData;
}

async function seedData() {
  try {
    console.log("\x1b[32mSeeding Sales...\x1b[0m");
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Sale.deleteMany({});

    const books = await Book.find({});
    const salesData = books.reduce((sales, book) => {
      const bookSales = generateSales(book._id, book.name);

      const bookSalesCount = bookSales.reduce(
        (total, sale) => total + sale.sales,
        0
      );
      book.sales += bookSalesCount;
      book.save();

      return sales.concat(bookSales);
    }, []);

    await Sale.insertMany(salesData);

    console.log(`${salesData.length} sales have been added to the database.`);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
}

seedData();
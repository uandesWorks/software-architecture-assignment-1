const mongoose = require("mongoose");
const casual = require("casual");
const Book = require("../server/models/Book");
const Author = require("../server/models/Author");

require("dotenv").config();

const numberOfBooks = 300; 

async function seedData() {
   try {
     console.log("Seeding Books...");

    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Book.deleteMany({});

    const authors = await Author.find({});

    const books = Array.from({ length: numberOfBooks }, () => {
      const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
      return {
        name: casual.title,
        summary: casual.sentences(3),
        publication_date: casual.date("YYYY-MM-DD"),
        sales: casual.integer(1000, 100000),
        author_id: randomAuthor._id, // Assign a random author's _id to the book
      };
    });

    await Book.insertMany(books);

    console.log(`${numberOfBooks} books have been added to the database.`);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
}

seedData();

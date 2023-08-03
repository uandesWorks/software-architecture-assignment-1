const mongoose = require("mongoose");
const casual = require("casual");
const Author = require("../server/models/Author");

require("dotenv").config();

const numberOfAuthors = 50; 

function generateAuthor() {
  return {
    name: casual.full_name,
    birth: casual.date("YYYY-MM-DD"),
    country: casual.country,
    description: casual.sentences((n = 3)),
  };
}

async function seedData() {
  try {
    console.log("Seeding Authors...");
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Author.deleteMany({});

    const authors = Array.from({ length: numberOfAuthors }, generateAuthor);
    await Author.insertMany(authors);

    console.log(`${numberOfAuthors} authors have been added to the database.`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
}

seedData();

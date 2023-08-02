require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts')
const bodyParser = require("body-parser");
const connectDB = require('./server/config/db')

const app = express();
const PORT = 8000 || process.env.PORT;

// Connect to DB
connectDB()

// Templating Engine
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

// Routes
app.use(bodyParser.json());
app.use("/", require('./server/routes/main'))
app.use("/books", require('./server/routes/bookRoutes'))


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
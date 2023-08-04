require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts')
const bodyParser = require('body-parser');
const connectDB = require('./server/config/db')

const app = express();
const PORT = 8000 || process.env.PORT;

app.use(express.static('public'))
// Connect to DB
connectDB()

//JSON Middleware
app.use(express.json()); 

// Templating Engine
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

// Routes
app.use(bodyParser.json());
app.use("/", require('./server/routes/main'))
app.use('/authors', require('./server/routes/authorRoutes'));
app.use("/books", require('./server/routes/bookRoutes'))
app.use("/reviews", require('./server/routes/reviewRoutes'));
app.use("/sales", require('./server/routes/saleRoutes'));
app.use("/information", require('./server/routes/informationRoutes'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
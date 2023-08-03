const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  sales: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Sales', SalesSchema);
const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
  book: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  sales: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('Sales', SalesSchema);
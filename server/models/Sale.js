const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
  book: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
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
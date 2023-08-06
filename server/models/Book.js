const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  publication_date: {
    type: Date,
    required: true,
  },
  sales: {
    type: Number,
    required: true,
  },
  author: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
  },
});

module.exports = mongoose.model('Book', BookSchema);
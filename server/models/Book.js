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
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author", 
    required: true,
  },
});

module.exports = mongoose.model('Book', BookSchema);
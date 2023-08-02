const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  book: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  up_votes: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('Review', ReviewSchema);
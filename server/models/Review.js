const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  book: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
  },
  review: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  up_votes: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Review', ReviewSchema);
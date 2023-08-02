const express = require("express");
const reviewController = require("../controllers/ReviewController");

const router = express.Router();

// Create a new review
router.post("/", reviewController.createReview);

// Get all reviews
router.get("/", reviewController.getAllReviews);

// Get a specific review by ID
router.get("/:id", reviewController.getReviewById);

// Update a review by ID
router.put("/:id", reviewController.updateReview);

// Delete a review by ID
router.delete("/:id", reviewController.deleteReview);

module.exports = router;

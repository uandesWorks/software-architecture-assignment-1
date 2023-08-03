const express = require("express");
const saleController = require("../controllers/SaleController");

const router = express.Router();

// Create a new book
router.post("/", saleController.createSale);

// Get all books
router.get("/", saleController.getAllSales);

// Get a specific book by ID
router.get("/:id", saleController.getSaleById);

// Update a book by ID
router.put("/:id", saleController.updateSale);

// Delete a book by ID
router.delete("/:id", saleController.deleteSale);

module.exports = router;

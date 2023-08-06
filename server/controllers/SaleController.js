const Sale = require("../models/Sale");
const Book = require("../models/Book");

// Create a new sale
exports.createSale = async (req, res) => {
  try {
    const sale = new Sale(req.body);
    const bookName = await Book.findById(sale.book._id, 'name');
      if (!bookName) {
        return res.status(404).json({ error: "Book not found" });
      }
      sale.book.name = bookName.name;
    await sale.save();

    await Book.findByIdAndUpdate(sale.book_id, {
      $inc: { sales: sale.sales },
    });
    
    res.status(201).json(sale);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all sales
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('book', '_id name');;
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific sale by ID
exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.json(sale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a sale by ID
exports.updateSale = async (req, res) => {
  try {
    const { book, year, sales: newSales } = req.body;

    const updateObj = {book, year, sales: newSales };

    const previousSale = await Sale.findById(req.params.id);
    if (!previousSale) {
      return res.status(404).json({ error: "Sale not found" });
    }


    const newBook = await Book.findById(book._id);
    if (!newBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    updateObj.book._id = newBook._id;
    updateObj.book.name = newBook.name;

    const differenceInSales = newSales - previousSale.sales;

    const updatedSale = await Sale.findByIdAndUpdate(
      req.params.id,
      updateObj,
      { new: true }
    );

    await Book.findByIdAndUpdate(newBook._id, {
      $inc: { sales: differenceInSales },
    });

    res.json(updatedSale);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a sale by ID
exports.deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    const book = await Book.findById(sale.book_id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    await Book.findByIdAndUpdate(sale.book_id, {
      $inc: { sales: -sale.sales },
    });
    res.json({ message: "Sale deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const Author = require("../models/Author"); // Adjust the path as needed

// Create a new author
exports.createAuthor = async (req, res) => {
    try {
        console.log(req.body)
        const newAuthor = await Author.create(req.body);
        res.status(201).json(newAuthor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all authors
exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific author by ID
exports.getAuthorById = getAuthor, (req, res) => {
    res.json(res.author);
};

// Update an author by ID
exports.updatedAuthor = getAuthor, async (req, res) => {
    try {
        if (req.body.name != null) {
            res.author.name = req.body.name;
        }
        if (req.body.birth != null) {
            res.author.birth = req.body.birth;
        }
        if (req.body.country != null) {
            res.author.country = req.body.country;
        }
        if (req.body.description != null) {
            res.author.description = req.body.description;
        }
        const updatedAuthor = await res.author.save();
        res.json(updatedAuthor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an author by ID
exports.deleteAuthor = getAuthor, async (req, res) => {
    try {
        await Author.findByIdAndRemove(req.params.id);
        res.json({ message: 'Author deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Middleware to get author by ID
async function getAuthor(req, res, next) {
    try {
        const author = await Author.findById(req.params.id);
        if (author == null) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.author = author;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

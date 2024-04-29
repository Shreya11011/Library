import express from "express"
import Book from "../models/Book.js"
import BookCategory from "../models/BookCategory.js"
import mongoose from "mongoose";


const router = express.Router()


//console.log("Book model methods:", Object.keys(Book.prototype));

/* Get all books in the db */
router.get("/allbooks", async (req, res) => {
    try {
        const books = await Book.find({}).populate("transactions").sort({ _id: -1 })
        res.status(200).json(books)
    }
    catch (err) {
        return res.status(504).json(err);
    }
})

/* Get Book by book Id */
router.get("/getbook/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("transactions")
        res.status(200).json(book)
    }
    catch {
        return res.status(500).json(err)
    }
})

/* Get books by category name*/
router.get("/", async (req, res) => {
    const category = req.query.category
    try {
        const books = await BookCategory.findOne({ categoryName: category }).populate("books")
        res.status(200).json(books)
    }
    catch (err) {
        return res.status(504).json(err)
    }
})

/* Adding book */
router.post("/addbook", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            const newbook = await new Book({
                bookName: req.body.bookName,
                alternateTitle: req.body.alternateTitle,
                author: req.body.author,
                bookCountAvailable: req.body.bookCountAvailable,
                language: req.body.language,
                publisher: req.body.publisher,
                bookStatus: req.body.bookSatus,
                categories: req.body.categories
            })
            const book = await newbook.save()
            await BookCategory.updateMany({ '_id': book.categories }, { $push: { books: book._id } });
            res.status(200).json(book)
        }
        catch (err) {
            res.status(504).json(err)
        }
    }
    else {
        return res.status(403).json("You dont have permission to delete a book!");
    }
})

/* Updating book */
router.put("/updatebook/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json("Book not found.");
        }
        // Update book details only if the user is an admin
        if (req.body.isAdmin) {
            await Book.findByIdAndUpdate(req.params.id, {
                $set: {
                    bookStatus: req.body.bookStatus,
                    bookCountAvailable: req.body.bookCountAvailable,
                    language: req.body.language,
                    author: req.body.author
                },
            });
            return res.status(200).json("Book details updated successfully");
        } else {
            return res.status(403).json("You don't have permission to update book details.");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal server error");
    }
});


//Remove book
router.delete("/removebook/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Find the book by ID and store its information
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json("Book not found");
        }

        // Remove the book
        const result = await Book.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).json("Book not found");
        }

        // Update associated categories
        await BookCategory.updateMany(
            { _id: { $in: book.categories } }, // Find categories by their IDs
            { $pull: { books: id } } // Remove the book's ID from the books array
        );

        res.status(200).json("Book has been deleted");
    } catch (err) {
        console.error(err);
        res.status(500).json("Failed to delete book");
    }
});




/* Get Book by name, ID, or author */
router.get("/getbook", async (req, res) => {
    const searchQuery = req.query.name; // Extract the search query from the request

    try {
        let books;

        if (!searchQuery) {
            return res.status(400).json("Please provide a search query.");
        }

        // Perform the search in multiple fields using logical OR conditions
        books = await Book.find({
            $or: [
                { bookName: { $regex: searchQuery, $options: 'i' } },
                { author: { $regex: searchQuery, $options: 'i' } }
            ]
        }).populate("transactions");

        // Filter out duplicate books (if any)
        books = books.filter((book, index, self) =>
            index === self.findIndex((b) => (
                b._id.toString() === book._id.toString()
            ))
        );

        if (!books || books.length === 0) {
            return res.status(404).json("No books found.");
        }

        res.status(200).json(books);
    } catch (err) {
        return res.status(500).json(err);
    }
});










export default router
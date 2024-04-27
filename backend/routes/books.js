import express from "express"
import Book from "../models/Book.js"
import BookCategory from "../models/BookCategory.js"

const router = express.Router()

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


/* Remove book  */
router.delete("/removebook/:id", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            const _id = req.params.id
            const book = await Book.findOne({ _id })
            await book.remove()
            await BookCategory.updateMany({ '_id': book.categories }, { $pull: { books: book._id } });
            res.status(200).json("Book has been deleted");
        } catch (err) {
            return res.status(504).json(err);
        }
    } else {
        return res.status(403).json("You dont have permission to delete a book!");
    }
})

/* Get Book by name, ID, or author */
router.get("/getbook", async (req, res) => {
    const { name, id, author } = req.query;
    try {
        let books;
        if (id) {
            books = await Book.find({ _id: id }).populate("transactions");
        } else if (name) {
            // Case-insensitive search for substring within the name
            books = await Book.find({ bookName: { $regex: name, $options: 'i' } }).populate("transactions");
        } else if (author) {
            // Case-insensitive search for substring within the author
            books = await Book.find({ author: { $regex: author, $options: 'i' } }).populate("transactions");
        } else {
            return res.status(400).json("Please provide either name, ID, or author to search for a book.");
        }

        if (!books || books.length === 0) {
            return res.status(404).json("No books found.");
        }

        res.status(200).json(books);
    } catch (err) {
        return res.status(500).json(err);
    }
})




export default router
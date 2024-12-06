const express = require('express');
const router = express.Router();

// import Book model
const Book = require('../../models/book');

const pageSize = 8; // pagination specification for filtering

// GET all the books
router.get('/', async (req, res, next) => {
    let books = await Book.find();
    res.status(200).json(books);
});

// GET 
// gets only the specified books (or all of them if no filters were given)
router.get('/search', async (req, res, next) => {
    let query = {};

    // filters GET response if user specifies title
    if (req.query.title) {
        query.title = req.query.title;
    }

    // filters GET response if user specifies book author
    if (req.query.author) {
        query.author = req.query.author;
    }

    // filters GET response if user specifies book genre
    if (req.query.genre) {
        query.genre = req.query.genre;
    }

    // filters GET response if user specifies book rating
    if (req.query.rating) {
        query.rating = req.query.rating;
    }

    // pagination in case of large return results
    let page = req.query.page || 1;
    let skipSize = pageSize * (page - 1);

    let books = await Book.find(query)
        .limit(pageSize)
        .skip(skipSize);
    res.status(200).json(books); 
});

// POST /books
// adds new book to the list
router.post('/', async (req, res, next) => {
    // validate required field
    if (!req.body.title) {
        res.json({ ValidationError: 't is a mandatory field' });
    }
    else if (!req.body.rating || req.body.rating < 1 || req.body.rating > 10) {
        res.json({ ValidationError: 'rating is a mandatory field that should be more than or equal to 1 and less than or equal to 10' });
    }
    else {
        // create an object based on the received user input
        let newBook = new Book ({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            startDate: req.body.startDate,
            completionDate: req.body.completionDate,
            rating: req.body.rating,
            review: req.body.review,
        });
        // save new book to the DB
        await newBook.save();
        res.status(200).json(newBook);
    }
});

// PUT /books/:_id
// updates the existing book in the list
router.put('/:_id', async (req, res, next) => {
    // validate required fields
    if (!req.body.title) {
        res.json({ ValidationError: 'title is a mandatory field' });
    }
    else if (!req.body.rating || req.body.rating < 1 || req.body.rating > 10) {
        res.json({ ValidationError: 'rating is a mandatory field that should be more than or equal to 1 and less than or equal to 10' });
    }
    else {
        await Book.findOneAndUpdate(
            { _id: req.params._id }, // filter to return data entry that we need based on id
            {
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                startDate: req.body.startDate,
                completionDate: req.body.completionDate,
                rating: req.body.rating,
                review: req.body.review,
            }
        );  
        res.status(200).json({ success: 'true - update' });
    }
});

// DELETE /books/:_id
// deletes one book based on id sent as part of a URL
router.delete('/:_id', async (req, res, next) => {
    await Book.findByIdAndDelete(req.params._id);
    res.status(200).json({ success: 'true - delete' });
});

module.exports = router;
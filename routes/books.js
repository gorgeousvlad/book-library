const express = require('express');
const router = express.Router();

const {Book, filterReqFields} = require('../models/Book');

const store = {
    books: [],
};

[1, 2, 3].map(el => {
    store.books.push(new Book({title: `book ${el}`, description: `book ${el} description`}))
});

router.get('/', (req, res) => {
    const {books} = store;

    res.render("book/index", {
        title: "Library",
        books: books,
    });
});

router.get('/create', (req, res) => {
    res.render("book/create", {
        title: "Create book",
        book: {},
    });
});

router.post('/create', (req, res) => {
    const {books} = store;
    const book = new Book(filterReqFields(req.body));
    books.push(book);

    res.redirect('/books')
});

router.get('/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("book/view", {
            title: `Book`,
            book: books[idx]
        });
    } else {
        res.redirect('/books');
    }
});

router.get('/update/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("book/update", {
            title: "Book | view",
            book: books[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/update/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            ...filterReqFields(req.body || {})
        };

        res.redirect(`/books/${id}`);
    } else {
        res.status(404).redirect(404);
    }
});

router.post('/delete/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.redirect(`/books`);
    } else {
        res.status(404).redirect('/404');
    }
});

module.exports = router;

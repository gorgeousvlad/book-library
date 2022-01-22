const express = require('express');
const router = express.Router();
const fileMiddleware = require('../../middleware/file');

const {Book, filterReqFields} = require('../../models/Book');
const store = {
    books: [],
};

[1, 2, 3].map(el => {
    store.books.push(new Book({title: `book ${el}`, description: `book ${el} description`}))
});

router.get('/', (req, res) => {
    const {books} = store;
    res.json(books);
});

router.get('/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json(`book ${id} | not found`);
    }
});

router.post('/', (req, res) => {
    const {books} = store;
    const book = new Book(filterReqFields(req.body));
    books.push(book);

    res.status(201);
    res.json(book);
});

router.put('/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            ...filterReqFields(req.body || {})
        };

        res.json(books[idx]);
    } else {
        res.status(404);
        res.json(`books ${id}| not found`);
    }
});

router.delete('/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.json(true);
    }  else {
        res.status(404);
        res.json(`book ${id}| not found`);
    }
});

router.post('/:id/upload', fileMiddleware.single('fileBook'), (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (req.file && idx !== -1) {
        const {path} = req.file;

        books[idx] = {
            ...books[idx],
            fileBook: path,
        };

        res.json(path);
    } else {
        res.json(null);
    }
});

router.get('/:id/download', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1 &&  books[idx].fileBook) {
        res.download(books[idx].fileBook, `${id}.png`, err=>{
            if (err){
                res.status(404).json();
            }
        });
    } else {
        res.json(`book ${id} file not found | not found`);;
    }
});

module.exports = router;

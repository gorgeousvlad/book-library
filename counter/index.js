const expess = require('express');
const fsPromises = require('fs').promises;

const app = expess();

const DB = './db/counter.json';
const COUNTER_PORT = process.env.COUNTER_PORT || 3000;

app.get('/counter/:bookId', async (req, res) => {
    const {bookId} = req.params;

    try {
        const file = JSON.parse(await fsPromises.readFile(DB,'utf-8'));

        if (file && typeof file[bookId] !== "undefined") {
            return res.json({count: file[bookId]})
        } else {
            return res.status(404).json({'not-found': true});
        }
    } catch(err) {
        return res.status(500).json({error: err.message})
    }
  });

app.post('/counter/:bookId/incr', async (req, res) => {
    const {bookId} = req.params;

    try {        
        const file = JSON.parse(await fsPromises.readFile(DB,'utf-8'));

        if (file) {
            const curCount = file[bookId];
            file[bookId] = curCount ? curCount + 1 : 1;
            console.log('FILE', file)
            await fsPromises.writeFile(DB, JSON.stringify(file));

            return res.json({count: file[bookId]})
        } else {
            return res.status(404).json({'not-found': true});
        }
    } catch(err) {
        return res.status(500).json({error: err.message})
    }
});

app.listen(COUNTER_PORT,() => {
    console.log(`Counter listening on port ${COUNTER_PORT}`)
});
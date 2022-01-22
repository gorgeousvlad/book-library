const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

const indexRouter = require('./routes/index');
const booksApiRouter = require('./routes/api/books');
const booksRouter = require('./routes/books');
const userRouter = require('./routes/user');

const app = express();

app.use(cors());
app.use(loggerMiddleware);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");

app.use('/public', express.static(__dirname + "/public"));

app.use('/', indexRouter);
app.use('/api/books', booksApiRouter);
app.use('/api/user', userRouter);
app.use('/books', booksRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const path = require('path');
const multer = require('multer');

const PUBLIC_PATH =  '/../public/books';
const ALLOWED_EXTENDSIONS = ['.png','.jpg','.jpeg', '.txt', '.rtf','.fb2'];

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + PUBLIC_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
  }
})

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
      var ext = path.extname(file.originalname);

      if(!ALLOWED_EXTENDSIONS.includes(ext)) {
          return callback(new Error('Only images are allowed'))
      }
      callback(null, true)
  },
    onFileUploadStart: function (file) {
      console.log(file.originalname + ' is starting ...')
    },
});

module.exports = upload;
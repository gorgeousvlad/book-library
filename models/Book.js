const uidGenerator = require('node-unique-id-generator');

const bookFields = [
  'id',
  'title',
  'description',
  'authors',
  'favorite',
  'fileCover',
  'fileName',
  'fileBook'
];

function validateFieldName(name) {
  return bookFields.includes(name)
}

function filterReqFields(data={}) {
  return Object.entries(data).reduce((result, [key, value])=> {
    if(validateFieldName(key)) {
      result[key] = value;
    }
  
    return result;
  },{})
}

class Book {
    constructor(data) {
        this.id = uidGenerator.generateUniqueId();

        Object.entries(data).forEach(([key,val]) => {
          if(validateFieldName(key)) {
            this[key] = val || '';
          }
        })
    }
}

module.exports = {
  Book,
  filterReqFields,
};

const mongoose = require('mongoose');
const validator = require('validator');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  author: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('book', bookSchema);

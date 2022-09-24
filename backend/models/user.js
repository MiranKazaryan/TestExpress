const mongoose = require("mongoose");
const validator = require("validator");
const Book = require('./book')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  age: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 30,
  },
  isFree: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  books: [
    {
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
        type: Date,/*YYYY-MM-DD*/
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("user", userSchema);

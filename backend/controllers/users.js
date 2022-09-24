const User = require("../models/user");
const BAD_REQUEST = require("../errors/BadRequesError");
const NOT_FOUND = require("../errors/NotFoundError");
const CONFLICT_ERROR = require("../errors/ConflictError");

// получение данных о пользователях
const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch(next);
};
//получение данных о пользователе
const getUserInfo = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NOT_FOUND("User is not found");
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};
//создание пользователя
const createUser = (req, res, next) => {
  const { firstName, lastName, age, isFree } = req.body;
  console.log(req.body);
  User.create({
    firstName,
    lastName,
    age,
    isFree,
  })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        console.log(e);
        next(new BAD_REQUEST("Error validating user"));
      } else {
        next(e);
      }
    });
};
// обновление данных пользователя
const updateUser = (req, res, next) => {
  const { firstName, lastName, age, isFree } = req.body;
  User.findByIdAndUpdate(
    req.params.userId,
    { firstName, lastName, age, isFree, updatedAt: Date.now() },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NOT_FOUND("User is not found");
      } else {
        res.status(200).send(user);
      }
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        next(new BAD_REQUEST("Error validating profile data"));
      } else {
        next(e);
      }
    });
};
// добавление книги
const addBook = (req, res, next) => {
  const { title, author, createdAt } = req.body;
  User.findByIdAndUpdate(
    req.params.userId,
    { updatedAt: Date.now(), $addToSet: { books: req.body } },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NOT_FOUND("User is not found");
      } else {
        res.status(200).send(user);
      }
    })
    .catch((e) => {
      console.log(e);
      if (e.name === "ValidationError") {
        next(new BAD_REQUEST("Error validating avatar data"));
      } else {
        next(e);
      }
    });
};
//получение всех книг
const getBooks = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NOT_FOUND("User is not found");
    })
    .then((user) => {
      console.log(user.books);
      res.status(200).send(user.books);
    })
    .catch(next);
};
//удаление книги
const deleteBook = (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.userId,
    { updatedAt: Date.now(), $pull: { books: {_id:req.params.bookId}} }, // убрать _id из массива
    { new: true }
  )
    .orFail(() => {
      throw new NOT_FOUND("User is not found");
    })
    .then((user) => {
      console.log(user.books);
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserInfo,
  createUser,
  updateUser,
  addBook,
  getBooks,
  deleteBook,
};

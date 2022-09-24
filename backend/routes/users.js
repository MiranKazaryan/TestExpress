const router = require('express').Router();

const {
  getUsers,
  getUserInfo,
  createUser,
  updateUser,
  addBook,
  getBooks,
  deleteBook
} = require('../controllers/users');

router.get('/users', getUsers);//получение информации о пользователях
router.get('/users/:userId',getUserInfo);//получение информации о пользователе
router.post('/users/:userId', updateUser);//обновление пользователя
router.post('/users',createUser);//создание пользователя
router.put('/users/:userId/book', addBook); //добавление книги формат датыYYYY-MM-DD
router.get('/users/:userId/books', getBooks);//все книги пользователя
router.delete('/users/:userId/book/:bookId',deleteBook)//удаление книги


module.exports = router;

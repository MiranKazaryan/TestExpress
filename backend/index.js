const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/users');
const cors = require('cors');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/bookdb');
app.use(express.json());

app.use(router);


app.listen(PORT);


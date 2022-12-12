const express = require('express');
const mongoose = require('mongoose');
const { celebrate, errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
// const { DB_LINK } = require('dotenv').config();

const NotFoundError = require('./errors/not_found_error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./limiter');
const auth = require('./middlewares/auth');
const {
  login,
  createUser,
} = require('./controllers/users');
const { centralErrorHandling } = require('./central_error_handling');
const { signIn, signUp } = require('./validation-Joi');

const { PORT = 3001 } = process.env;
const app = express();

const options = {
  origin: [
    'http://localhost:3000',
    'https://vladickpetrov.nomoredomains.club',
    'http://vladickpetrov.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
};

app.use('*', cors(options));

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});
mongoose.set('strictQuery', false);

app.use(helmet());
app.use(requestLogger);
app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate(signIn), login);
app.post('/signup', celebrate(signUp), createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/*', (req, res, next) => {
  const err = new NotFoundError('Страница не найдена');
  next(err);
});

app.use(errorLogger);

app.use(errors());

app.use(centralErrorHandling);

app.listen(PORT);

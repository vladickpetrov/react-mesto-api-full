const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

const NotFoundError = require('./errors/not_found_error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const {
  login,
  createUser,
} = require('./controllers/users');
const { centralErrorHandling } = require('./central_error_handling');

const { PORT = 3000 } = process.env;
const app = express();

const options = {
  origin: [
    'http://localhost:3000',
    'https://ВАШ ДОМЕЙН С ДОКУМЕНТА',
    'https://YOUR.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('*', cors(options));

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(limiter);
app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,}\.[a-zA-Z0-9()]{1,}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

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

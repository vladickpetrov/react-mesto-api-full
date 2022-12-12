const { Joi } = require('celebrate');

module.exports.cardsParams = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
};

module.exports.cardsPost = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,}\.[a-zA-Z0-9()]{1,}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/),
  }),
};

module.exports.signIn = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

module.exports.signUp = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,}\.[a-zA-Z0-9()]{1,}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

module.exports.userParams = {
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
};

module.exports.userInfo = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
};

module.exports.userAvatar = {
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,}\.[a-zA-Z0-9()]{1,}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/),
  }),
};

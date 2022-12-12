const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { cardsPost, cardsParams } = require('../validation-Joi');

router.get('/', getCards);
router.post('/', celebrate(cardsPost), createCard);
router.delete('/:cardId', celebrate(cardsParams), deleteCard);
router.put('/:cardId/likes', celebrate(cardsParams), likeCard);
router.delete('/:cardId/likes', celebrate(cardsParams), dislikeCard);

module.exports = router;

const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  getUserbyId,
} = require('../controllers/users');
const { userParams, userInfo, userAvatar } = require('../validation-Joi');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:userId', celebrate(userParams), getUserbyId);
router.patch('/me', celebrate(userInfo), updateUser);
router.patch('/me/avatar', celebrate(userAvatar), updateUserAvatar);

module.exports = router;

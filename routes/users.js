const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsersMe, editUserInfo,
} = require('../controllers/users');

const emailRegex = /^\S+@\S+\.\S+$/;

// возвращает информацию о пользователе (email и имя)
router.get('/me', getUsersMe);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi
      .string()
      .pattern(emailRegex),
  }),
}), editUserInfo);

module.exports = router;

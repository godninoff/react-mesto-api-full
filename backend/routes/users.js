const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getUsers,
  getUserId,
  createUser,
  profileUpdate,
  avatarUpdate,
  getCurrentUser,
} = require('../controllers/users');

const isURL = (v) => {
  const result = validator.isURL(v, { require_protocol: true });
  if (result) {
    return v;
  }
  throw new Error('Некорректный URL-адрес');
};

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUserId);

router.post('/users', createUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), profileUpdate);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(isURL),
  }),
}), avatarUpdate);

module.exports = router;

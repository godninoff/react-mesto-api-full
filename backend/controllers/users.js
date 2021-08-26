const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const NotFound = require('../errors/NotFound');
const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  User.findOne({ email })
    .then((data) => {
      if (data) {
        throw new Conflict('Указаный Вами email используется другим пользователем');
      }
      return bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({
            name,
            about,
            avatar,
            email,
            password: hash,
          })
            .then((user) => res.status(200).send({ data: user }))
            .catch((err) => {
              if (err.name === 'ValidationError') {
                next(new BadRequest('Переданы некорректные данные'));
              } else {
                next(err);
              }
            });
        });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Пользователь не найден'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          httpOnly: true,
          sameSite: true,
        })
        .send({ token });
    })
    .catch(() => {
      throw new Unauthorized('Неверный логин или пароль');
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else if (err.message === 'NotValidId') {
        next(new NotFound('Пользователь не найден'));
      } else {
        next(err);
      }
    });
};

module.exports.avatarUpdate = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('Пользователь не найден');
      } else if (err.name === 'ValidationError') {
        throw new BadRequest('Переданы некорректные данные');
      } else {
        next(err);
      }
    });
};

module.exports.profileUpdate = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('Пользователь не найден');
      } else if (err.name === 'ValidationError') {
        throw new BadRequest('Переданы некорректные данные');
      } else {
        next(err);
      }
    });
};

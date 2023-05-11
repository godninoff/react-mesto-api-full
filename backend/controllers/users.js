import _hash from "bcryptjs";
import sign from "jsonwebtoken";
import BadRequest from "../errors/BadRequest.js";
import Conflict from "../errors/Conflict.js";
import NotFound from "../errors/NotFound.js";
import Unauthorized from "../errors/Unauthorized.js";

const { NODE_ENV, JWT_SECRET } = process.env;

export function createUser(req, res, next) {
  const { name, about, avatar, email, password } = req.body;

  findOne({ email })
    .then(async (data) => {
      if (data) {
        throw new Conflict(
          "Указаный Вами email используется другим пользователем"
        );
      }
      const hash = await _hash(password, 10);
      create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => res.status(200).send({ data: user }))
        .catch((err) => {
          if (err.name === "ValidationError") {
            next(new BadRequest("Переданы некорректные данные"));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
}

export function getCurrentUser(req, res, next) {
  const userId = req.user._id;

  findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFound("Пользователь не найден");
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequest("Пользователь не найден"));
      } else {
        next(err);
      }
    });
}

export function login(req, res, next) {
  const { email, password } = req.body;

  return findUserByCredentials(email, password)
    .then((user) => {
      const token = sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        { expiresIn: "7d" }
      );
      res
        .cookie("jwt", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .send({ token });
    })
    .catch(() => {
      throw new Unauthorized("Неверный логин или пароль");
    })
    .catch(next);
}

export function getUsers(req, res, next) {
  find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
}

export function getUserId(req, res, next) {
  findById(req.params.userId)
    .orFail(new Error("NotValidId"))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequest("Переданы некорректные данные"));
      } else if (err.message === "NotValidId") {
        next(new NotFound("Пользователь не найден"));
      } else {
        next(err);
      }
    });
}

export function avatarUpdate(req, res, next) {
  const { avatar } = req.body;
  findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      if (!user) {
        throw new NotFound("Пользователь не найден");
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequest("Пользователь не найден");
      } else if (err.name === "ValidationError") {
        throw new BadRequest("Переданы некорректные данные");
      } else {
        next(err);
      }
    });
}

export function profileUpdate(req, res, next) {
  const { name, about } = req.body;
  findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      if (!user) {
        throw new NotFound("Пользователь не найден");
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequest("Пользователь не найден");
      } else if (err.name === "ValidationError") {
        throw new BadRequest("Переданы некорректные данные");
      } else {
        next(err);
      }
    });
}

export function signOut(req, res) {
  res
    .clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send({ message: "Cookie удалены" });
}

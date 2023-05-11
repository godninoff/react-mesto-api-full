import express from "express";
const router = express.Router();
import { celebrate, Joi } from "celebrate";
import _isURL from "validator";
import {
  getCards,
  createCard,
  deleteIdCard,
  likeCard,
  dislikeCard,
} from "../controllers/cards.js";

const isURL = (v) => {
  const result = _isURL(v, { require_protocol: true });
  if (result) {
    return v;
  }
  throw new Error("Некорректный URL-адрес");
};

router.get("/cards", getCards);

router.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(isURL),
    }),
  }),
  createCard
);

router.delete(
  "/cards/:cardId",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  deleteIdCard
);

router.put(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  likeCard
);

router.delete(
  "/cards/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  dislikeCard
);

export default router;

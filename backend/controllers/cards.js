import BadRequest from "../errors/BadRequest.js";
import Forbidden from "../errors/Forbidden.js";
import NotFound from "../errors/NotFound.js";

export function getCards(req, res, next) {
  find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
}

export function createCard(req, res, next) {
  const { name, link } = req.body;
  const owner = req.user._id;

  create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequest("Некорректные данные при создании карточки."));
      } else {
        next(err);
      }
    });
}

export function deleteIdCard(req, res, next) {
  findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound("Не найдена карточка с указанным ID");
      }
      if (card.owner.toString() !== req.user._id) {
        next(new Forbidden("Нельзя удалять карточки других пользователей"));
        return;
      }
      card
        .deleteOne()
        .then((deletedCard) => res.send(deletedCard))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequest("Не найдена карточка с указанным ID"));
      } else {
        next(err);
      }
    });
}

export function likeCard(req, res, next) {
  findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .populate("likes")
    .populate("owner")
    .orFail(new Error("NotValidId"))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequest("Не найдена карточка с указанным ID"));
      } else if (err.message === "NotValidId") {
        next(new NotFound("Не найдена карточка с указанным ID"));
      } else {
        next(err);
      }
    });
}

export function dislikeCard(req, res, next) {
  findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new Error("NotValidId"))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequest("Не найдена карточка с указанным ID"));
      } else if (err.message === "NotValidId") {
        next(new NotFound("Не найдена карточка с указанным ID"));
      } else {
        next(err);
      }
    });
}

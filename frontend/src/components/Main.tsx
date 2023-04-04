import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useGetUserQuery } from "../store/api/authApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { changePopupState } from "../store/popupReducer";
import { getUserData } from "../store/authSlice";

const Main = () => {
  const currentUser = React.useContext(CurrentUserContext);
  const id = useAppSelector((state) => state.auth.id);
  const popup = useAppSelector((state) => state.popup.popupIsOpen);
  const dispatch = useAppDispatch();

  const { data, isSuccess } = useGetUserQuery(id);

  console.log(popup);

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar-button"
          onClick={() => dispatch(changePopupState())}
        >
          <img
            className="profile__avatar"
            src={data?.avatar}
            alt="Аватар пользователя"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{data?.name}</h1>
          <button
            type="button"
            className="profile__button-edit"
            onClick={() => dispatch(changePopupState())}
          ></button>
          <p className="profile__subtitle">{data?.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={() => dispatch(changePopupState())}
        ></button>
      </section>

      {/* <section className="elements">
        {props.cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardDelete={props.onCardDelete}
            onCardLike={props.onCardLike}
            onCardClick={props.onCardClick}
          />
        ))}
      </section> */}
    </main>
  );
};

export default Main;

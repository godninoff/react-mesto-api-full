import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useGetUserQuery } from "../store/api/authApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  closeAllPopups,
  isAddPlacePopupOpen,
  isEditAvatarPopupOpen,
  isEditProfilePopupOpen,
  setPopupType,
} from "../store/popupReducer";
import { getUserData } from "../store/authSlice";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import { useGetUserInfoQuery } from "../store/api/actionsApi";
import { getUserInfo } from "../store/userInfoSlice";
import EditAvatarPopup from "./EditAvatarPopup";

const Main = () => {
  const dispatch = useAppDispatch();
  const id = useAppSelector((state) => state.auth.id);
  const { data, isSuccess } = useGetUserInfoQuery(id);

  console.log(data);

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar-button"
          onClick={() => dispatch(setPopupType("avatar"))}
        >
          <img
            className="profile__avatar"
            src={data?.avatar}
            alt="Аватар пользователя"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="profile__info">
            <h1 className="profile__title">{data?.name}</h1>
            <button
              type="button"
              className="profile__button-edit"
              onClick={() => dispatch(setPopupType("edit"))}
            />
          </div>
          <p className="profile__subtitle">{data?.about}</p>
        </div>

        <button
          type="button"
          className="profile__add-button"
          onClick={() => dispatch(setPopupType("add"))}
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
      <EditProfilePopup />
      <EditAvatarPopup />
    </main>
  );
};

export default Main;

import React from "react";
import errorIcon from "../images/error-icon.svg";
import successIcon from "../images/succes-icon.svg";

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_visible" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        >
          &times;
        </button>

        <div className="popup__authorization">
          <img
            className="popup__authorization-icon"
            src={props.success ? successIcon : errorIcon}
            alt="Значек авторизации"
          />
          <p className="popup__authorization-text">
            {props.success
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;

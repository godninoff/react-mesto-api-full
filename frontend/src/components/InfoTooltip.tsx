import { useAppDispatch, useAppSelector } from "../store/hooks";
import { changePopupState } from "../store/popupReducer";
const errorIcon = require("../images/error-icon.png") as string;
const successIcon = require("../images/success-icon.png") as string;

const InfoTooltip = () => {
  const popup = useAppSelector((state) => state.popup.popupIsOpen);
  const success = useAppSelector((state) => state.popup.authSuccess);

  const dispatch = useAppDispatch();

  console.log(success, "success");
  // console.log(popup, "popup");

  return (
    <div className={`popup ${popup ? "popup_visible" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={() => dispatch(changePopupState())}
        >
          &times;
        </button>

        <div className="popup__authorization">
          <img
            className="popup__authorization-icon"
            src={success ? successIcon : errorIcon}
            alt="Значок авторизации"
          />
          <p className="popup__authorization-text">
            {success
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;

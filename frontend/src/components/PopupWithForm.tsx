import { useAppDispatch, useAppSelector } from "../store/hooks";
import { changePopupState } from "../store/popupReducer";

type IPopupWithForm = {
  name: string;
  title: string;
  buttonSaveText: string;
  children: React.ReactNode;
  onSubmit: () => void;
};

const PopupWithForm = (props: IPopupWithForm) => {
  const popup = useAppSelector((state) => state.popup.popupIsOpen);
  const dispatch = useAppDispatch();

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
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="popup__save-button" type="submit">
            {props.buttonSaveText}
          </button>
        </form>
      </div>
    </div>
  );
};
export default PopupWithForm;

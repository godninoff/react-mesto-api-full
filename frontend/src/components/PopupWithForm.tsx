import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeAllPopups, setPopupType } from "../store/popupReducer";
import { IPopupWithForm } from "../store/types";
import { Config } from "./Config";

type IPopup = {
  title: string;
  inputs: Array<{ value: string; type: string }>;
};

const PopupWithForm = (props: IPopupWithForm) => {
  // const popup = useAppSelector((state) => state.popup.closeAllPopups);
  const type = useAppSelector((state) => state.popup.type);
  const [popup, setPopup] = React.useState<IPopup | null>(null);

  React.useEffect(() => {
    const modal = Config.find((item) => item.type === type);
    setPopup(modal || null);
  }, [type]);

  const dispatch = useAppDispatch();

  if (popup) {
    console.log(type);
    return (
      <div className={"popup popup_visible"}>
        <div className="popup__container">
          <button
            className="popup__close-button"
            type="button"
            onClick={() => dispatch(setPopupType(null))}
          >
            &times;
          </button>
          <h2 className="popup__title">{popup.title}</h2>
          <form
            className="popup__form"
            name={props.name}
            onSubmit={props.onSubmit}
          >
            {popup.inputs.map((input) => {
              return (
                <>
                  <input
                    required
                    value={input.value}
                    // onChange={(e) => setName(e.target.value)}
                    className="popup__input popup__input_type_name"
                    name="name"
                    id="name-input"
                    type={input.type}
                    minLength={2}
                    maxLength={40}
                    placeholder={input.value}
                  />
                  <span className="popup__form-error name-input-error"></span>
                </>
              );
            })}
            <button className="popup__save-button" type="submit">
              Сохранить
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
export default PopupWithForm;

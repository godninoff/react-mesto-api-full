import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useEditUserMutation } from "../store/api/actionsApi";
import { useAppDispatch } from "../store/hooks";
import { changePopupState } from "../store/popupReducer";

const EditProfilePopup = () => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const dispatch = useAppDispatch();
  const [editUser] = useEditUserMutation();

  // React.useEffect(() => {
  //   setName(currentUser.name);
  //   setDescription(currentUser.about);
  // }, [currentUser, props.isOpen]);

  const handleEditUser = async () => {
    await editUser({
      name: name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="popup_edit"
      title="Редактировать профиль"
      buttonSaveText="Сохранить"
      onSubmit={handleEditUser}

      // onClose={props.onClose}
    >
      <input
        required
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
        className="popup__input popup__input_type_name"
        name="name"
        id="name-input"
        type="text"
        minLength={2}
        maxLength={40}
        placeholder="Имя"
      />
      <span className="popup__form-error name-input-error"></span>
      <input
        required
        value={description || ""}
        onChange={(e) => setDescription(e.target.value)}
        className="popup__input popup__input_type_description"
        name="about"
        id="description-input"
        type="text"
        minLength={2}
        maxLength={200}
        placeholder="Вид деятельности"
      />
      <span className="popup__form-error description-input-error"></span>
    </PopupWithForm>
  );
};
export default EditProfilePopup;

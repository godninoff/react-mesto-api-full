import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useEditUserMutation } from "../store/api/actionsApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeAllPopups } from "../store/popupReducer";

const EditProfilePopup = () => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const dispatch = useAppDispatch();
  const [editUser] = useEditUserMutation();
  const userId = useAppSelector((state) => state.auth.userId);

  // React.useEffect(() => {
  //   setName(currentUser.name);
  //   setDescription(currentUser.about);
  // }, [currentUser, props.isOpen]);

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userId)
      await editUser({
        name: name,
        about: description,
      });
    setName("");
    setDescription("");
  };

  return (
    <PopupWithForm
      name="popup_edit"
      title="Редактировать профиль"
      buttonSaveText="Сохранить"
      onSubmit={handleEditUser}
    >
      <input
        required
        value={name}
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
        value={description}
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

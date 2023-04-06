import React from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = () => {
  const avatarRef = React.useRef();

  // React.useEffect(() => {
  //   avatarRef.current.value = "";
  // }, [props.isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // props.onUpdateAvatar({
    //   avatar: avatarRef.current.value,
    // });
  };

  return (
    <PopupWithForm
      name="popup_update-avatar"
      title="Обновить аватар"
      buttonSaveText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        required
        className="popup__input popup__input_type_avatar-link"
        name="avatar"
        id="avatar-input"
        type="url"
        placeholder="Ссылка на новый аватар"
        // ref={avatarRef}
      />
      <span className="popup__form-error avatar-input-error"></span>
    </PopupWithForm>
  );
};
export default EditAvatarPopup;

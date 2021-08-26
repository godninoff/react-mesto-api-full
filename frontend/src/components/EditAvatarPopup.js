import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    React.useEffect(() => {
      (avatarRef.current.value = '')
  },[props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
      }

    return(
    <PopupWithForm 
      name="popup_update-avatar" 
      title="Обновить аватар" 
      buttonSaveText="Сохранить" 
      isOpen={props.isOpen} 
      onClose={props.onClose} 
      onSubmit={handleSubmit}
    >
      <input 
        required 
        className="popup__input popup__input_type_avatar-link" 
        name="avatar" 
        id="avatar-input" 
        type="url" 
        placeholder="Ссылка на новый аватар" 
        ref={avatarRef}
      />
        <span className="popup__form-error avatar-input-error"></span>
    </PopupWithForm> 
    )
}
export default EditAvatarPopup
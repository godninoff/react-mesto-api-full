import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleChangeUserName(e) {
        setName(e.target.value);
      }

    function handleChangeUserDescription(e) {
        setDescription(e.target.value);
      } 

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
    });
    }   

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
        }, [currentUser, props.isOpen]);  

    return(
        <PopupWithForm 
            name="popup_edit" 
            title="Редактировать профиль" 
            buttonSaveText="Сохранить" 
            onSubmit={handleSubmit} 
            isOpen={props.isOpen} 
            onClose={props.onClose}
        >
            <input 
                required 
                value={name || ''} 
                onChange={handleChangeUserName} 
                className="popup__input popup__input_type_name" 
                name="name" 
                id="name-input" 
                type="text" 
                minLength="2" 
                maxLength="40" 
                placeholder="Имя" 
            />
            <span className="popup__form-error name-input-error"></span>
            <input 
                required 
                value={description|| ''} 
                onChange={handleChangeUserDescription} 
                className="popup__input popup__input_type_description" 
                name="about" 
                id="description-input" 
                type="text" 
                minLength="2" 
                maxLength="200" 
                placeholder="Вид деятельности" 
            />
            <span className="popup__form-error description-input-error"></span>
        </PopupWithForm>
    )
}
export default EditProfilePopup
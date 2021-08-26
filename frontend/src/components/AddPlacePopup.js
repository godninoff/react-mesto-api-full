import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setName('');
        setLink('');
    },[props.isOpen]);

    function handleNewCardName(e) {
        setName(e.target.value);
    }

    function handleNewCardLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace(name, link);
    }

    return(
    <PopupWithForm 
        name="popup_add-card" 
        title="Новое место" 
        buttonSaveText="Создать" 
        isOpen={props.isOpen} 
        onClose={props.onClose} 
        onSubmit={handleSubmit} 
    >
        <input 
            required 
            className="popup__input popup__input_type_name-element" 
            name="name" 
            value={name || ''} 
            onChange={handleNewCardName} 
            id="place-input" 
            type="text" 
            minLength="2" 
            maxLength="30" 
            placeholder="Название" 
        />
        <span className="popup__form-error place-input-error"></span>
        <input 
            required 
            className="popup__input popup__input_type_link" 
            name="link" 
            value={link || ''} 
            onChange={handleNewCardLink} 
            id="url-input" 
            type="url" 
            placeholder="Ссылка на картинку" 
        />
        <span className="popup__form-error url-input-error"></span>
    </PopupWithForm>  
    )
}
export default AddPlacePopup
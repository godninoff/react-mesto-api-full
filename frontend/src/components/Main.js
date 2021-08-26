import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

return(
    <main className="content">
    <section className="profile">
        <div className="profile__avatar-button" onClick={props.onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя"/>
        </div>    
        <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button type="button" className="profile__button-edit" onClick={props.onEditProfile}></button>
            <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
    </section>

    <section className="elements">
        {props.cards.map((card) => (
            <Card 
                card={card} 
                key={card._id} 
                onCardDelete={props.onCardDelete} 
                onCardLike={props.onCardLike} 
                onCardClick={props.onCardClick} 
            />
        ))}
    </section>
    </main> 
)
}

export default Main;


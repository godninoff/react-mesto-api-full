import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__remove ${!isOwn && 'element__remove_hidden'}`
      ); 
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_toggle-active' : 'element__like'}`;  

    function handleCardClick() {
        onCardClick(card);
      }  
    
    function handleLikeClick() {
        onCardLike(card);
    }

    function handleCardDelete() {
        onCardDelete(card);
    } 
    
    return( 
        <article className="element">
            <button type="button" className={cardDeleteButtonClassName} onClick={handleCardDelete}></button>
            <img className="element__image" alt={card.name} src={card.link} onClick={handleCardClick} /> 
            <div className="element__group">
                <h2 className="element__name">{card.name}</h2>
                <div className="element__like-field">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>  
                    <p className="element__like-counter">{card.likes.length > 0 ? card.likes.length : ''}</p>
                </div>    
            </div>
        </article>
    )
}
export default Card
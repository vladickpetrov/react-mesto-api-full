import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `clearbutton element__like-button ${
    isLiked ? "element__like-button_active" : ""
  }`;

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__delete-button clearbutton ${
    isOwn ? "" : "element__delete-button_hidden"
  }`;

  function handleImageClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element__item">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      />
      <img
        className="element__photo"
        src={card.link}
        alt={card.name}
        onClick={handleImageClick}
        style={{ cursor: "pointer" }}
      />
      <div className="element__name-container">
        <h3 className="element__title">{card.name}</h3>
        <div className="element__like-button-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          />
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;

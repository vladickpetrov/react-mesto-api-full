function ImagePopup({card, onClose}) {
  return (
    <div
      className={`popup popup_image ${
        card ? "popup_opened" : ""
      }`}
    >
      <div className="popup__image-window">
        <button
          className="popup__close-button clearbutton"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__image"
          src={card?.link}
          alt={card?.name}
        />
        <h3 className="popup__image-title">{card !== null ? card.name : ''}</h3>
      </div>
      <div className="popup__background popup__background_image"></div>
    </div>
  );
}

export default ImagePopup;

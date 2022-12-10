function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpened ? "popup_opened" : ""
      }`}
    >
      <div className="popup__main-window">
        <button
          className="popup__close-button clearbutton"
          type="button"
          onClick={props.onClose}
        ></button>
        <form
          onSubmit={props.onSubmit}
          className="popup__form"
          name={props.name}
          autoComplete="off"
          action="#"
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button className="popup__save-button" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
      <div className="popup__background"></div>
    </div>
  );
}

export default PopupWithForm;

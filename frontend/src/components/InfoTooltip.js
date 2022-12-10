function InfoTooltip({ isError, isOpen, closeDialogWindow }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__main-window">
        <button
          className="popup__close-button clearbutton"
          type="button"
          onClick={closeDialogWindow}
        ></button>
        <div className="log">
          <div className={`log__popup${isError ? "_error" : ""}`}></div>
          <h2 className="log__popup-title">
            {isError
              ? "Что-то пошло не так! Попробуйте ещё раз"
              : "Вы успешно зарегистрировались!"}
          </h2>
        </div>
      </div>
      <div className="popup__background"></div>
    </div>
  );
}

export default InfoTooltip;

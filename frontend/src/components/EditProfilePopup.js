import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      name="profile"
      isOpened={isOpen}
      title="Редактировать профиль"
      onClose={onClose}
    >
      <input
        onChange={handleNameChange}
        className="popup__input popup__name"
        id="input-name"
        type="text"
        name="name"
        placeholder="Введите имя"
        required
        maxLength="40"
        minLength="2"
        value={name || ""}
      />
      <span className="popup__error input-name-error"></span>
      <input
        onChange={handleDescriptionChange}
        className="popup__input popup__profession"
        id="input-profession"
        type="text"
        name="profession"
        placeholder="Введите название профессии"
        required
        maxLength="200"
        minLength="2"
        value={description || ""}
      />
      <span className="popup__error input-profession-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

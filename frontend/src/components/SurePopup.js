import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function SurePopup({ isOpen, onClose, onAddPlace }) {
  return (
    <PopupWithForm
      buttonText='Да'
      onSubmit={handleSubmit}
      name="sure"
      isOpened={isOpen}
      title="Вы уверены?"
      onClose={onClose}
    />
  );
}

export default SurePopup;

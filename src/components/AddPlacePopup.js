import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
    onClose();
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name={"add-card"}
      title={"Новое место"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            defaultValue={""}
            className="popup__input popup__input_type_name-card"
            id="card-name"
            required
            type="text"
            name="card-name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            onChange={handleChangeName}
          />
          <span className="popup__input-error error-card-name"></span>

          <input
            defaultValue={""}
            className="popup__input popup__input_type_link-card"
            id="card-link"
            required
            type="url"
            name="card-link"
            placeholder="Ссылка на картинку"
            onChange={handleChangeLink}
          />
          <span className="popup__input-error error-card-link"></span>

          <button className="popup__save" type="submit">
            Сохранить
          </button>
        </>
      }
    />
  );
}

export default AddPlacePopup;

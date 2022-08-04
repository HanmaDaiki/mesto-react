import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [about, setAbout] = React.useState(currentUser.about);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about,
    });

    props.onClose();
  }

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name={"edit"}
      title={"Редактировать профиль"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            onChange={handleChangeName}
            defaultValue={name}
            className="popup__input popup__input_type_name"
            id="edit-name"
            required
            type="text"
            name="edit-name"
            minLength="2"
            maxLength="40"
          />
          <span className="popup__input-error error-edit-name"></span>
          <input
            onChange={handleChangeAbout}
            defaultValue={about}
            className="popup__input popup__input_type_description"
            id="edit-description"
            required
            type="text"
            name="edit-description"
            minLength="2"
            maxLength="200"
          />
          <span className="popup__input-error error-edit-description"></span>
          <button className="popup__save" type="submit">
            Сохранить
          </button>
        </>
      }
    />
  );
}

export default EditProfilePopup;

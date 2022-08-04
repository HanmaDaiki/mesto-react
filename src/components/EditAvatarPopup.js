import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avaRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avaRef.current.value
    });
    props.onClose();
  }

  return (
    <PopupWithForm
      name={"edit-avatar"}
      title={"Обновить аватар"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            className="popup__input popup__input_type_avatar-link"
            id="avatar-link"
            required
            type="url"
            name="avatar-link"
            placeholder="Ссылка на аватарку"
            ref={avaRef}
          />
          <span className="popup__input-error error-avatar-link"></span>

          <button
            className="popup__save"
            type="submit"
          >
            Сохранить
          </button>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
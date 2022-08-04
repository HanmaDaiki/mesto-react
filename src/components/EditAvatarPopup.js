import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const [link, setLink] = React.useState('');

  function handleChangeLinkAvatar(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: link
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
            defaultValue={""}
            ref={handleChangeLinkAvatar}
            className="popup__input popup__input_type_avatar-link"
            id="avatar-link"
            required
            type="url"
            name="avatar-link"
            placeholder="Ссылка на аватарку"
          />
          <span className="popup__input-error error-avatar-link"></span>

          <button
            className="popup__save popup__save_inactive"
            type="submit"
            disabled
          >
            Сохранить
          </button>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
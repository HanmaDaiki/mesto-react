import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentCard, setCurrentCard] = React.useState(null);

  function handleImageCardClick(card) {
    setCurrentCard(card);
    setIsImagePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsConfirmPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  return (
    <div className="page__content">
      <Header />
      <Main
        onCardClick={handleImageCardClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
      />
      <Footer />

      <PopupWithForm
        name={"edit"}
        title={"Редактировать профиль"}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        children={
          <form className="popup__form" name="edit-profile" noValidate>
            <input
              defaultValue={""}
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
              defaultValue={""}
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
          </form>
        }
      />

      <PopupWithForm
        name={"add-card"}
        title={"Новое место"}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        children={
          <form className="popup__form" name="add-card" noValidate>
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
            />
            <span className="popup__input-error error-card-link"></span>

            <button
              className="popup__save popup__save_inactive"
              type="submit"
              disabled
            >
              Сохранить
            </button>
          </form>
        }
      />

      <PopupWithForm
        name={"edit-avatar"}
        title={"Обновить аватар"}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        children={
          <form className="popup__form" name="edit-avatar" noValidate>
            <input
              defaultValue={""}
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
          </form>
        }
      />

      <PopupWithForm
        name={"delete-card"}
        title={"Вы уверены?"}
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        children={
          <form className="popup__form" name="delete-card">
            <button className="popup__save" type="button">
              Да
            </button>
          </form>
        }
      />

      <ImagePopup
        card={currentCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;

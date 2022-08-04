import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import React, {useEffect} from "react";
import { api } from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentCard, setCurrentCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Имя',
    about: 'Описание',
    avatar: 'https://dummyimage.com/600x400/000/fff.png'
  });

  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          id: user._id
        });
      })
      .catch((err) => {
        console.log(`В апи getUserInfo ошибка - ${err}`);
      });
  }, [])

  function handleUpdateAvatar(link) {
    api
      .patchAvatar(link)
      .then()
  }

  function handleUpdateUser(user) {
    api
      .editInfoUser(user)
      .then((updateUserInfo) => {
        setCurrentUser(updateUserInfo);
      });
  }

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
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            onCardClick={handleImageCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
          />
          <Footer />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={}/>

          <PopupWithForm
            name={"add-card"}
            title={"Новое место"}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
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
              </>
            }
          />



          <PopupWithForm
            name={"delete-card"}
            title={"Вы уверены?"}
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            children={
              <>
                <button className="popup__save" type="button">
                  Да
                </button>
              </>
            }
          />

          <ImagePopup
            card={currentCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

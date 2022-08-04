import React, { useEffect } from "react";
import { api } from "../utils/Api";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [cards, setCards] = React.useState([]);
  const {name, about, avatar, id} = React.useContext(CurrentUserContext);

  useEffect(() => {
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(`В апи getCards ошибка - ${err}`);
      });
  }, []);

  function handleDeleteCard(removedCard){
    api
      .deleteCard(removedCard._id)
      .then(() => {
        setCards(cards.filter((card) => {
          return removedCard._id !== card._id;
        }))
      })
      .catch((err) => {
        console.log(`В апи deleteCard ошибка - ${err}`);
      });
  }

  function  handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === id);

    if(!isLiked) {
      api.putLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(`В апи putLike ошибка - ${err}`);
        });
    } else {
      api.deleteLike(card._id)
        .then(newCard => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
        .catch((err) => {
        console.log(`В апи deleteLike ошибка - ${err}`);
      });
    }
  }

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar">
          <button className="edit-avatar" onClick={onEditAvatar}></button>
          <img className="avatar" alt="Фото пользователя" src={avatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{name}</h1>
          <button
            className="profile__edit"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__description">{about}</p>
        </div>
        <button
          className="profile__add"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="cards">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={handleCardLike} onDeleteCard={handleDeleteCard}/>
        ))}
      </section>
    </main>
  );
}

export default Main;

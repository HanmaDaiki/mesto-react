import React from "react";

function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }
  return (
    <article className="card">
      <img
        className="card__image"
        src={card.link}
        alt=""
        onClick={handleClick}
      />
      <h2 className="card__title">{card.name}</h2>
      <div className="card__like">
        <button className="card__like-button"></button>
        <span className="card__like-counter">{card.likes.length}</span>
      </div>
      <button className="card__delete"></button>
    </article>
  );
}

export default Card;

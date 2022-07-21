import React from "react";

function PopupWithForm({ name, title, children, isOpen = false, onClose }) {
  if (isOpen) {
    return (
      <div className={`popup popup_${name} popup_active`}>
        <div className="popup__overlay" onClick={onClose}></div>
        <div className="popup__container">
          <button
            className="popup__close"
            type="button"
            onClick={onClose}
          ></button>
          <h2 className="popup__title">{title}</h2>
          {children}
        </div>
      </div>
    );
  }
}

export default PopupWithForm;

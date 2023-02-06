import React from 'react';
import './InfoTooltip.css';
export default function InfoTooltip({ isOpen, message, onClose }) {
  const popupClassName = isOpen ? 'popup popup_opened' : 'popup';

  return (
    <div className={popupClassName}>
      <div className='popup__container'>
        <p className='popup__infotooltip-text'>{message}</p>
        <button className='popup__close-button' onClick={onClose}>
          &#10005;
        </button>
      </div>
    </div>
  );
}

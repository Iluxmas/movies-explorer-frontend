import React from 'react';

import './MoviesCard.css';

export default function MoviesCard({ title, duration, posterURL, isFav }) {
  const iconStyle = isFav ? 'card__favorite-icon card__favorite-icon_active' : 'card__favorite-icon';

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  let durationText;
  if (hours === 0) durationText = `${minutes}м`;
  else if (minutes === 0) durationText = `${hours}ч`;
  else durationText = `${hours}ч ${minutes}м`;

  return (
    <li className='card'>
      <div className='card__header'>
        <div className='card__info'>
          <h3 className='card__title'>{title}</h3>
          <span className='card__duration'>{durationText}</span>
        </div>
        <span className={iconStyle} title='Добавить в закладки'></span>
      </div>
      <img className='card__poster' src={posterURL}></img>
    </li>
  );
}

import React from 'react';

import './MoviesCard.css';

export default function MoviesCard({ movieData, isFav, onToggleLike, isPathSaved }) {
  const iconStyle = isFav ? 'card__favorite-icon card__favorite-icon_active' : 'card__favorite-icon';

  const hours = Math.floor(movieData.duration / 60);
  const minutes = movieData.duration % 60;
  let durationText;
  if (hours === 0) durationText = `${minutes}м`;
  else if (minutes === 0) durationText = `${hours}ч`;
  else durationText = `${hours}ч ${minutes}м`;

  return (
    <li className='card' key={movieData.id}>
      <div className='card__header'>
        <div className='card__info'>
          <h3 className='card__title'>{movieData.nameEN}</h3>
          <span className='card__duration'>{durationText}</span>
        </div>
        {isPathSaved ? (
          <span className='card__favorite-delete' title='Remove from favorites' onClick={onToggleLike}>
            &#10005;
          </span>
        ) : (
          <span
            className={iconStyle}
            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
            onClick={onToggleLike}
          ></span>
        )}
      </div>
      <a href={movieData.trailerLink} target='_blank' className='card__movie-link'>
        <img
          className='card__poster'
          src={movieData.image.url ? `https://api.nomoreparties.co/${movieData.image.url}` : movieData.image}
          alt={`Poster for ${movieData.nameEN}`}
        />
      </a>
    </li>
  );
}

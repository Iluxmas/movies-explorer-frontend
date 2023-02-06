import React from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ moviesData, onToggleLike, isLoading, isPathSaved }) {
  const myMovies = JSON.parse(localStorage.getItem('myMovies'));

  return moviesData ? (
    moviesData?.length ? (
      <ul className='movies-card-list'>
        {moviesData.map((movie) => (
          <MoviesCard
            movieData={movie}
            key={movie.id || movie._id}
            isPathSaved={isPathSaved}
            isFav={myMovies?.some((favMovie) => favMovie._id === movie._id || favMovie.movieId === movie.id)}
            onToggleLike={() => onToggleLike(movie)}
          />
        ))}
      </ul>
    ) : (
      <div className='no-result'>
        <p className='no-result__text'>{isPathSaved ? 'Здесь будут ваши избранные фильмы' : 'Ничего не найдено'}</p>
      </div>
    )
  ) : (
    !isLoading && (
      <div className='no-result'>
        <p className='no-result__text'>Введите ключевое слово</p>
      </div>
    )
  );
}

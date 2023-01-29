import React from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ moviesData, onToggleLike }) {
  const myMovies = JSON.parse(localStorage.getItem('myMovies'));
  // console.log('myMovies:');
  // console.log(myMovies);
  // console.log('moviesData:');
  // console.log(moviesData);
  // const isFav = myMovies.some((movie) => movie.movieId === moviesData.id);

  return moviesData ? (
    moviesData?.length ? (
      <ul className='movies-card-list'>
        {moviesData.map((movie, idx) => (
          <MoviesCard
            movieData={movie}
            key={idx}
            isFav={myMovies?.some((favMovie) => favMovie._id === movie._id || favMovie.movieId === movie.id)}
            onToggleLike={onToggleLike}
          />
        ))}
      </ul>
    ) : (
      <div className='no-result'>
        <p className='no-result__text'>Ничего не найдено</p>
      </div>
    )
  ) : (
    <div className='no-result'>
      <p className='no-result__text'>Введите ключевое слово</p>
    </div>
  );
}

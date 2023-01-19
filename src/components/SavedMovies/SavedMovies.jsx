import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import './SavedMovies.css';

export default function SavedMovies() {
  const cards = Array(4)
    .fill(1)
    .map((a, idx) => (
      <MoviesCard
        title={'Mesto mesto mesto'}
        duration={122}
        key={idx}
        posterURL={'https://github.com/Iluxmas/resume/raw/master/src/images/projects/mesto-app.JPG'}
        isFav={2 > 1}
      />
    ));
  return (
    <section className='saved-movies'>
      <SearchForm />
      <MoviesCardList>
        <MoviesCard
          title={'Mesto mesto, this movie name could be very very long, enough to break your wonderful layout!'}
          duration={122}
          key={123}
          posterURL={'https://www.film.ru/sites/default/files/filefield_paths/every.jpg'}
          isFav={2 > 1}
        />
        {cards}
      </MoviesCardList>
    </section>
  );
}

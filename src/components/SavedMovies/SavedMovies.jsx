import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MovieCard from '../MovieCard/MovieCard';
import './SavedMovies.css';

export default function SavedMovies() {
  return (
    <section className='saved-movies'>
      <SearchForm />
      <MoviesCardList>
        <MovieCard
          title={'alabai'}
          duration={122}
          posterURL={'https://github.com/Iluxmas/resume/raw/master/src/images/projects/mesto-app.JPG'}
          isFav={false}
        />
        <MovieCard
          title={'alabai'}
          duration={122}
          posterURL={'https://github.com/Iluxmas/resume/raw/master/src/images/projects/mesto-app.JPG'}
          isFav={false}
        />
        <MovieCard
          title={'alabai'}
          duration={122}
          posterURL={'https://github.com/Iluxmas/resume/raw/master/src/images/projects/mesto-app.JPG'}
          isFav={false}
        />
        <MovieCard
          title={'alabai'}
          duration={122}
          posterURL={'https://github.com/Iluxmas/resume/raw/master/src/images/projects/mesto-app.JPG'}
          isFav={false}
        />
      </MoviesCardList>
    </section>
  );
}

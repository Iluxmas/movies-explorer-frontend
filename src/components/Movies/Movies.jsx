import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MovieCard from '../MovieCard/MovieCard';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

export default function Movies() {
  return (
    <section className='movies'>
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
      <Preloader />
    </section>
  );
}

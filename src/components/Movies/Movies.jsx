import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import ShowMore from '../ShowMore/ShowMore';
import './Movies.css';

export default function Movies() {
  const cards = Array(5)
    .fill(1)
    .map((a, idx) => (
      <MoviesCard
        title={'Mesto mesto mesto'}
        duration={122}
        key={idx}
        posterURL={'https://github.com/Iluxmas/resume/raw/master/src/images/projects/mesto-app.JPG'}
        isFav={Math.random() > 0.5}
      />
    ));

  return (
    <section className='movies'>
      <SearchForm />
      <Preloader />
      <MoviesCardList>{cards}</MoviesCardList>
      <ShowMore />
    </section>
  );
}

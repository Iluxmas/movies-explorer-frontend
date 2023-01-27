import React, { useState, useEffect } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MainApiService from '../../utils/MainApi';
import MoviesApiService from '../../utils/MoviesApi';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import ShowMore from '../ShowMore/ShowMore';
import './Movies.css';

export default function Movies() {
  const [allMovies, setAllmovies] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState(null);

  useEffect(() => {
    if (!localStorage.myMovies) {
      MainApiService.getMyMovies()
        .then((data) => localStorage.setItem('myMovies', JSON.stringify(data)))
        .catch();
    }
  }, []);

  function handleSearch(phrase, isShort) {
    if (!localStorage.allMovies) {
      MoviesApiService.getAllMovies()
        .then((data) => {
          localStorage.setItem('allMovies', JSON.stringify(data));
          const searchResult = searchMovies(data, phrase, isShort);
          localStorage.setItem('searchResult', JSON.stringify(searchResult));
        })
        .catch();
    } else {
      const collection = JSON.parse(localStorage.getItem('allMovies'));
      const searchResult = searchMovies(collection, phrase, isShort);
      localStorage.setItem('searchResult', JSON.stringify(searchResult));
    }
  }

  function searchMovies(collection, phrase, isShort) {
    const result = [];
    collection.forEach((movie) => {
      if (isShort) {
        if (
          (movie.nameRU.toLowerCase().indexOf(phrase.toLowerCase()) > -1 ||
            movie.nameEN.toLowerCase().indexOf(phrase.toLowerCase()) > -1) &&
          movie.duration <= 40
        ) {
          result.push(movie);
        }
      } else {
        if (
          movie.nameRU.toLowerCase().indexOf(phrase.toLowerCase()) > -1 ||
          movie.nameEN.toLowerCase().indexOf(phrase.toLowerCase()) > -1
        ) {
          result.push(movie);
        }
      }
    });
    return result;
  }

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
      <SearchForm onSearch={handleSearch} />
      <Preloader />
      <MoviesCardList>{cards}</MoviesCardList>
      <ShowMore />
    </section>
  );
}

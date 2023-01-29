import React, { useState, useEffect } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MainApiService from '../../utils/MainApi';
import MoviesApiService from '../../utils/MoviesApi';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import ShowMore from '../ShowMore/ShowMore';
import './Movies.css';

export default function Movies({ savedMovies, onLike, onSearch, searchResult }) {
  // const [allMovies, setAllmovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState(null);

  const token = localStorage.getItem('jwt');

  useEffect(() => {
    if (!localStorage.myMovies) {
      const token = localStorage.getItem('jwt');
      if (token) {
        MainApiService.getMyMovies(token)
          .then((data) => localStorage.setItem('myMovies', JSON.stringify(data)))
          .catch();
      }
    }
  }, []);

  function handleLike(movie) {
    const myMovies = JSON.parse(localStorage.getItem('myMovies'));
    console.log(movie);
    const { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, id } = movie;
    const newMovie = {
      country,
      director,
      duration,
      year,
      description,
      image: `https://api.nomoreparties.co/${image.url}`,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail: `https://api.nomoreparties.co/${image.formats.thumbnail.url}`,
      movieId: id,
    };
    MainApiService.postMovieLike(newMovie, token)
      .then((data) => {
        myMovies.push(data);
        localStorage.setItem('myMovies', JSON.stringify(myMovies));
      })
      .catch();
  }

  function handleSearch(phrase, isShort) {
    onSearch(phrase, isShort);
    localStorage.setItem('search', phrase);
    localStorage.setItem('isShort', isShort);
  }

  return (
    <section className='movies'>
      <SearchForm onSearch={handleSearch} />
      {isLoading && <Preloader />}
      <MoviesCardList moviesData={searchResult} onToggleLike={onLike} />
      <ShowMore />
    </section>
  );
}

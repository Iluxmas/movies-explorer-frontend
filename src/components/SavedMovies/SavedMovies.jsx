import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import './SavedMovies.css';

export default function SavedMovies({ savedMovies, onDislike, onSearch, searchResult }) {
  // const [savedMovies, setSavedMovies] = useState(null);

  // const token = localStorage.getItem('jwt');

  useEffect(() => {}, []);

  return (
    <section className='saved-movies'>
      <SearchForm onSearch={onSearch} />
      <MoviesCardList moviesData={savedMovies} onToggleLike={onDislike} />
    </section>
  );
}

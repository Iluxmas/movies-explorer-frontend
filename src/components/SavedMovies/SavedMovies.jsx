import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import searchMovies from '../../utils/searchMovies';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';

export default function SavedMovies({ savedMovies, onDislike }) {
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    setSearchResult(savedMovies);
  }, [savedMovies]);

  function handleSearch(phrase, isShort) {
    const searchRes = searchMovies(savedMovies, phrase, isShort);
    setSearchResult(searchRes);
  }

  return (
    <section className='saved-movies'>
      <SearchForm onSearch={handleSearch} isPathSaved={true} inputValues={{ search: '', isShort: false }} />
      <MoviesCardList moviesData={searchResult} isPathSaved={true} onToggleLike={onDislike} />
    </section>
  );
}

import React, { useState, useEffect } from 'react';

import ShowMore from '../ShowMore/ShowMore';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './Movies.css';

export default function Movies({ onMount, onLike, onSearch, searchResult, isLoading, isHidden, onLoadMore }) {
  useEffect(() => {
    onMount();
  }, []);

  function handleSearch(phrase, isShort) {
    onSearch(phrase, isShort);
  }

  return (
    <section className='movies'>
      <SearchForm
        onSearch={handleSearch}
        inputValues={{ search: localStorage.getItem('search'), isShort: localStorage.getItem('isShort') }}
      />
      {isLoading && <Preloader />}
      <MoviesCardList moviesData={searchResult} onToggleLike={onLike} isLoading={isLoading} />
      {!isHidden && <ShowMore onLoadMore={onLoadMore} />}
    </section>
  );
}

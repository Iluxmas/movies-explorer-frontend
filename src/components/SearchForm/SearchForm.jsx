import React, { useState, useEffect } from 'react';

import './SearchForm.css';

export default function SearchForm({ onSearch, inputValues, isPathSaved = false }) {
  const [isChecked, setIsChecked] = useState(inputValues.isShort === 'true');
  const [phrase, setPhrase] = useState(inputValues.search || '');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const searchPhrase = localStorage.getItem('search');
    if (searchPhrase && phrase === searchPhrase) {
      onSearch(phrase, isChecked);
    }
  }, [isChecked]);

  function handleSearch(event) {
    event.preventDefault();
    if (phrase) {
      if (!isPathSaved) {
        localStorage.setItem('search', phrase);
        localStorage.setItem('isShort', isChecked);
      }
      onSearch(phrase, isChecked);
    } else {
      setShowError(true);
    }
  }

  return (
    <section className='search'>
      <form className='search__form' noValidate>
        <div className='search-container'>
          <div className='search__bar'>
            <input
              className='search__input'
              placeholder='Фильм'
              type='text'
              value={phrase}
              onInput={({ target }) => setShowError(target.value ? false : true)}
              onChange={({ target }) => setPhrase(target.value)}
              required
            />
            <button className='search__submit' type='submit' onClick={(event) => handleSearch(event)}>
              Найти
            </button>
          </div>
          <span className={showError ? 'search__error-text search__error-text_visible' : 'search__error-text'}>
            {showError ? 'введите ключевое слово' : ''}
          </span>
        </div>

        <div className='search__slider-container'>
          <span className='search__slider-label'>Короткометражки</span>
          <label className='search__switch' htmlFor='slider'>
            <input
              className='search__short-checkbox'
              id='slider'
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              name='slider'
              type='checkbox'
            />
            <span className='search__slider'></span>
          </label>
        </div>
      </form>
    </section>
  );
}

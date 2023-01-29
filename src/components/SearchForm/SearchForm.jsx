import React, { useState, useEffect } from 'react';

import './SearchForm.css';

export default function SearchForm({ onSearch }) {
  const [isChecked, setIsChecked] = useState(false);
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    const search = localStorage.getItem('search');
    const isShort = localStorage.getItem('isShort');
    console.log(isShort);
    if (search) {
      setPhrase(search);
    }
    if (isShort === 'true') {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, []);

  function handleSearch(event) {
    event.preventDefault();
    if (phrase) {
      localStorage.setItem('search', phrase);
      localStorage.setItem('isShort', isChecked);
      onSearch(phrase, isChecked);
    }
  }

  return (
    <section className='search'>
      <form className='search__form' noValidate>
        <div className='search__bar'>
          <input
            className='search__input'
            placeholder='Фильм'
            type='text'
            value={phrase}
            onChange={({ target }) => setPhrase(target.value)}
            required
          />
          <button className='search__submit' type='submit' onClick={(event) => handleSearch(event)}>
            Найти
          </button>
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

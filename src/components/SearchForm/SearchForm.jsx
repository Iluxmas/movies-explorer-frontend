import React from 'react';

import './SearchForm.css';

export default function SearchForm() {
  return (
    <section className='search'>
      <form action='' className='search__form'>
        <div className='search__bar'>
          <input className='search__input' placeholder='Фильм' type='text' />
          <button className='search__submit' type='button'>
            Найти
          </button>
        </div>
        <div className='search__slider-container'>
          <span className='search__slider-label'>Короткометражки</span>
          <label className='search__switch' htmlFor='slider'>
            <input className='search__short-checkbox' id='slider' name='slider' type='checkbox' />
            <span className='search__slider'></span>
          </label>
        </div>
        {/* <label htmlFor='' className='search__checkbox-label'></label>
        <input type='checkbox'></input> */}
      </form>
    </section>
  );
}

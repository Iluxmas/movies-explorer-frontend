import React from 'react';

import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='portfolio__container'>
        <h4 className='portfolio__header'>Портфолио</h4>
        <div className='portfolio__links'>
          <div className='portfolio__link-container'>
            <a href='' className='portfolio__link-item'>Статичный сайт</a>
            <span className='portfolio__arrow-icon'></span>
          </div>

          <div className='portfolio__line-devider'></div>

          <div className='portfolio__link-container'>
            <a href='' className='portfolio__link-item'>Адаптивный сайт</a>
            <span className='portfolio__arrow-icon'></span>
          </div>

          <div className='portfolio__line-devider'></div>

          <div className='portfolio__link-container'>
            <a href='' className='portfolio__link-item'>Одностраничное приложение</a>
            <span className='portfolio__arrow-icon'></span>
          </div>
        </div>
      </div>
    </section>
  );
}

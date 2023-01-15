import React from 'react';

import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='portfolio__container'>
        <h4 className='portfolio__header'>Портфолио</h4>
        <div className='portfolio__links'>
          <div className='portfolio__link-container'>
            <a
              href='https://iluxmas.github.io/how-to-learn/index.html'
              className='portfolio__link-item'
              target='_blank'
            >
              Статичный сайт
            </a>
            <span className='portfolio__arrow-icon'></span>
          </div>

          <div className='portfolio__line-devider'></div>

          <div className='portfolio__link-container'>
            <a
              href='https://iluxmas.github.io/russian-travel/index.html'
              className='portfolio__link-item'
              target='_blank'
            >
              Адаптивный сайт
            </a>
            <span className='portfolio__arrow-icon'></span>
          </div>

          <div className='portfolio__line-devider'></div>

          <div className='portfolio__link-container'>
            <a href='https://iluxmas.github.io/mesto/index.html' className='portfolio__link-item' target='_blank'>
              Одностраничное приложение
            </a>
            <span className='portfolio__arrow-icon'></span>
          </div>
        </div>
      </div>
    </section>
  );
}

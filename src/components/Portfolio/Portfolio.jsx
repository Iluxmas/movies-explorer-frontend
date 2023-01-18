import React from 'react';

import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='portfolio__container'>
        <h4 className='portfolio__header'>Портфолио</h4>
        <ul className='portfolio__links'>
          <li className='portfolio__link-container'>
            <a
              href='https://iluxmas.github.io/how-to-learn/index.html'
              className='portfolio__link-item'
              target='_blank'
            >
              Статичный сайт
            </a>
          </li>
          <li className='portfolio__link-container'>
            <a
              href='https://iluxmas.github.io/russian-travel/index.html'
              className='portfolio__link-item'
              target='_blank'
            >
              Адаптивный сайт
            </a>
          </li>
          <li className='portfolio__link-container'>
            <a href='https://iluxmas.github.io/mesto/index.html' className='portfolio__link-item' target='_blank'>
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

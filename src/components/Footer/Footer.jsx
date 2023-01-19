import React from 'react';

import './Footer.css';

export default function () {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className='footer__content'>
          <div className='footer__links-container'>
            <a className='footer__link' href='https://practicum.yandex.ru/' target='_blank'>
              Яндекс.Практикум
            </a>
            <a className='footer__link' href='https://github.com/iluxmas' target='_blank'>
              Github
            </a>
          </div>
          <p className='footer__year'>&copy;2220</p>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';

import './Footer.css';

export default function () {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className='footer__content'>
          <div className='footer__links-container'>
            <a className='footer__link' href='' target='_blank'>
              Яндекс.Практикум
            </a>
            <a className='footer__link' href='' target='_blank'>
              Github
            </a>
          </div>
          <p className='footer__year'>&copy;2220</p>
        </div>
      </div>
    </footer>
  );
}

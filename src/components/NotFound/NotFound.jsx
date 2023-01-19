import React from 'react';

import './NotFound.css';

export default function NotFound() {
  return (
    <div className='not-found'>
      <h1 className='not-found__header'>404</h1>
      <p className='not-found__subheader'>Страница не найдена</p>
      <button className='not-found__return' onClick={null}>
        Назад
      </button>
    </div>
  );
}

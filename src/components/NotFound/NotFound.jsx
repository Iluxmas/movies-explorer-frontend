import React from 'react';
import { useHistory } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  const history = useHistory();

  return (
    <div className='not-found'>
      <h1 className='not-found__header'>404</h1>
      <p className='not-found__subheader'>Страница не найдена</p>
      <button className='not-found__return' onClick={() => history.goBack()}>
        Назад
      </button>
    </div>
  );
}

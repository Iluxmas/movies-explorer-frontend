import React from 'react';

import './Profile.css';

export default function Profile() {
  return (
    <div className='profile'>
      <h1 className='profile__title'>Привет, Илья!</h1>
      <form action='' className='profile__form' autoComplete='off'>
        <div className='profile__input-container'>
          <label className='profile__label' htmlFor='profile_name'>
            Имя
          </label>
          <input className='profile__input' type='text' id='profile_name' name='name' placeholder='Введите имя' />
        </div>
        <div className='profile__line-divider'></div>
        <div className='profile__input-container'>
          <label className='profile__label' htmlFor='profile_email'>
            E-mail
          </label>
          <input className='profile__input' type='email' id='profile_email' name='email' placeholder='Введите почту' />
        </div>
      </form>
      <button className='profile__btn profile__btn_type_submit' type='submit'>
        Редактировать
      </button>
      <button className='profile__btn profile__btn_type_logout' type='button'>
        Выйти из аккаунта
      </button>
    </div>
  );
}

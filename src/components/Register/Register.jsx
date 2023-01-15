import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';

import './Register.css';

export default function Register() {
  return (
    <div className='register'>
      <header className='register__header'>
        <Logo />
        <h1 className='register__title'>Добро пожаловать!</h1>
      </header>

      <form className='register__form' autoComplete='off'>
        <label className='register__label' htmlFor='register_name'>
          Имя
        </label>
        <input className='register__input' type='text' id='register_name' name='name' placeholder='Введите имя...' />
        <span className='register__span-error register__span-error_type_name'></span>

        <label className='register__label' htmlFor='register_email'>
          E-mail
        </label>
        <input
          className='register__input'
          type='email'
          id='register_email'
          name='email'
          placeholder='Введите почту...'
        />
        <span className='register__span-error register__span-error_type_email'></span>

        <label className='register__label' htmlFor='register_password'>
          Пароль
        </label>
        <input
          className='register__input'
          type='password'
          id='register_password'
          name='password'
          placeholder='Введите пароль...'
        />
        <span className='register__span-error register__span-error_type_password'>Что-то пошло не так...</span>
      </form>
      <button className='register__submit-button' type='submit'>
        Зарегистрироваться
      </button>
      <p className='register__subtext'>
        Уже зарегистрированы?&nbsp;
        <NavLink className='register__enter-link' to='/sign-in'>
          Войти
        </NavLink>
      </p>
    </div>
  );
}

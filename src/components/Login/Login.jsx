import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';

import './Login.css';

export default function Login() {
  return (
    <div className='login'>
      <header className='login__header'>
        <Logo />
        <h1 className='login__title'>Рады видеть!</h1>
      </header>

      <form className='login__form' autoComplete='off'>
        <label className='login__label' htmlFor='login_email'>
          E-mail
        </label>
        <input
          className='login__input'
          type='email'
          id='login_email'
          name='email'
          placeholder='Введите почту...'
          required
        />
        <span className='login__span-error login__span-error_type_email'></span>

        <label className='login__label' htmlFor='login_password'>
          Пароль
        </label>
        <input
          className='login__input'
          type='password'
          id='login_password'
          name='password'
          placeholder='Введите пароль...'
          required
        />
        <span className='login__span-error login__span-error_type_password'>Что-то пошло не так...</span>
      </form>
      <button className='login__submit-button' type='submit'>
        Войти
      </button>
      <p className='login__subtext'>
        Ещё не зарегистрированы?&nbsp;
        <NavLink className='login__enter-link' to='/sign-up'>
          Регистрация
        </NavLink>
      </p>
    </div>
  );
}

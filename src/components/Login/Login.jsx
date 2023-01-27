import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';

import './Login.css';

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  function handleInputChange(target, setState, setValidity) {
    setState(target.value);
    console.log(target.validity.valid);
    setValidity(target.validity.valid);
  }

  let submitBtnClass = 'login__submit-button login__submit-button_disabled';
  let passwordErrorSpanClass = 'profile__input-error profile__input-error_name';
  let emailErrorSpanClass = 'profile__input-error profile__input-error_email';
  let passwordErrorText = '';
  let emailErrorText = '';

  // if (!isPasswordValid) {
  //   passwordErrorText = 'имя должно быть длиной от 2 до 30 символов';
  //   passwordErrorSpanClass = 'profile__input-error profile__input-error_name profile__input-error_visible';
  // }
  // if (!isEmailValid) {
  //   emailErrorText = 'не соответствует формату электронной почты';
  //   emailErrorSpanClass = 'profile__input-error profile__input-error_email profile__input-error_visible';
  // }

  // if (isNameValid && isEmailValid) {
  //   submitBtnClass = 'profile__btn profile__btn_type_submit';
  // } else {
  //   submitBtnClass = 'profile__btn profile__btn_type_submit profile__btn_disabled';
  // }

  return (
    <div className='login'>
      <header className='login__header'>
        <Logo />
        <h1 className='login__title'>Рады видеть!</h1>
      </header>

      <form className='login__form' noValidate autoComplete='off'>
        <label className='login__label' htmlFor='login_email'>
          E-mail
        </label>
        <input
          className='login__input'
          type='email'
          id='login_email'
          name='email'
          value={email}
          onInput={({ target }) => handleInputChange(target, setEmail, setIsEmailValid)}
          onChange={({ target }) => handleInputChange(target, setEmail, setIsEmailValid)}
          placeholder='Введите почту'
          pattern='^\w+@\w+\.\w{2,}$'
          required
        />
        <span className='login__span-error login__span-error_type_email'>{passwordErrorText}</span>

        <label className='login__label' htmlFor='login_password'>
          Пароль
        </label>
        <input
          className='login__input'
          type='password'
          id='login_password'
          name='password'
          value={password}
          onInput={({ target }) => handleInputChange(target, setPassword, setIsPasswordValid)}
          onChange={({ target }) => handleInputChange(target, setPassword, setIsPasswordValid)}
          placeholder='Введите пароль'
          required
        />
        <span className='login__span-error login__span-error_type_password'>{emailErrorText}</span>
      </form>
      <button className={submitBtnClass} type='submit'>
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

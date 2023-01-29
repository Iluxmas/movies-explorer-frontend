import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import patterns from '../../utils/constants';
import './Login.css';

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  function handleInputChange(target, setState, setValidity) {
    setState(target.value);
    setValidity(target.validity.valid);
  }

  let submitBtnClass = 'login__submit-button login__submit-button_disabled';
  let passwordErrorSpanClass = 'login__span-error login__span-error_type_password';
  let emailErrorSpanClass = 'login__span-error login__span-error_type_email';
  let passwordErrorText = '';
  let emailErrorText = '';

  if (!isPasswordValid) {
    passwordErrorText = 'не должно быть пустым';
    passwordErrorSpanClass = 'login__span-error login__span-error_type_password login__span-error_visible';
  }
  if (!isEmailValid) {
    emailErrorText = 'не соответствует формату электронной почты';
    emailErrorSpanClass = 'login__span-error login__span-error_type_email login__span-error_visible';
  }

  if (isPasswordValid && isEmailValid) {
    submitBtnClass = 'login__submit-button';
  } else {
    submitBtnClass = 'login__submit-button login__submit-button_disabled';
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) return;
    onLogin(email, password);
    setPassword('');
    setEmail('');
  }

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
          pattern={patterns.email}
          required
        />
        <span className={emailErrorSpanClass}>{emailErrorText}</span>

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
        <span className={passwordErrorSpanClass}>{passwordErrorText}</span>
      </form>
      <button
        className={submitBtnClass}
        type='submit'
        onClick={handleSubmit}
        disabled={!isPasswordValid || !isEmailValid}
      >
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

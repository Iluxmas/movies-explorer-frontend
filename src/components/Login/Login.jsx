import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { PATTERNS } from '../../utils/constants';
import './Login.css';

export default function Login({ onLogin, isLoading }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  function handleInputChange(target, setState, setValidity) {
    setState(target.value);
    setValidity(target.validity.valid);
    toggleErrorShow(target);
  }

  function toggleErrorShow(element) {
    if (element.validity.valid) {
      element.nextElementSibling.classList.remove('login__span-error_visible');
    } else {
      element.nextElementSibling.classList.add('login__span-error_visible');
    }
  }

  let submitBtnClass = 'login__submit-button login__submit-button_disabled';
  let passwordErrorSpanClass = 'login__span-error login__span-error_type_password';
  let emailErrorSpanClass = 'login__span-error login__span-error_type_email';

  const passwordErrorText = isPasswordValid ? '' : 'не должно быть пустым';
  let emailErrorText = isEmailValid ? '' : 'не соответствует формату электронной почты';

  if (isPasswordValid && isEmailValid && !isLoading) {
    submitBtnClass = 'login__submit-button';
  } else {
    submitBtnClass = 'login__submit-button login__submit-button_disabled';
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) return;
    onLogin(email, password);
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
          pattern={PATTERNS.EMAIL}
          disabled={isLoading}
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
          disabled={isLoading}
          required
        />
        <span className={passwordErrorSpanClass}>{passwordErrorText}</span>
      </form>
      <button
        className={submitBtnClass}
        type='submit'
        onClick={handleSubmit}
        disabled={!isPasswordValid || !isEmailValid || isLoading}
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

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import patterns from '../../utils/constants';

import './Register.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  function handleInputChange(target, setState, setValidity) {
    setState(target.value);
    setValidity(target.validity.valid);
    toggleErrorShow(target);
  }

  function toggleErrorShow(element) {
    if (element.validity.valid) {
      element.nextElementSibling.classList.remove('register__span-error_visible');
    } else {
      element.nextElementSibling.classList.add('register__span-error_visible');
    }
  }

  let submitBtnClass = 'register__submit-btn register__submit-btn_disabled';
  let nameErrorText = isNameValid ? '' : 'имя должно быть длиной от 2 до 30 символов';
  // (кирилица, латиница, дефис и пробел)
  let emailErrorText = isEmailValid ? '' : 'имя должно быть длиной от 2 до 30 символов';
  let passwordErrorText = isPasswordValid ? '' : 'это поле не должно быть пустым';

  if (isNameValid && isEmailValid && isPasswordValid) {
    submitBtnClass = 'register__submit-btn';
  } else {
    submitBtnClass = 'register__submit-btn register__submit-btn_disabled';
  }

  return (
    <div className='register'>
      <header className='register__header'>
        <Logo />
        <h1 className='register__title'>Добро пожаловать!</h1>
      </header>

      <form className='register__form' noValidate autoComplete='off'>
        <label className='register__label' htmlFor='register_name'>
          Имя
        </label>
        <input
          className='register__input'
          type='text'
          id='register_name'
          name='name'
          value={name}
          placeholder='Введите имя'
          onInput={({ target }) => handleInputChange(target, setName, setIsNameValid)}
          onChange={({ target }) => setName(target.value)}
          minLength={2}
          maxLength={30}
          pattern={patterns.name}
          required
        />
        <span className='register__span-error'>{nameErrorText}</span>

        <label className='register__label' htmlFor='register_email'>
          E-mail
        </label>
        <input
          className='register__input'
          type='email'
          id='register_email'
          name='email'
          value={email}
          placeholder='Введите почту'
          onInput={({ target }) => handleInputChange(target, setEmail, setIsEmailValid)}
          onChange={({ target }) => setEmail(target.value)}
          pattern={patterns.email}
          required
        />
        <span className='register__span-error'>{emailErrorText}</span>

        <label className='register__label' htmlFor='register_password'>
          Пароль
        </label>
        <input
          className='register__input'
          type='password'
          id='register_password'
          name='password'
          value={password}
          placeholder='Введите пароль...'
          onInput={({ target }) => handleInputChange(target, setPassword, setIsPasswordValid)}
          onChange={({ target }) => setPassword(target.value)}
          required
        />
        <span className='register__span-error'>{passwordErrorText}</span>
      </form>
      <button className={submitBtnClass} type='submit'>
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

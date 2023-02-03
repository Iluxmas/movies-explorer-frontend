import React, { useState, useEffect, useContext } from 'react';
import { PATTERNS } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './Profile.css';

export default function Profile({ onSubmit, onLogout, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.name);
  const [nameValidity, setNameValidity] = useState({ patternMismatch: false, valid: true });
  const [isEmailValid, setIsEmailValid] = useState(true);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleInputChange(target, setState, setValidity) {
    setState(target.value);
    setValidity(target.name === 'name' ? target.validity : target.validity.valid);
  }

  function handleUpdataData() {
    const newData = { name, email };
    onSubmit(newData);
  }

  let submitBtnClass = 'profile__btn profile__btn_type_submit profile__btn_disabled';
  let nameErrorSpanClass = 'profile__input-error profile__input-error_name';
  let emailErrorSpanClass = 'profile__input-error profile__input-error_email';
  let nameErrorText = '';
  let emailErrorText = '';

  if (nameValidity && nameValidity.patternMismatch) {
    nameErrorText = 'допустимы только кирилица, латиница, дефис и пробел';
  } else if (nameValidity && !nameValidity.valid) {
    nameErrorText = 'имя должно быть длиной от 2 до 30 символов';
  }
  if (nameValidity && !nameValidity.valid) {
    nameErrorSpanClass = 'profile__input-error profile__input-error_name profile__input-error_visible';
  }
  if (!isEmailValid) {
    emailErrorText = 'не соответствует формату электронной почты';
    emailErrorSpanClass = 'profile__input-error profile__input-error_email profile__input-error_visible';
  }

  if (
    nameValidity &&
    nameValidity.valid &&
    isEmailValid &&
    (name !== currentUser.name || email !== currentUser.email) &&
    !isLoading
  ) {
    submitBtnClass = 'profile__btn profile__btn_type_submit';
  } else {
    submitBtnClass = 'profile__btn profile__btn_type_submit profile__btn_disabled';
  }

  return (
    <div className='profile'>
      <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
      <form className='profile__form' noValidate autoComplete='off'>
        <div className='profile__input-container'>
          <label className='profile__label' htmlFor='profile_name'>
            Имя
          </label>
          <input
            className='profile__input'
            type='text'
            id='profile_name'
            name='name'
            value={name}
            onInput={({ target }) => handleInputChange(target, setName, setNameValidity)}
            onChange={({ target }) => setName(target.value)}
            placeholder='Введите имя'
            minLength={2}
            maxLength={30}
            pattern={PATTERNS.NAME}
            disabled={isLoading}
            required
          />
        </div>
        <span className={nameErrorSpanClass}>{nameErrorText}</span>
        <div className='profile__line-divider'></div>
        <div className='profile__input-container'>
          <label className='profile__label' htmlFor='profile_email'>
            E-mail
          </label>
          <input
            className='profile__input'
            type='email'
            id='profile_email'
            name='email'
            value={email}
            onInput={({ target }) => handleInputChange(target, setEmail, setIsEmailValid)}
            onChange={({ target }) => setEmail(target.value)}
            placeholder='Введите почту'
            pattern={PATTERNS.EMAIL}
            disabled={isLoading}
            required
          />
        </div>
        <span className={emailErrorSpanClass}>{emailErrorText}</span>
      </form>
      <button
        className={submitBtnClass}
        type='submit'
        onClick={handleUpdataData}
        disabled={
          !nameValidity.valid || !isEmailValid || isLoading || (name == currentUser.name && email == currentUser.email)
        }
      >
        Редактировать
      </button>
      <button className='profile__btn profile__btn_type_logout' type='button' onClick={onLogout}>
        Выйти из аккаунта
      </button>
    </div>
  );
}

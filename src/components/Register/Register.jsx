import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import MainApiService from '../../utils/MainApi';
import { PATTERNS } from '../../utils/constants';
import { STATUSCODES } from '../../utils/statusCodes';
import { POPUP_MESSAGES } from '../../utils/constants';

import './Register.css';

export default function Register({ onSignup, setMessage, openPopup }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nameValidity, setNameValidity] = useState({});
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  function handleInputChange(target, setState, setValidity) {
    setState(target.value);
    setValidity(target.name === 'name' ? target.validity : target.validity.valid);
    toggleErrorShow(target);
  }

  function handleRegister() {
    if (!name || !email || !password) return;
    setIsLoading(true);
    MainApiService.register(name, email, password)
      .then(({ data }) => {
        onSignup(data.name, data.email, password);
        setName('');
        setEmail('');
        setPassword('');
        setMessage(POPUP_MESSAGES.REG_SUCC);
      })
      .catch((err) => {
        if (err?.includes(STATUSCODES.CONFLICT)) {
          setMessage(POPUP_MESSAGES.CONFLICT);
        } else if (err?.statusCode === STATUSCODES.BAD_REQUEST || err?.includes(STATUSCODES.BAD_REQUEST)) {
          setMessage(POPUP_MESSAGES.BAD_REQUEST);
        } else {
          setMessage(POPUP_MESSAGES.ERROR_DEFAULT);
        }
      })
      .finally(() => {
        openPopup(true);
        setIsLoading(false);
      });
  }

  function toggleErrorShow(element) {
    if (element.validity.valid) {
      element.nextElementSibling.classList.remove('register__span-error_visible');
    } else {
      element.nextElementSibling.classList.add('register__span-error_visible');
    }
  }

  let submitBtnClass = 'register__submit-btn register__submit-btn_disabled';

  let nameErrorText;
  if (nameValidity && nameValidity.patternMismatch) {
    nameErrorText = '?????????????????? ???????????? ????????????????, ????????????????, ?????????? ?? ????????????';
  } else if (nameValidity && !nameValidity.valid) {
    nameErrorText = '?????? ???????????? ???????? ???????????? ???? 2 ???? 30 ????????????????';
  }

  let emailErrorText = isEmailValid ? '' : '???? ?????????????????????????? ?????????????? ?????????????????????? ??????????';
  let passwordErrorText = isPasswordValid ? '' : '?????? ???????? ???? ???????????? ???????? ????????????';

  if (nameValidity.valid && isEmailValid && isPasswordValid && !isLoading) {
    submitBtnClass = 'register__submit-btn';
  } else {
    submitBtnClass = 'register__submit-btn register__submit-btn_disabled';
  }

  return (
    <div className='register'>
      <header className='register__header'>
        <Logo />
        <h1 className='register__title'>?????????? ????????????????????!</h1>
      </header>

      <form className='register__form' noValidate autoComplete='new-password'>
        <label className='register__label' htmlFor='register_name'>
          ??????
        </label>
        <input
          className='register__input'
          type='text'
          id='register_name'
          name='name'
          value={name}
          placeholder='?????????????? ??????'
          onInput={({ target }) => handleInputChange(target, setName, setNameValidity)}
          onChange={({ target }) => setName(target.value)}
          minLength={2}
          maxLength={30}
          pattern={PATTERNS.NAME}
          disabled={isLoading}
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
          placeholder='?????????????? ??????????'
          onInput={({ target }) => handleInputChange(target, setEmail, setIsEmailValid)}
          onChange={({ target }) => setEmail(target.value)}
          pattern={PATTERNS.EMAIL}
          disabled={isLoading}
          required
        />
        <span className='register__span-error'>{emailErrorText}</span>

        <label className='register__label' htmlFor='register_password'>
          ????????????
        </label>
        <input
          className='register__input'
          type='password'
          id='register_password'
          name='password'
          value={password}
          placeholder='?????????????? ????????????...'
          onInput={({ target }) => handleInputChange(target, setPassword, setIsPasswordValid)}
          onChange={({ target }) => setPassword(target.value)}
          disabled={isLoading}
          required
        />
        <span className='register__span-error'>{passwordErrorText}</span>
      </form>
      <button className={submitBtnClass} type='submit' onClick={handleRegister} disabled={isLoading}>
        ????????????????????????????????????
      </button>
      <p className='register__subtext'>
        ?????? ?????????????????????????????????&nbsp;
        <NavLink className='register__enter-link' to='/sign-in'>
          ??????????
        </NavLink>
      </p>
    </div>
  );
}

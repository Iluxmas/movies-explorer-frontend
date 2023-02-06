import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

export default function Navigation({ isLogged }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const hamburgerClass = isNavbarOpen ? 'header__hamburger header__hamburger_activated' : 'header__hamburger';
  const navbarMenuClass = isNavbarOpen ? 'header__navbar-menu header__navbar-menu_activated' : 'header__navbar-menu';
  const lineOneClass = isNavbarOpen ? 'line line1 line1_activated' : 'line line1';
  const lineTwoClass = isNavbarOpen ? 'line line2 line2_activated' : 'line line2';
  const lineThreeClass = isNavbarOpen ? 'line line3 line3_activated' : 'line line3';

  function handleClick() {
    setIsNavbarOpen(() => !isNavbarOpen);
  }

  return (
    <div className='header__navbar'>
      {isLogged ? (
        <>
          <div className={hamburgerClass} onClick={handleClick}>
            <span className={lineOneClass}></span>
            <span className={lineTwoClass}></span>
            <span className={lineThreeClass}></span>
          </div>
          <div className='header__fadeout'></div>
          <nav className={navbarMenuClass}>
            <div className='header__menu-container'>
              <NavLink to='/' className='header__link header__link_main' onClick={() => setIsNavbarOpen(false)}>
                Главная
              </NavLink>
              <NavLink to='/movies' className='header__link header__link_movies' onClick={() => setIsNavbarOpen(false)}>
                Фильмы
              </NavLink>
              <NavLink
                to='/saved-movies'
                className='header__link header__link_saved-movies'
                onClick={() => setIsNavbarOpen(false)}
              >
                Сохраненные фильмы
              </NavLink>
              <NavLink
                to='/profile'
                className='header__link header__link_account'
                onClick={() => setIsNavbarOpen(false)}
              >
                <span className='header__account-text'>Аккаунт</span>
                <span className='header__account-icon'></span>
                <span className='header__account-background'></span>
              </NavLink>
            </div>
          </nav>
        </>
      ) : (
        <>
          <NavLink to='/sign-up' className='header__link header__link_signup'>
            Регистрация
          </NavLink>
          <NavLink to='/sign-in' className='header__link header__link_signin'>
            Войти
          </NavLink>
        </>
      )}
    </div>
  );
}

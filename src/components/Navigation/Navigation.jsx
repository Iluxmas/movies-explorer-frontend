import React, { useState } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import './Navigation.css';

export default function Navigation() {
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
      <Switch>
        <Route exact path='/'>
          <NavLink to='/sign-up' className='header__link header__link_signup'>
            Регистрация
          </NavLink>
          <NavLink to='/sign-in' className='header__link header__link_signin'>
            Войти
          </NavLink>
        </Route>

        <Route path='*'>
          <div className={hamburgerClass} onClick={handleClick}>
            <span className={lineOneClass}></span>
            <span className={lineTwoClass}></span>
            <span className={lineThreeClass}></span>
          </div>
          <div className='header__fadeout'></div>
          <nav className={navbarMenuClass}>
            <div className='header__menu-container'>
              <NavLink to='/' className='header__link header__link_main'>
                Главная
              </NavLink>
              <NavLink to='/movies' className='header__link header__link_movies'>
                Фильмы
              </NavLink>
              <NavLink to='/saved-movies' className='header__link header__link_saved-movies'>
                Сохраненные фильмы
              </NavLink>
              <NavLink to='/profile' className='header__link header__link_account'>
                <span className='header__account-text'>Аккаунт</span>
                <span className='header__account-icon'></span>
              </NavLink>
            </div>
          </nav>
        </Route>
      </Switch>
    </div>
  );
}

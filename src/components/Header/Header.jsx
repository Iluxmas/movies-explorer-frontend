import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import './Header.css';

export default function Header() {
  return (
    <header className='header'>
      <NavLink className='header__logo' to='/'></NavLink>
      <div className='header__navbar'>
        <Switch>
          <Route exact path='/'></Route>
        </Switch>
        <NavLink to='/sign-up' className='header__link header__link_signup'>
          Регистрация
        </NavLink>
        <NavLink to='/sign-in' className='header__link header__link_signin'>
          Войти
        </NavLink>
      </div>
    </header>
  );
}

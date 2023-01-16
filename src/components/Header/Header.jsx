import React from 'react';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import './Header.css';

export default function Header() {
  return (
    <header className='header'>
      <Logo />
      <Navigation />
    </header>
  );
}

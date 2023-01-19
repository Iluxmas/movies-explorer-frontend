import React from 'react';
import { NavLink } from 'react-router-dom';

import './Logo.css';

export default function Logo() {
  return <NavLink className='logo' to='/' title='На главную'></NavLink>;
}

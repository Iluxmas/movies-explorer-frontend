import React from 'react';

import './NavTab.css';

export default function Navtab() {
  return (
    <section className='navtab'>
        <ul className='navtab__nav-list'>
            <li className='navtab__nav-item'>О проекте</li>
            <li className='navtab__nav-item'>Технологии</li>
            <li className='navtab__nav-item'>Студент</li>
        </ul>
    </section>
  );
}

import React from 'react';

import './NavTab.css';

export default function Navtab() {
  return (
    <section className='navtab'>
      <ul className='navtab__nav-list'>
        <li className='navtab__nav-item'>
          <a className='navtab__link' href='#project'>
            О проекте
          </a>
        </li>
        <li className='navtab__nav-item'>
          <a className='navtab__link' href='#techs'>
            Технологии
          </a>
        </li>
        <li className='navtab__nav-item'>
          <a className='navtab__link' href='#aboutme'>
            Студент
          </a>
        </li>
      </ul>
    </section>
  );
}

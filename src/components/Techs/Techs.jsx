import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';

import './Techs.css';

export default function Techs() {
  return (
    <section className='techs'>
      <div className='techs__container'>
        <SectionTitle>Технологии</SectionTitle>
        <div className='techs__description'>
          <h3 className='techs__header'>7 технологий</h3>
          <p className='techs__subheader'>
            На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
          </p>
        </div>
        <ul className='techs__items-list'>
          <li className='tech__item'>HTML</li>
          <li className='tech__item'>CSS</li>
          <li className='tech__item'>JS</li>
          <li className='tech__item'>React</li>
          <li className='tech__item'>Git</li>
          <li className='tech__item'>Express.js</li>
          <li className='tech__item'>MongoDB</li>
        </ul>
      </div>
    </section>
  );
}

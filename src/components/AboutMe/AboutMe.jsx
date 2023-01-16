import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';

import './AboutMe.css';

export default function AboutMe() {
  return (
    <section className='aboutme' id='aboutme'>
      <div className='aboutme__container'>
        <SectionTitle>Студент</SectionTitle>
        <div className='aboutme__info'>
          <img className='aboutme__photo' src={require('../../images/photo3.png')} alt='My photo' />
          <div className='aboutme__text'>
            <h3 className='aboutme__name'>Илья</h3>
            <p className='aboutme__subheader'>Фронтенд-разработчик, 33 года</p>
            <p className='aboutme__paragraph'>
              Я родился Москве, а теперь живу на солнечном побережье Турции, закончил факультет химической технологии
              РХТУ им. Д.И.Менделеева. Мне нравится путешествовать, скалолазанье, сноуборд и научпоп. Недавно начал
              кодить. С 2022 года работаю в компании «Flying Academy» фронтенд-разработчиком, а также помогаю делать
              функционал для одного приложения в качестве фрилансера.
            </p>
            <a className='aboutme__link' href='https://github.com/iluxmas' target='_blank'>
              Github
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

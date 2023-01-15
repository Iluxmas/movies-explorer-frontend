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
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать
              музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После
              того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
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

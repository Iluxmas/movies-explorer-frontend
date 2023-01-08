import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className='project'>
      <div className='project__container'>
        <SectionTitle>О проекте</SectionTitle>
        <div className='project__details'>
          <div className='project__details-item'>
            <h3 className='project__details-header'>Дипломный проект включал 5 этапов</h3>
            <p className='project__details-paragraph'>
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
          </div>

          <div className='project__details-item'>
            <h3 className='project__details-header'>На выполнение диплома ушло 5 недель</h3>
            <p className='project__details-paragraph'>
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className='project__breakdown'>
          <div className='project__breakdown-column project__breakdown-column_backend'>
            <div className='project__breakdown-time project__breakdown-time_backend'>1 неделя</div>
            <h4 className='project__breakdown-title'>Back-end</h4>
          </div>

          <div className='project__breakdown-column project__breakdown-column_frontend'>
            <div className='project__breakdown-time project__breakdown-time_frontend'>4 недели</div>
            <h4 className='project__breakdown-title'>Front-end</h4>
          </div>
        </div>
      </div>
    </section>
  );
}

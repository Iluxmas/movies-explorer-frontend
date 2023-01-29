import React from 'react';
import MainApiService from '../../utils/MainApi';

import './MoviesCard.css';

export default function MoviesCard({ movieData, isFav, onToggleLike }) {
  // const { title, duration, posterURL, isFav, trailerLink } = props;

  const iconStyle = isFav ? 'card__favorite-icon card__favorite-icon_active' : 'card__favorite-icon';

  const hours = Math.floor(movieData.duration / 60);
  const minutes = movieData.duration % 60;
  let durationText;
  if (hours === 0) durationText = `${minutes}м`;
  else if (minutes === 0) durationText = `${hours}ч`;
  else durationText = `${hours}ч ${minutes}м`;

  return (
    <li className='card'>
      <div className='card__header'>
        <div className='card__info'>
          <h3 className='card__title'>{movieData.nameEN}</h3>
          <span className='card__duration'>{durationText}</span>
        </div>
        <span
          className={iconStyle}
          title={isFav ? 'Remove from favorites' : 'Add to favorites'}
          onClick={() => onToggleLike(movieData)}
        ></span>
      </div>
      <a href={movieData.trailerLink} target='_blank' className='card__movie-link'>
        <img
          className='card__poster'
          src={movieData.image.url ? `https://api.nomoreparties.co/${movieData.image.url}` : movieData.image}
          // startsWith('http') ? movieData.image : `https://api.nomoreparties.co/${movieData.image}`
          alt={`Poster for ${movieData.nameEN}`}
        />
      </a>
    </li>
  );
}

[
  {
    country: 'Великобритания',
    director: ' Пирс Сандерсон',
    duration: 72,
    year: '2010',
    description:
      'Хроники возникновения и становления самой значительной субкультуры 90-х — первых британских рейвов в Блэкберне, которые из локальных вечеринок для своих эволюционировали в бедствие национального масштаба: это был первый и последний случай, когда многотысячные рейвы в заброшенных ангарах на полном серьезе обсуждались в Парламенте, а ведущим вечерних новостей пришлось учиться выговаривать словосочетание «эйсид хаус». Главный приз фестиваля In-Edit в Барселоне, приз зрительских симпатий фестиваля в Лидсе.',
    image: 'https://api.nomoreparties.co//uploads/zagruzhennoe_1_dc1a2c8f7d.jpeg',
    trailerLink: 'https://www.youtube.com/watch?v=D2q38mu3MKs',
    thumbnail: 'https://api.nomoreparties.co//uploads/thumbnail_zagruzhennoe_1_dc1a2c8f7d.jpeg',
    owner: '63c802255e9bddaccaf51400',
    movieId: 18,
    nameRU: 'Большие надежды',
    nameEN: 'High on Hope',
    id: '63c805e05e9bddaccaf5140c',
  },
  {
    country: 'США',
    director: 'Стивен Кайак ',
    duration: 61,
    year: '2010',
    description:
      'В конце 1960-х группа «Роллинг Стоунз», несмотря на все свои мегахиты и сверхуспешные концертные туры, была разорена. Виной всему — бездарный менеджмент и драконовское налогообложение в Британии. Тогда музыканты приняли не самое простое для себя решение: летом 1971 года после выхода альбома «Stiсky Fingers» они отправились на юг Франции записывать новую пластинку. Именно там, на Лазурном Берегу, в арендованном Китом Ричардсом подвале виллы Неллькот родился сборник «Exile on Main St.», который стал лучшим альбомом легендарной группы.',
    image: 'https://api.nomoreparties.co//uploads/stones_in_exile_b2f1b8f4b7.jpeg',
    trailerLink: 'https://www.youtube.com/watch?v=UXcqcdYABFw',
    thumbnail: 'https://api.nomoreparties.co//uploads/thumbnail_stones_in_exile_b2f1b8f4b7.jpeg',
    owner: '63c802255e9bddaccaf51400',
    movieId: 1,
    nameRU: '«Роллинг Стоунз» в изгнании',
    nameEN: 'Stones in Exile',
    id: '63d2e21365ab3e4fa9a28176',
  },
  {
    country: 'Бразилия',
    director: 'Уэсли Пенц',
    duration: 80,
    year: '2008',
    description:
      '**Визионер из трущоб**\nГимн бразильским гетто (они же фавелы), породившим байле-фанк — взбалмошную смесь музыки стран третьего мира, нелегального рейва и злого фанка, на волне которого вышли в люди Майя и Сантиголд. Снял фильм не кто иной, как Дипло (он же Уэсли Пенц) — диджей, продюсер и крестный отец двух вышеупомянутых артисток. Поэтому неудивительно, что вместо истории жанра в сухом остатке у него вышла увлекательная этнографическая экспедиция в трущобы Рио-де-Жанейро, где наркотики, секс и зашкаливающий уровень преступности играют в становлении байле-фанка не меньшую роль, чем сама музыка.\n',
    image: 'https://api.nomoreparties.co//uploads/881707734_640_d6a3a43358.jpeg',
    trailerLink: 'https://www.youtube.com/watch?v=Cugdwa7mndA',
    thumbnail: 'https://api.nomoreparties.co//uploads/thumbnail_881707734_640_d6a3a43358.jpeg',
    owner: '63c802255e9bddaccaf51400',
    movieId: 6,
    nameRU: 'Фавела на взрыве',
    nameEN: 'Favela on Blast',
    id: '63d2e24765ab3e4fa9a28178',
  },
  {
    country: 'Германия',
    director: 'Ромуальд Кармакар',
    duration: 110,
    year: '2009',
    description:
      'Последний фильм трилогии, опус магнум Ромуальда Кармакара, премьера которого состоялась в основной программе Венецианского кинофестиваля. Рикардо Виллалобос предстает здесь не столько как один самых востребованных диджеев, сколько как визионер от мира современной музыки. Кармакар исследует не феномен популярности Виллалобоса, а то, как устроена его голова, что творится в его аппаратуре, когда он сводит один трек с другим, как рождается музыка и какое отношение тек-хаус имеет к Мусоргскому.',
    image: 'https://api.nomoreparties.co//uploads/590x400_2eccd40a93.jpeg',
    trailerLink: 'https://www.kinopoisk.ru/film/586534/video/56500/',
    thumbnail: 'https://api.nomoreparties.co//uploads/thumbnail_590x400_2eccd40a93.jpeg',
    owner: '63c802255e9bddaccaf51400',
    movieId: 12,
    nameRU: 'Виллалобос',
    nameEN: 'Villalobos',
    id: '63d2e24965ab3e4fa9a2817a',
  },
  {
    country: 'Unknown',
    director: 'Джульен Темпл',
    duration: 125,
    year: '2012',
    description:
      'Прошлое и настоящее английской столицы по версии Джулиена Темпла\n\nНовая картина мастера музыкальной документалистики Джулиена Темпла — возможно, его самая амбициозная и разносторонняя лента. Просмотрев 6000 часов архивных материалов, режиссер соорудил фильм-коллаж о Лондоне, сравнив свою работу с путешествием во времени. Он имел возможность соединить в одном повествовании первые кадры начала столетия, отрывки из пары десятков ключевых фильмов, хронику и собственные съемки. Получился не просто портрет города, но его биография, рассказ о том, как место и люди, в нем живущие, навсегда меняют друг друга. Темпл улавливает исторические рифмы и закономерности, увязывает культуру с социальными событиями (мировые войны, правление Тэтчер, недавние погромы) — словом, пишет настоящую симфонию города. И, конечно, это не энциклопедическое высказывание, а очень личное и пристрастное. Здесь нет штампов, но обошлось и без удушающего страха показаться банальным: фильм начинается с песни «London Calling» The Clash и завершается под «Waterloo Sunset» The Kinks — и не найти ему обрамления точнее.\n',
    image: 'https://api.nomoreparties.co//uploads/133633090dfcb40e8e87ecf6cb52c419_c534c1283c.jpeg',
    trailerLink: 'https://www.youtube.com/watch?v=tjHnWyJhkzo',
    thumbnail: 'https://api.nomoreparties.co//uploads/thumbnail_133633090dfcb40e8e87ecf6cb52c419_c534c1283c.jpeg',
    owner: '63c802255e9bddaccaf51400',
    movieId: 33,
    nameRU: ' Лондон – современный Вавилон',
    nameEN: 'London – The Modern Babylon',
    id: '63d2e40065ab3e4fa9a2817c',
  },
];

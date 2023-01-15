import React from 'react';

import './MoviesCardList.css';

export default function MoviesCardList(props) {
  return <ul className='movies-card-list'>{props.children}</ul>;
}

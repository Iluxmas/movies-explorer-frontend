import React from 'react';

import './ShowMore.css';

export default function ShowMore({ onLoadMore }) {
  return (
    <div className='show-more'>
      <button className='show-more__button' onClick={onLoadMore}>
        Ещё
      </button>
    </div>
  );
}

import React from 'react';

import './SectionTitle.css';

export default function SectionTitle(props) {
    return (<h2 className='section__title'>{props.children}</h2>)
}
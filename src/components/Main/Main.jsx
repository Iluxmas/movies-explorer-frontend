import React from 'react';
import Techs from '../Techs/Techs';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import AboutProject from '../AboutProject/AboutProject';

import './Main.css';

export default function Main() {
  return (
    <main>
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}

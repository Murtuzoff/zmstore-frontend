import React from 'react';
import WoodenPanelBackground from '../../common/Backgrounds/WoodenPanelBackground';
import './HomeSubscription.css';

const HomeSubscription = () => (
  <div className="home-subscription">
    <div id="home-subscription" />
    <WoodenPanelBackground />
    <div className="home-subscription-container">
      <span>ХОТИТЕ УЗНАТЬ БОЛЬШЕ?</span>
      <span>Зарегистрируйтесь и получите более подробную информацию.</span>
      <form>
        <input type="search" placeholder="Ваш E-mail..." />
        <button type="button">ОТПРАВИТЬ</button>
      </form>
    </div>
  </div>
);

export default HomeSubscription;

import React from 'react';
import WoodenPanelBackground from '../../common/Backgrounds/WoodenPanelBackground';
import MainLogo from '../../common/Images/MainLogo';
import AdditionalLogo from '../../common/Images/AdditionalLogo';
import './HomeHeader.css';

const HomeHeader = () => (
  <div className="home-header">
    <WoodenPanelBackground />
    <div className="home-header-container">
      <div className="home-header-logo left">
        <MainLogo />
      </div>
      <div className="home-header-logo right">
        <AdditionalLogo />
      </div>
    </div>
  </div>
);

export default HomeHeader;

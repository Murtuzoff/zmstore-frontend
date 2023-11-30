import React from 'react';
import './HomeContactList.css';
import WoodenContactBackground from '../../common/Backgrounds/WoodenContactBackground';
import PhoneIcon from '../../common/Icons/RoundedIcons/PhoneIcon';
import ShareIcon from '../../common/Icons/RoundedIcons/ShareIcon';
import MailIcon from '../../common/Icons/RoundedIcons/MailIcon';

const HomeContactList = () => (
  <div className="home-contact-list">
    <div className="home-contact">
      <WoodenContactBackground />
      <div className="home-contact-container">
        <PhoneIcon />
        <div className="home-contact-detail">
          <span>Телефон:</span>
          <span>+7 900 001 2907</span>
        </div>
      </div>
    </div>

    <div className="home-contact">
      <WoodenContactBackground />
      <div className="home-contact-container">
        <ShareIcon />
        <div className="home-contact-detail">
          <span>Мы в социальных сетях:</span>
          <span>@zoreslava_murtuzoff</span>
        </div>
      </div>
    </div>

    <div className="home-contact">
      <WoodenContactBackground />
      <div className="home-contact-container">
        <div className="home-contact-icon">
          <MailIcon />
        </div>
        <div className="home-contact-detail">
          <span>Электронная почта:</span>
          <span>zoreslava.murtuzoff@gmail.com</span>
        </div>
      </div>
    </div>
  </div>
);

export default HomeContactList;

import React from 'react';
import { useTranslation } from 'react-i18next';

import WoodenContactBackground from '../../common/Backgrounds/WoodenContactBackground';
import PhoneIcon from '../../common/Icons/RoundedIcons/PhoneIcon';
import ShareIcon from '../../common/Icons/RoundedIcons/ShareIcon';
import MailIcon from '../../common/Icons/RoundedIcons/MailIcon';

import './HomeContactList.css';

const HomeContactList = () => {
  const { t } = useTranslation();

  return (
    <div className="home-contact-list">
      <div className="home-contact">
        <WoodenContactBackground />
        <div className="home-contact-container">
          <PhoneIcon />
          <div className="home-contact-detail">
            <span>{t('phone')}:</span>
            <span>+994 99 700 2907</span>
          </div>
        </div>
      </div>

      <div className="home-contact">
        <WoodenContactBackground />
        <div className="home-contact-container">
          <ShareIcon />
          <div className="home-contact-detail">
            <span>{t('social')}:</span>
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
            <span>{t('email')}:</span>
            <span>zoreslava.murtuzoff@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContactList;

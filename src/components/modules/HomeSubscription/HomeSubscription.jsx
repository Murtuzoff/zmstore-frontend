import React from 'react';
import { useTranslation } from 'react-i18next';

import WoodenPanelBackground from '../../common/Backgrounds/WoodenPanelBackground';

import './HomeSubscription.css';

const HomeSubscription = () => {
  const { t } = useTranslation();

  return (
    <div className="home-subscription">
      <div id="home-subscription" />
      <WoodenPanelBackground />
      <div className="home-subscription-container">
        <span>{t('wantMoreInfo')}</span>
        <span>{t('getMoreInfo')}</span>
        <form>
          <input type="search" placeholder={`${t('yourEmail')}...`} />
          <button type="button">{t('SEND')}</button>
        </form>
      </div>
    </div>
  );
};

export default HomeSubscription;

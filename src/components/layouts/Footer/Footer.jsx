import React from 'react';
import { useTranslation } from 'react-i18next';

import WoodenPanelBackground from '../../common/Backgrounds/WoodenPanelBackground';
import InstagramIcon from '../../common/Icons/SocialIcons/InstagramIcon';
import FacebookIcon from '../../common/Icons/SocialIcons/FacebookIcon';
import TelegramIcon from '../../common/Icons/SocialIcons/TelegramIcon';
import WhatsappIcon from '../../common/Icons/SocialIcons/WhatsappIcon';
import ViberIcon from '../../common/Icons/SocialIcons/ViberIcon';
import PinterestIcon from '../../common/Icons/SocialIcons/PinterestIcon';
import MastercardIcon from '../../common/Icons/CardIcons/MastercardIcon';
import AmexIcon from '../../common/Icons/CardIcons/AmexIcon';
import VisaIcon from '../../common/Icons/CardIcons/VisaIcon';
import PaypalIcon from '../../common/Icons/CardIcons/PaypalIcon';
import DiscoverIcon from '../../common/Icons/CardIcons/DiscoverIcon';

import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="footer">
      <WoodenPanelBackground />
      <div className="footer-container">
        <div className="footer-social">
          <InstagramIcon />
          <FacebookIcon />
          <TelegramIcon />
          <WhatsappIcon />
          <ViberIcon />
          <PinterestIcon />
        </div>

        <div className="footer-cards">
          <MastercardIcon />
          <VisaIcon />
          <PaypalIcon />
          <AmexIcon />
          <DiscoverIcon />
        </div>

        <div className="footer-copyright">
          <span>© {t('webDesign')} Ruslan Murtuzoff, 2024</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;

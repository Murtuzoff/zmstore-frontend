import React from 'react';
import { useTranslation } from 'react-i18next';

import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button type="button" onClick={() => changeLanguage('az')}>
        AZ
      </button>
      <button type="button" onClick={() => changeLanguage('en')}>
        EN
      </button>
      <button type="button" onClick={() => changeLanguage('ru')}>
        RU
      </button>
    </div>
  );
};

export default LanguageSwitcher;

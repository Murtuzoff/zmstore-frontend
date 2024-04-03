import React from 'react';
import { useTranslation } from 'react-i18next';

import WoodenButton from '../../common/Buttons/WoodenButton/WoodenButton';

import './NotFound.css';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <main className="not-found">
      <span>{t('pageNotFound')}...</span>
      <strong>404</strong>
      <WoodenButton width="260px" label={t('toHome')} />
    </main>
  );
};

export default NotFound;

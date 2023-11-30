import React from 'react';
import WoodenButton from '../../common/Buttons/WoodenButton/WoodenButton';
import './NotFound.css';

const NotFound = () => (
  <main className="not-found">
    <span>Страница не найдена...</span>
    <strong>404</strong>
    <WoodenButton width="260px" label="НА ГЛАВНУЮ СТРАНИЦУ" />
  </main>
);

export default NotFound;

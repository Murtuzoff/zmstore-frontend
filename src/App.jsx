import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './routes/mainRouter';
import './i18n';

import './App.css';

const App = () => (
  <BrowserRouter>
    <MainRouter />
  </BrowserRouter>
);

export default App;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import azTranslation from './locales/az.json';
import enTranslation from './locales/en.json';
import ruTranslation from './locales/ru.json';

const storedLanguage = localStorage.getItem('language') || 'en';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      az: { translation: azTranslation },
      en: { translation: enTranslation },
      ru: { translation: ruTranslation },
    },
    fallbackLng: 'en',
    lng: storedLanguage,
    interpolation: {
      escapeValue: true,
    },
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;

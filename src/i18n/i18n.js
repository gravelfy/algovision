import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import translationEN from './en.json';
import translationFR from './fr.json';

const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // lng: 'en', //default language
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

i18n.changeLanguage();

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import EnglishTranslations from './translations/en.json';
import SerbianTranslations from './translations/sr.json';

i18n
.use(LanguageDetector)
.use(initReactI18next).init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      en: EnglishTranslations,
      sr: SerbianTranslations
    }
  });

export default i18n;
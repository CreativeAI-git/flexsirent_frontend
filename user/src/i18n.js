import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import axios from 'axios';
import { setupAxiosLocalization } from './shared/utils/apiLocalizationHelper';

import enTranslation from './locales/en/translation.json';
import svTranslation from './locales/sv/translation.json';
import frTranslation from './locales/fr/translation.json';
import deTranslation from './locales/de/translation.json';
import esTranslation from './locales/es/translation.json';
import itTranslation from './locales/it/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      sv: { translation: svTranslation },
      fr: { translation: frTranslation },
      de: { translation: deTranslation },
      es: { translation: esTranslation },
      it: { translation: itTranslation },
      nl: { translation: {} },
      no: { translation: {} },
      da: { translation: {} },
      fi: { translation: {} },
      pt: { translation: {} },
      pl: { translation: {} },
      tr: { translation: {} },
      ru: { translation: {} },
      zh: { translation: {} },
      ja: { translation: {} },
      ko: { translation: {} },
      ar: { translation: {} },
      hi: { translation: {} },
      el: { translation: {} },
      he: { translation: {} },
      cs: { translation: {} },
    },
    fallbackLng: 'en',
    supportedLngs: [
      'en', 'es', 'sv', 'fr', 'de', 'it', 'nl', 'no', 'da', 'fi', 'pt', 'pl',
      'tr', 'ru', 'zh', 'ja', 'ko', 'ar', 'hi', 'el', 'he', 'cs'
    ],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
  });

setupAxiosLocalization(axios);

export default i18n;

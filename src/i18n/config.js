import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {getCookie} from "../scripts/cookie/cookies"

const lastLang = getCookie("lang") || "en"

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: lastLang,
  keySeparator:".",
  resources: {
    en: {
      translations: require('./locales/en/en.json')
    },
    pl: {
      translations: require('./locales/pl/pl.json')
    }
  },

  //if more files are needed, add namespaces
  ns: ['translations'],
  defaultNS: 'translations'
});


i18n.languages = ['en', 'pl'];

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptBR from './locales/pt-BR';
import enUS from './locales/en-US';

const resources = {
  'pt-BR': ptBR,
  'en-US': enUS,
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt-BR',
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

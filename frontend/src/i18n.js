import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // charge les traductions à partir de fichiers JSON
  .use(LanguageDetector) // détecte la langue de l'utilisateur
  .use(initReactI18next) // initie la bibliothèque react-i18next
  .init({
    fallbackLng: 'en', // langue par défaut
    supportedLngs: ['en', 'fr'], // Liste des langues supportées
    debug: true, // active le débogage pour voir les messages dans la console
    interpolation: {
      escapeValue: false, // réglez sur false si vous utilisez React pour éviter l'échappement double
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // chemin des fichiers de traduction
    },
    detection: {
      order: ['navigator', 'cookie', 'localStorage', 'sessionStorage', 'querystring', 'htmlTag'], // Ordre des méthodes de détection de la langue
      caches: ['cookie'], // Méthodes de mise en cache de la langue choisie
    },
  });

export default i18n;
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import transEn from "./locale/en.json";
import transAr from "./locale/ar.json";

const resources = {
  en: {
    translation: transEn,
  },
  ar: {
    translation: transAr,
  },
};

const storedLang = localStorage.getItem("lang");

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: storedLang || "en",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

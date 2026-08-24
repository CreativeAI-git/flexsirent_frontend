import i18n from "../../i18n";

export const API_LOCALE_CONFIG = {
  mode: "header", // Supported values: "header" (Accept-Language), "query" (?lang=), "both"
  defaultLang: "en"
};

export function getActiveLanguage() {
  const currentLang = i18n.language || API_LOCALE_CONFIG.defaultLang;
  // Ensure we only pass supported locales in this phase (en, es)
  const SUPPORTED_LOCALES = [
    "en", "es", "sv", "fr", "de", "it", "nl", "no", "da", "fi", "pt", "pl",
    "tr", "ru", "zh", "ja", "ko", "ar", "hi", "el", "he", "cs"
  ];
  return SUPPORTED_LOCALES.includes(currentLang) ? currentLang : API_LOCALE_CONFIG.defaultLang;
}

export function setupAxiosLocalization(axiosInstance) {
  axiosInstance.interceptors.request.use((config) => {
    const lang = getActiveLanguage();

    if (API_LOCALE_CONFIG.mode === "header" || API_LOCALE_CONFIG.mode === "both") {
      config.headers = config.headers || {};
      config.headers["Accept-Language"] = lang;
    }

    if (API_LOCALE_CONFIG.mode === "query" || API_LOCALE_CONFIG.mode === "both") {
      config.params = config.params || {};
      config.params["lang"] = lang;
    }

    return config;
  }, (error) => {
    return Promise.reject(error);
  });
}

export function getMaskedAddress(address) {
  if (!address) return "";
  const parts = address.split(",").map(p => p.trim());
  if (parts.length > 2) {
    // Mask specific street numbers or building addresses by keeping only the city, region, or country details
    return parts.slice(-2).join(", ");
  }
  return address;
}

export function getHrefLangs(pathWithoutLang) {
  const SUPPORTED_LOCALES = [
    "en", "es", "sv", "fr", "de", "it", "nl", "no", "da", "fi", "pt", "pl",
    "tr", "ru", "zh", "ja", "ko", "ar", "hi", "el", "he", "cs"
  ];
  const cleanPath = pathWithoutLang.replace(/^\/+/, "");
  const canonicalBase = (import.meta.env.VITE_CANONICAL_URL || "https://flexsirent.com").replace(/\/+$/, "");
  return SUPPORTED_LOCALES.map(lang => ({
    tagName: "link",
    rel: "alternate",
    hreflang: lang,
    href: `${canonicalBase}/${lang}/${cleanPath}`.replace(/\/+$/, "")
  }));
}

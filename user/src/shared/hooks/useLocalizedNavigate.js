import { useNavigate, useParams, useLocation } from "react-router";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { lang } = useParams();
  const location = useLocation();

  return (to, options) => {
    if (typeof to === "string") {
      const currentLang = lang || "en";

      // Handle relative query params and hash links safely with current pathname
      if (to.startsWith("?")) {
        navigate(`${location.pathname}${to}`, options);
        return;
      }
      if (to.startsWith("#")) {
        navigate(`${location.pathname}${location.search}${to}`, options);
        return;
      }

      // Do not prefix external links
      if (
        to.startsWith("http://") ||
        to.startsWith("https://") ||
        to.startsWith("mailto:") ||
        to.startsWith("tel:")
      ) {
        navigate(to, options);
        return;
      }

      // Check if it already has a dynamic language code prefix (e.g. /en/, /sv/)
      const langPrefixRegex = new RegExp(`^\\/?(${currentLang}|en|sv|fr|de|es|it)(\\/|$)`);

      let targetPath = to;
      if (!langPrefixRegex.test(to)) {
        // Strip leading slash if any, then prepend /${lang}/
        const cleanPath = to.replace(/^\/+/, "");
        targetPath = `/${currentLang}/${cleanPath}`;
      } else if (!to.startsWith("/")) {
        // If it starts with language but lacks a leading slash, prepend it
        targetPath = `/${to}`;
      }

      navigate(targetPath, options);
    } else {
      // Handle back navigations (e.g., navigate(-1))
      navigate(to, options);
    }
  };
};

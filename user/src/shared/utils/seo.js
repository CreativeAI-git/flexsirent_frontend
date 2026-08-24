import { API_REQUEST } from "../../redux/features";
import { seoBySlugAPI } from "../routes/apiURLs";

const DEFAULT_TITLE = "Flexsirent";

const setMetaDescription = (value) => {
  if (!value || typeof document === "undefined") return;
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", "description");
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", value);
};

export const applySeoMeta = (seoData) => {
  if (typeof document === "undefined") return;
  if (!seoData) {
    document.title = DEFAULT_TITLE;
    setMetaDescription("");
    return;
  }
  if (seoData?.meta_title) {
    document.title = seoData.meta_title;
  }
  setMetaDescription(seoData?.meta_description);
};

export const fetchAndApplySeoBySlug = async (slug) => {
  if (!slug) return null;
  try {
    const response = await API_REQUEST({
      url: `${seoBySlugAPI}${slug}`,
      method: "GET",
      isSuccessToast: false,
      isErrorToast: false,
    });
    const seoData = response?.data ?? null;
    applySeoMeta(seoData);
    return seoData;
  } catch (error) {
    return null;
  }
};
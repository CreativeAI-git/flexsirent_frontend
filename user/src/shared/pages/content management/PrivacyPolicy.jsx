import Loader from "../../components/loader";
import WebFooter from "../../layout/WebFooter";
import WebHeader from "../../layout/WebHeader";
import WebSubHeader from "../../layout/WebSubHeader";
import { useLoaderData } from "react-router";
import ContentManagement from "../../components/pages/content management";
import axios from "axios";
import { BASE_URL, getPolicyDataAPI, seoBySlugAPI } from "../../../shared/routes/apiURLs";
import { useTranslation } from "react-i18next";

export async function loader() {
  try {
    const [policyRes, seoRes] = await Promise.all([
      axios.get(`${BASE_URL}${getPolicyDataAPI}2`),
      axios.get(`${BASE_URL}${seoBySlugAPI}privacy-policy`).catch(() => null),
    ]);
    const rawData = policyRes.data?.data;
    const policyContent = (typeof rawData === "string" ? rawData : rawData?.content) || "";
    return {
      policyContent,
      seoData: seoRes?.data?.data || null,
    };
  } catch (error) {
    return { policyContent: "", seoData: null };
  }
}

export function meta({ data, params }) {
  const lang = params.lang || "en";
  const canonicalBase = (import.meta.env.VITE_CANONICAL_URL || "https://flexsirent.com").replace(/\/+$/, "");
  const url = `${canonicalBase}/${lang}/privacy-policy`;
  const seo = data?.seoData;
  const title = seo?.meta_title || "Privacy Policy | Flexsirent";
  const description = seo?.meta_description || "Read our privacy policy to understand how we handle your personal data on Flexsirent.";

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { tagName: "link", rel: "canonical", href: url }
  ];
}

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const loaderData = useLoaderData();
  const policyContent = loaderData?.policyContent || "";

  return (
    <>
      <WebHeader />
      <WebSubHeader lebel={t("policies.privacy")} />
      <ContentManagement content={policyContent} />
      <WebFooter />
    </>
  );
};

export default PrivacyPolicy;

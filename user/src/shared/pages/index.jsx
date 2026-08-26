import WebHeader from "../layout/WebHeader";
import Banner from "../components/pages/home/Banner";
import { useLoaderData } from "react-router";
import axios from "axios";
import { BASE_URL, seoBySlugAPI } from "../routes/apiURLs";
import WebFooter from "../layout/WebFooter";

export async function loader() {
  try {
    const seoRes = await axios.get(`${BASE_URL}${seoBySlugAPI}home`).catch(() => null);
    return {
      seoData: seoRes?.data?.data || null,
    };
  } catch (error) {
    return {
      seoData: null,
    };
  }
}

import { getHrefLangs } from "../utils/seoHelper";

export function meta({ data, params }) {
  const lang = params.lang || "en";
  const canonicalBase = (import.meta.env.VITE_CANONICAL_URL || "https://flexsirent.com").replace(/\/+$/, "");
  const url = `${canonicalBase}/${lang}`;
  const seo = data?.seoData;
  const title = seo?.meta_title || "Flexsirent | Flexible Medium Term Rentals";
  const description = seo?.meta_description || "Book flexible stays, apartments, rooms, and properties for medium term rentals on Flexsirent.";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${canonicalBase}/${lang}/#website`,
        "url": url,
        "name": "Flexsirent",
        "description": description,
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${canonicalBase}/${lang}/properties?location={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": lang
      },
      {
        "@type": "Organization",
        "@id": `${canonicalBase}/#organization`,
        "name": "Flexsirent",
        "url": canonicalBase,
        "logo": {
          "@type": "ImageObject",
          "@id": `${canonicalBase}/#logo`,
          "url": `${canonicalBase}/assets/img/logo.svg`,
          "caption": "Flexsirent Logo"
        },
        "sameAs": [
          "https://www.facebook.com/flexsirent",
          "https://www.instagram.com/flexsirent",
          "https://twitter.com/flexsirent"
        ]
      }
    ]
  };

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { tagName: "link", rel: "canonical", href: url },
    ...getHrefLangs(""),
    { "script:ld+json": structuredData }
  ];
}

const Home = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (min-width: 768px) {
          html, body {
            height: 100%;
            margin: 0;

          }
          #root, .App {
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          .ct_header {
            flex-shrink: 0;
          }
          .ct_banner_bg {
            flex: 1;
            display: flex;
            align-items: center;
            min-height: 0 !important;
            padding-block: 0 !important;
          }
        }
      `}} />
      {/* Header Section S */}
      <WebHeader />
      {/* Banner Section S */}
      <Banner />
      <WebFooter/>
    </>
  );
};

export default Home;

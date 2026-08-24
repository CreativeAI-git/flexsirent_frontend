import { useLoaderData, useParams } from "react-router";
import axios from "axios";
import WebHeader from "../../layout/WebHeader";
import WebFooter from "../../layout/WebFooter";
import { BASE_URL, webPropertiesAPI } from "../../../shared/routes/apiURLs";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useTranslation } from "react-i18next";
import NoRecord from "../../components/other/NoRecord";
import { useState } from "react";

const formatSlug = (slug) => {
  if (!slug) return "";
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export async function loader({ params, request }) {
  const { city_slug, neighborhood_slug } = params;
  const lang = params.lang || "en";
  const city = city_slug.replace("-", " ").toLowerCase();
  const neighborhood = neighborhood_slug.replace("-", " ").toLowerCase();

  try {
    const res = await axios.get(`${BASE_URL}${webPropertiesAPI}`);
    const allProperties = res.data?.data || [];

    // Filter properties belonging to this city AND neighborhood
    const properties = allProperties.filter(p =>
      (p.address?.toLowerCase().includes(city) || p.property_title?.toLowerCase().includes(city)) &&
      (p.address?.toLowerCase().includes(neighborhood) || p.property_title?.toLowerCase().includes(neighborhood))
    );

    const rents = properties.map(p => Number(p.monthly_rent)).filter(Boolean);
    const minPrice = rents.length ? Math.min(...rents) : 0;
    const maxPrice = rents.length ? Math.max(...rents) : 0;

    const canonicalBase = (import.meta.env.VITE_CANONICAL_URL || "https://flexsirent.com").replace(/\/+$/, "");
    return {
      properties,
      cityName: formatSlug(city_slug),
      citySlug: city_slug,
      neighborhoodName: formatSlug(neighborhood_slug),
      neighborhoodSlug: neighborhood_slug,
      stats: {
        count: properties.length,
        minPrice,
        maxPrice
      },
      canonicalUrl: `${canonicalBase}/${lang}/c/${city_slug}/${neighborhood_slug}`
    };
  } catch (error) {
    console.error("Error loading NeighborhoodPage data:", error);
    const canonicalBase = (import.meta.env.VITE_CANONICAL_URL || "https://flexsirent.com").replace(/\/+$/, "");
    return {
      properties: [],
      cityName: formatSlug(city_slug),
      citySlug: city_slug,
      neighborhoodName: formatSlug(neighborhood_slug),
      neighborhoodSlug: neighborhood_slug,
      stats: { count: 0, minPrice: 0, maxPrice: 0 },
      canonicalUrl: `${canonicalBase}/${lang}/c/${city_slug}/${neighborhood_slug}`
    };
  }
}

export function meta({ data, params }) {
  const title = `Furnished Apartments for Rent in ${data?.neighborhoodName || "Neighborhood"}, ${data?.cityName || "City"} | Flexsirent`;
  const description = `Find furnished mid-term apartments and rooms for rent in ${data?.neighborhoodName || "Neighborhood"}, ${data?.cityName || "City"}. Flexible stays of 1 to 12 months with verified hosts.`;
  const canonicalBase = (import.meta.env.VITE_CANONICAL_URL || "https://flexsirent.com").replace(/\/+$/, "");
  const url = data?.canonicalUrl || `${canonicalBase}/en/c/${params.city_slug}/${params.neighborhood_slug}`;

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { tagName: "link", rel: "canonical", href: url }
  ];
}

export default function NeighborhoodPage() {
  const { t } = useTranslation();
  const { properties, cityName, citySlug, neighborhoodName, neighborhoodSlug, stats } = useLoaderData();
  const { lang } = useParams();
  const navigate = useLocalizedNavigate();
  const [activeFaq, setActiveFaq] = useState(null);

  const handleToggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": `${neighborhoodName}, ${cityName}`,
    "description": t("properties_page.hood_banner_sub", { neighborhood: neighborhoodName, city: cityName }),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": neighborhoodName,
      "addressRegion": cityName,
      "addressCountry": citySlug.toLowerCase() === "madrid" || citySlug.toLowerCase() === "barcelona" ? "ES" : "IN"
    }
  };

  const faqData = [
    {
      q: t("properties_page.faq_hood_rent_q", { neighborhood: neighborhoodName }),
      a: stats.count > 0
        ? t("properties_page.faq_hood_rent_a", { avg: ((stats.minPrice + stats.maxPrice) / 2).toFixed(0), min: stats.minPrice, max: stats.maxPrice })
        : t("properties_page.faq_hood_rent_no_stock")
    },
    {
      q: t("properties_page.faq_why_hood_q", { neighborhood: neighborhoodName, city: cityName }),
      a: t("properties_page.faq_why_hood_a", { neighborhood: neighborhoodName, city: cityName })
    },
    {
      q: t("properties_page.faq_online_booking_q"),
      a: t("properties_page.faq_online_booking_a")
    }
  ];

  return (
    <div className="neighborhood-page-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
      <WebHeader />

      {/* Breadcrumbs */}
      <section className="bg-light py-2 border-bottom">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 small">
              <li className="breadcrumb-item">
                <a
                  href={`/${lang}/`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                  className="text-decoration-none text-muted"
                >
                  {t("properties_page.breadcrumbs.home")}
                </a>
              </li>
              <li className="breadcrumb-item">
                <a
                  href={`/${lang}/c/${citySlug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`c/${citySlug}`);
                  }}
                  className="text-decoration-none text-muted"
                >
                  {cityName}
                </a>
              </li>
              <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
                {neighborhoodName}
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Banner */}
      <section className="ct_inner_banner_bg" style={{ paddingBlock: "50px", background: "linear-gradient(rgba(7,21,55,0.75), rgba(7,21,55,0.75)), url('/assets/img/home-bg.png') center/cover" }}>
        <div className="container text-center text-white">
          <h1 className="fw-bold mb-2">{t("properties_page.rentals_in", { neighborhood: neighborhoodName })}</h1>
          <p className="lead max-width-600 mx-auto opacity-90 small">
            {t("properties_page.hood_banner_sub", { neighborhood: neighborhoodName, city: cityName })}
          </p>
          <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
            <span className="badge bg-warning text-dark px-3 py-1 fs-6">{t("properties_page.stays_available", { count: stats.count })}</span>
          </div>
        </div>
      </section>

      {/* Property Grid */}
      <section className="py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-12 text-center text-md-start">
              <h2 className="fw-bold ct_fs_28">{t("properties_page.furnished_stays_in_hood", { neighborhood: neighborhoodName })}</h2>
              <p className="text-muted">{t("properties_page.explore_verified_options")}</p>
            </div>
          </div>
          <div className="row">
            {properties.length > 0 ? (
              properties.map((item, index) => (
                <div className="col-lg-4 col-md-6 mb-4" key={index}>
                  <figure className="ct_apartmen_card ct_apartmen_card_bg d-grid h-100 border rounded-4 overflow-hidden shadow-sm bg-white">
                    <div>
                      <div className="ct_aprtment_img position-relative">
                        <img
                          loading="lazy"
                          src={item?.propertyImage?.length ? item?.propertyImage[0]?.image : "https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_2.png"}
                          alt=""
                          className="w-100 object-fit-cover"
                          style={{ height: "240px" }}
                        />
                      </div>
                      <figcaption className="p-3">
                        <h4 className="ct_fs_16 ct_fw_600 mb-2 text-truncate" title={item?.property_title}>
                          {item?.property_title || "#N/A"}
                        </h4>
                        <p className="ct_fs_14 mb-0 text-muted text-truncate">
                          <i className="fa-solid fa-location-dot me-1 text-warning"></i>
                          {item?.address || "#N/A"}
                        </p>
                        <ul className="d-flex align-items-center gap-3 flex-wrap mt-3 list-unstyled border-top pt-2">
                          <li>
                            <span className="fw-bold text-dark">{item?.bedrooms || 0}</span> <span className="text-muted small">{item?.bedrooms === 1 ? t("properties_page.bed") : t("properties_page.beds")}</span>
                          </li>
                          <li>
                            <span className="fw-bold text-dark">{item?.bathrooms || 0}</span> <span className="text-muted small">{item?.bathrooms === 1 ? t("properties_page.bath") : t("properties_page.baths")}</span>
                          </li>
                          <li>
                            <span className="fw-bold text-dark">{item?.floor || 0}</span> <span className="text-muted small">{t("properties_page.sq_ft")}</span>
                          </li>
                        </ul>
                      </figcaption>
                    </div>
                    <div className="mt-auto p-3 border-top bg-light d-flex align-items-center justify-content-between">
                      <div>
                        <strong className="fs-5 text-dark">€{item?.monthly_rent}</strong>
                        <span className="text-muted small">/{t("table.month")}</span>
                      </div>
                      <a
                        href={`/${lang}/l/${item?.property_id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`l/${item?.property_id}`);
                        }}
                        className="btn btn-warning btn-sm text-white px-3 fw-semibold"
                        style={{ backgroundColor: "#FF8000" }}
                      >
                        {t("properties_page.details")}
                      </a>
                    </div>
                  </figure>
                </div>
              ))
            ) : (
              <div className="col-12 py-5 text-center">
                <NoRecord />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5 bg-light border-top">
        <div className="container" style={{ maxWidth: "800px" }}>
          <h3 className="fw-bold text-center mb-4">{t("properties_page.faq_hood_title", { neighborhood: neighborhoodName })}</h3>
          <div className="accordion shadow-sm rounded-4 overflow-hidden border">
            {faqData.map((faq, idx) => (
              <div key={idx} className="accordion-item bg-white border-bottom">
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button w-100 text-start py-3 px-4 fw-semibold border-0 bg-transparent text-dark d-flex justify-content-between align-items-center`}
                    type="button"
                    onClick={() => handleToggleFaq(idx)}
                    style={{ outline: "none", cursor: "pointer" }}
                  >
                    {faq.q}
                    <i className={`fa-solid fa-chevron-${activeFaq === idx ? "up" : "down"} text-muted ms-2`}></i>
                  </button>
                </h2>
                {activeFaq === idx && (
                  <div className="accordion-body px-4 pb-3 pt-0 text-muted">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <WebFooter />
    </div>
  );
}

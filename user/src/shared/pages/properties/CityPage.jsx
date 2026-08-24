import { useLoaderData, useParams } from "react-router";
import axios from "axios";
import WebHeader from "../../layout/WebHeader";
import WebFooter from "../../layout/WebFooter";
import { BASE_URL, webPropertiesAPI } from "../../../shared/routes/apiURLs";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useTranslation } from "react-i18next";
import { curSym } from "../../utils/pip";
import NoRecord from "../../components/other/NoRecord";
import { useState } from "react";

const NEIGHBORHOODS_MAP = {
  pune: ["koregaon-park", "kalyani-nagar", "viman-nagar", "baner", "hinjewadi"],
  mumbai: ["bandra", "andheri", "juhu", "colaba", "powai"],
  madrid: ["sol", "chueca", "malasana", "retiro", "salamanca"],
  barcelona: ["gracia", "gothic-quarter", "eixample", "el-born", "poblenou"]
};

const formatSlug = (slug) => {
  if (!slug) return "";
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export async function loader({ params, request }) {
  const { city_slug } = params;
  const lang = params.lang || "en";
  const city = city_slug.replace("-", " ").toLowerCase();

  try {
    const res = await axios.get(`${BASE_URL}${webPropertiesAPI}`);
    const allProperties = res.data?.data || [];

    // Filter properties belonging to this city
    const properties = allProperties.filter(p =>
      p.address?.toLowerCase().includes(city) ||
      p.property_title?.toLowerCase().includes(city)
    );

    const rents = properties.map(p => Number(p.monthly_rent)).filter(Boolean);
    const minPrice = rents.length ? Math.min(...rents) : 0;
    const maxPrice = rents.length ? Math.max(...rents) : 0;

    const canonicalBase = (import.meta.env.VITE_CANONICAL_URL || "https://flexsirent.com").replace(/\/+$/, "");
    return {
      properties,
      cityName: formatSlug(city_slug),
      citySlug: city_slug,
      stats: {
        count: properties.length,
        minPrice,
        maxPrice
      },
      canonicalUrl: `${canonicalBase}/${lang}/c/${city_slug}`
    };
  } catch (error) {
    console.error("Error loading CityPage data:", error);
    const canonicalBase = (import.meta.env.VITE_CANONICAL_URL || "https://flexsirent.com").replace(/\/+$/, "");
    return {
      properties: [],
      cityName: formatSlug(city_slug),
      citySlug: city_slug,
      stats: { count: 0, minPrice: 0, maxPrice: 0 },
      canonicalUrl: `${canonicalBase}/${lang}/c/${city_slug}`
    };
  }
}

export function meta({ data, params }) {
  const title = `Furnished Apartments & Mid-Term Rentals in ${data?.cityName || "City"} | Flexsirent`;
  const description = `Book flexible mid-term rentals, rooms, and fully furnished apartments in ${data?.cityName || "City"}. Rent from 1 to 12 months directly from verified hosts.`;
  const canonicalBase = (import.meta.env.VITE_CANONICAL_URL || "https://flexsirent.com").replace(/\/+$/, "");
  const url = data?.canonicalUrl || `${canonicalBase}/en/c/${params.city_slug}`;

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { tagName: "link", rel: "canonical", href: url }
  ];
}

export default function CityPage() {
  const { t } = useTranslation();
  const { properties, cityName, citySlug, stats } = useLoaderData();
  const { lang } = useParams();
  const navigate = useLocalizedNavigate();
  const [activeFaq, setActiveFaq] = useState(null);

  const neighborhoods = NEIGHBORHOODS_MAP[citySlug.toLowerCase()] || [];

  const handleToggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": cityName,
    "description": t("properties_page.furnished_stays_in", { city: cityName }),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityName,
      "addressCountry": citySlug.toLowerCase() === "madrid" || citySlug.toLowerCase() === "barcelona" ? "ES" : "IN"
    }
  };

  const faqData = [
    {
      q: t("properties_page.faq_avg_price_q", { city: cityName }),
      a: stats.count > 0
        ? t("properties_page.faq_avg_price_a", { min: stats.minPrice, max: stats.maxPrice })
        : t("properties_page.faq_avg_price_no_stock")
    },
    {
      q: t("properties_page.faq_duration_q", { city: cityName }),
      a: t("properties_page.faq_duration_a")
    },
    {
      q: t("properties_page.faq_verified_q"),
      a: t("properties_page.faq_verified_a")
    }
  ];

  return (
    <div className="city-page-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
      <WebHeader />

      {/* Banner */}
      <section className="ct_inner_banner_bg" style={{ paddingBlock: "60px", background: "linear-gradient(rgba(7,21,55,0.7), rgba(7,21,55,0.7)), url('/assets/img/home-bg.png') center/cover" }}>
        <div className="container text-center text-white">
          <h1 className="display-4 fw-bold mb-3">{t("properties_page.furnished_stays_in", { city: cityName })}</h1>
          <p className="lead max-width-600 mx-auto opacity-90">
            {t("properties_page.city_banner_sub", { city: cityName })}
          </p>
          <div className="d-flex justify-content-center gap-4 mt-4 flex-wrap">
            <span className="badge bg-warning text-dark px-3 py-2 fs-6">{stats.count} {t("properties_page.verified_properties")}</span>
            <span className="badge bg-light text-dark px-3 py-2 fs-6">{t("properties_page.from_rent")} €{stats.minPrice}/{t("table.month")}</span>
          </div>
        </div>
      </section>

      {/* Neighborhood Link Hub */}
      {neighborhoods.length > 0 && (
        <section className="py-4 bg-light border-bottom">
          <div className="container text-center">
            <h5 className="fw-semibold text-muted mb-3 text-uppercase ct_fs_14">{t("properties_page.explore_areas")}</h5>
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              {neighborhoods.map((n) => (
                <a
                  key={n}
                  href={`/${lang}/c/${citySlug}/${n}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`c/${citySlug}/${n}`);
                  }}
                  className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1 bg-white text-dark border"
                >
                  {formatSlug(n)}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Property Grid */}
      <section className="py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-12 text-center text-md-start">
              <h2 className="fw-bold ct_fs_28">{t("properties_page.available_rentals", { city: cityName })}</h2>
              <p className="text-muted">{t("properties_page.showing_stays", { count: stats.count })}</p>
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
                        <strong className="fs-5 text-dark">{curSym}{item?.monthly_rent}</strong>
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
          <h3 className="fw-bold text-center mb-4">{t("properties_page.faq_title")}</h3>
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

import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";
import axios from "axios";
import WebHeader from "../layout/WebHeader";
import WebFooter from "../layout/WebFooter";
import { BASE_URL, seoBySlugAPI } from "../../shared/routes/apiURLs";

export async function loader({ params }) {
  const slug = params.slug || "marketing-default";
  try {
    const seoRes = await axios.get(`${BASE_URL}${seoBySlugAPI}${slug}`).catch(() => null);
    return {
      slug,
      seoData: seoRes?.data?.data || null,
      pageData: {
        hero: {
          title: "Elevate Your Stays with Flexsirent",
          subtitle: "Premium room and apartment mid-term rentals tailored for students, professionals, and digital nomads.",
          ctaText: "Explore Properties",
          ctaLink: "/en/properties",
          secondaryCtaText: "Become a Host",
          secondaryCtaLink: "/en/become-a-host"
        },
        features: [
          {
            icon: "fa-shield-halved",
            title: "Verified Spaces",
            description: "Every listing is manually verified for security, cleanliness, and accuracy."
          },
          {
            icon: "fa-credit-card",
            title: "Secure Payments",
            description: "Rent deposit and booking fee operations are secured through standard Stripe channels."
          },
          {
            icon: "fa-clock",
            title: "Flexible Stay Durations",
            description: "Seamlessly choose stays from 1 month upwards with zero complex rental contracts."
          }
        ],
        contentBlocks: [
          {
            title: "Why Nomads Choose Us",
            text: "<p>We bridge the gap between expensive hotel stays and high-friction residential rentals. Our properties are fully furnished, equipped with high-speed internet, and set up in prime metropolitan locations so you can hit the ground running.</p><p>Browse our verified list of flats, coordinate check-in details entirely online, and secure bookings in minutes.</p>"
          }
        ],
        faqs: [
          {
            question: "How long can I book a property for?",
            answer: "Our rentals specialize in mid-term stays. You can book starting from 1 month to multiple months, with flexible monthly extensions."
          },
          {
            question: "Are utility bills included in the monthly price?",
            answer: "Most listings clarify utility packages inside the pricing card. Refer to each property's specific rent details to see if water, gas, and electricity are bundled."
          }
        ]
      }
    };
  } catch (error) {
    return { slug, seoData: null, pageData: null };
  }
}

export function meta({ data, params }) {
  const lang = params.lang || "en";
  const slug = params.slug || "marketing";
  const canonicalBase = (import.meta.env.VITE_CANONICAL_URL || "https://flexsirent.com").replace(/\/+$/, "");
  const url = `${canonicalBase}/${lang}/marketing/${slug}`;
  const seo = data?.seoData;
  const title = seo?.meta_title || "Modern Living Solutions | Flexsirent";
  const description = seo?.meta_description || "Discover verified mid-term apartments and flexible rentals for students and remote professionals.";

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { tagName: "link", rel: "canonical", href: url }
  ];
}

const LandingTemplate = () => {
  const { t } = useTranslation();
  const { pageData } = useLoaderData();
  const hero = pageData?.hero;
  const features = pageData?.features || [];
  const contentBlocks = pageData?.contentBlocks || [];
  const faqs = pageData?.faqs || [];

  return (
    <div className="landing-template-wrapper" style={{ backgroundColor: "#F9FBFC" }}>
      <WebHeader />

      {/* Hero Section */}
      <section
        className="py-5 text-white"
        style={{
          background: "linear-gradient(135deg, #071537 0%, #1a3263 100%)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-3 ct_ff_Agrandir_bold" style={{ color: "#FFF", lineHeight: "1.2" }}>
                {hero?.title}
              </h1>
              <p className="lead mb-4 ct_font_poppins" style={{ opacity: 0.9, fontSize: "1.1rem" }}>
                {hero?.subtitle}
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a
                  href={hero?.ctaLink}
                  className="btn btn-lg px-4 py-2"
                  style={{
                    backgroundColor: "#FF7F00",
                    borderColor: "#FF7F00",
                    color: "#FFF",
                    borderRadius: "8px",
                    fontWeight: "600",
                    transition: "transform 0.2s ease"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  {hero?.ctaText}
                </a>
                <a
                  href={hero?.secondaryCtaLink}
                  className="btn btn-lg px-4 py-2 border-white"
                  style={{
                    color: "#FFF",
                    borderRadius: "8px",
                    fontWeight: "600",
                    transition: "transform 0.2s ease"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  {hero?.secondaryCtaText}
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src="https://app.flexsirent.com/assets/img/become-host-side.png"
                alt="Banner Graphic"
                className="img-fluid rounded-4 shadow-lg w-100 object-fit-cover"
                style={{ maxHeight: "400px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      {features.length > 0 && (
        <section className="py-5" style={{ backgroundColor: "#FFF" }}>
          <div className="container py-4">
            <div className="row justify-content-center mb-5">
              <div className="col-lg-8 text-center">
                <h2 className="ct_fs_35 ct_fw_700 ct_dark_blue_text">{t("landing.key_offerings")}</h2>
                <div style={{ width: "60px", height: "4px", backgroundColor: "#FF7F00", margin: "15px auto 0" }}></div>
              </div>
            </div>
            <div className="row g-4">
              {features.map((feat, idx) => (
                <div className="col-md-4" key={idx}>
                  <div
                    className="p-4 h-100 rounded-3 text-center border-0"
                    style={{
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.05)",
                      transition: "transform 0.3s ease",
                      backgroundColor: "#F9FBFC"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    <div
                      className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                      style={{ width: "60px", height: "60px", backgroundColor: "#EFF4EC" }}
                    >
                      <i className={`fa-solid ${feat.icon} fa-xl`} style={{ color: "#20B015" }}></i>
                    </div>
                    <h4 className="ct_fs_18 ct_fw_600 mb-2 ct_dark_blue_text">{feat.title}</h4>
                    <p className="ct_text_707070 ct_fs_14 mb-0">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Content Blocks */}
      {contentBlocks.length > 0 && (
        <section className="py-5">
          <div className="container py-3">
            {contentBlocks.map((block, idx) => (
              <div className="row justify-content-center" key={idx}>
                <div className="col-lg-10">
                  <div className="bg-white p-5 rounded-4 shadow-sm">
                    <h3 className="ct_fs_28 ct_fw_700 ct_dark_blue_text mb-4">{block.title}</h3>
                    <div
                      className="ct_text_707070 ct_font_poppins"
                      style={{ fontSize: "1.05rem", lineHeight: "1.7" }}
                      dangerouslySetInnerHTML={{ __html: block.text }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="py-5 mb-5" style={{ backgroundColor: "#FFF" }}>
          <div className="container py-3">
            <div className="row justify-content-center mb-4">
              <div className="col-lg-8 text-center">
                <h3 className="ct_fs_30 ct_fw_700 ct_dark_blue_text">{t("landing.faq_title")}</h3>
                <div style={{ width: "50px", height: "3px", backgroundColor: "#FF7F00", margin: "12px auto 0" }}></div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="accordion accordion-flush" id="landingFaqAccordion">
                  {faqs.map((faq, idx) => (
                    <div className="accordion-item border-0 py-2 border-bottom" key={idx}>
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed px-0 py-3 ct_fw_600 ct_dark_blue_text"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#landing-faq-${idx}`}
                          aria-expanded="false"
                          aria-controls={`landing-faq-${idx}`}
                          style={{ fontSize: "1rem" }}
                        >
                          {faq.question}
                        </button>
                      </h2>
                      <div
                        id={`landing-faq-${idx}`}
                        className="accordion-collapse collapse"
                        data-bs-parent="#landingFaqAccordion"
                      >
                        <div className="accordion-body px-0 pt-1 pb-3 ct_text_707070">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <WebFooter />
    </div>
  );
};

export default LandingTemplate;

import { useEffect } from "react";
import WebHeader from "../layout/WebHeader";
import WebFooter from "../layout/WebFooter";
import WebSubHeader from "../layout/WebSubHeader";
import HelpBy from "../components/pages/help/HelpBy";
import AIBar from "@/components/AIBar";
import ContactUs from "../components/pages/help/ContactUs";
import { useLoaderData } from "react-router";
import axios from "axios";
import { BASE_URL, seoBySlugAPI } from "../routes/apiURLs";
import { useTranslation } from "react-i18next";

export async function loader() {
  try {
    const seoRes = await axios.get(`${BASE_URL}${seoBySlugAPI}help`).catch(() => null);
    return {
      seoData: seoRes?.data?.data || null,
    };
  } catch (error) {
    return { seoData: null };
  }
}

const FAQ_ITEMS = [
  {
    id: "One",
    question: "How does mid-term renting work on Flexsirent?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "Two",
    question: "What is the minimum and maximum stay duration?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "Three",
    question: "How can I modify or cancel my booking?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "Four",
    question: "What payment methods do you accept?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "Five",
    question: "Is my payment information secure?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "Six",
    question: "Do you offer support if I have an issue during my stay?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }
];

export function meta({ data, params }) {
  const lang = params.lang || "en";
  const url = `https://flexsirent.com/${lang}/help`;
  const seo = data?.seoData;
  const title = seo?.meta_title || "Help & FAQ | Flexsirent";
  const description = seo?.meta_description || "Find answers to frequently asked questions about booking, renting, payments, and hosting on Flexsirent.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { tagName: "link", rel: "canonical", href: url },
    { "script:ld+json": jsonLd }
  ];
}

const Help = () => {
  const { t } = useTranslation();
  useEffect(() => {
    // No-op for initial load; data is loaded via server loader
  }, []);

  return (
    <>
      {/* Header Section S */}
      <WebHeader />
      <div
        style={{
          backgroundImage: "url('/assets/img/help-banner.png')",
          backgroundColor: "#fcf9f9cc"
        }}
        className="bg_fit_contain h-100 bg-no-repeat"
      >
        <div className="container pt-5">
          <div
            style={{
              backgroundImage: "url('/assets/img/help-subbaner.png')"
            }}
            className=" h-100  p-4 ct_custom_box_shodow ct_border_radius_10"
          >
            <div className="row">
              <div className="col-lg-6">
                <h3>{t("help_page.header_title")}</h3>
                <p>{t("help_page.header_desc")}</p>
                <div className="cti_custom_input_search position-relative ct_mt_35">
                  <i className="fa-solid fa-magnifying-glass ct_input_icon_left"></i>
                  <input className="form-control ps-5 ct_box_shadow_52688C2B ct_h_50" placeholder={t("help_page.search_placeholder")} />
                </div>
              </div>
            </div>
          </div>
          <div className="my-4">
            <h3 className="ct_font_poppins ct_fs_20 ct_fw_500 ct_dark_blue_text py-3">{t("help_page.browse_title")}</h3>
            <div className="row">
              <div className="col-xl-2 col-sm-4  mb-3">
                <div className="bg-white ct_p_12 ct_custom_box_shodow ct_border_radius_10 h-100 help-card">
                  <div className="help-card-desc">
                    <div className="ct_mb_12">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.0156 10.1461L12.7068 1.582C12.4042 1.30359 12.0056 1.15292 11.5945 1.16148C11.1834 1.17004 10.7915 1.33717 10.5008 1.62794L1.93936 10.1894L1.5 10.6287V23.25H9.75V15.375H14.25V23.25H22.5V10.5918L22.0156 10.1461ZM11.6268 2.66116C11.64 2.66116 11.6318 2.66402 11.6262 2.6696C11.6203 2.66402 11.6136 2.66116 11.6268 2.66116ZM21 21.75H15.75V15.375C15.75 14.9772 15.592 14.5957 15.3107 14.3144C15.0294 14.0331 14.6478 13.875 14.25 13.875H9.75C9.35218 13.875 8.97064 14.0331 8.68934 14.3144C8.40804 14.5957 8.25 14.9772 8.25 15.375V21.75H3V11.25L11.6268 2.68858C11.6274 2.68802 11.6274 2.6875 11.6279 2.68694L21 11.25V21.75Z" fill="#20B015" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="ct_font_poppins ct_fs_16 ct_fw_500 ct_dark_blue_text">{t("help_page.card_getting_started_title")}</h5>
                      <p className="ct_text_707070 ct_fs_12 ct_fw_400">{t("help_page.card_getting_started_desc")}</p>
                    </div>
                  </div>
                  <a href="#" className="text-end d-block mt-auto">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.33366 10H16.667M11.667 5L16.667 10L11.667 15" stroke="#20B015" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="col-xl-2 col-sm-4  mb-3">
                <div className="bg-white ct_p_12 ct_custom_box_shodow ct_border_radius_10 h-100 help-card">
                  <div className="help-card-desc">
                    <div className="ct_mb_12">
                      <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.49928 1.91687e-08C7.14387 0.000115492 5.80814 0.324364 4.60353 0.945694C3.39893 1.56702 2.36037 2.46742 1.57451 3.57175C0.788656 4.67609 0.278287 5.95235 0.0859852 7.29404C-0.106316 8.63574 0.0250263 10.004 0.469055 11.2846C0.913084 12.5652 1.65692 13.7211 2.63851 14.6557C3.6201 15.5904 4.81098 16.2768 6.11179 16.6576C7.4126 17.0384 8.78562 17.1026 10.1163 16.8449C11.447 16.5872 12.6967 16.015 13.7613 15.176L17.4133 18.828C17.6019 19.0102 17.8545 19.111 18.1167 19.1087C18.3789 19.1064 18.6297 19.0012 18.8151 18.8158C19.0005 18.6304 19.1057 18.3796 19.108 18.1174C19.1102 17.8552 19.0094 17.6026 18.8273 17.414L15.1753 13.762C16.1633 12.5086 16.7784 11.0024 16.9504 9.41573C17.1223 7.82905 16.8441 6.22602 16.1475 4.79009C15.4509 3.35417 14.3642 2.14336 13.0116 1.29623C11.659 0.449106 10.0952 -0.000107143 8.49928 1.91687e-08ZM1.99928 8.5C1.99928 6.77609 2.6841 5.12279 3.90308 3.90381C5.12207 2.68482 6.77537 2 8.49928 2C10.2232 2 11.8765 2.68482 13.0955 3.90381C14.3145 5.12279 14.9993 6.77609 14.9993 8.5C14.9993 10.2239 14.3145 11.8772 13.0955 13.0962C11.8765 14.3152 10.2232 15 8.49928 15C6.77537 15 5.12207 14.3152 3.90308 13.0962C2.6841 11.8772 1.99928 10.2239 1.99928 8.5Z" fill="#20B015" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="ct_font_poppins ct_fs_16 ct_fw_500 ct_dark_blue_text">{t("help_page.card_search_title")}</h5>
                      <p className="ct_text_707070 ct_fs_12 ct_fw_400">{t("help_page.card_search_desc")}</p>
                    </div>
                  </div>
                  <a href="#" className="text-end d-block mt-auto">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.33366 10H16.667M11.667 5L16.667 10L11.667 15" stroke="#20B015" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="col-xl-2 col-sm-4  mb-3">
                <div className="bg-white ct_p_12 ct_custom_box_shodow ct_border_radius_10 h-100 help-card">
                  <div className="help-card-desc">
                    <div className="ct_mb_12">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 7.125C1.5 6.22989 1.85558 5.37145 2.48851 4.73851C3.12145 4.10558 3.97989 3.75 4.875 3.75H19.125C20.0201 3.75 20.8785 4.10558 21.5115 4.73851C22.1444 5.37145 22.5 6.22989 22.5 7.125V16.875C22.5 17.7701 22.1444 18.6285 21.5115 19.2615C20.8785 19.8944 20.0201 20.25 19.125 20.25H4.875C3.97989 20.25 3.12145 19.8944 2.48851 19.2615C1.85558 18.6285 1.5 17.7701 1.5 16.875V7.125ZM4.875 5.25C4.37772 5.25 3.90081 5.44754 3.54917 5.79917C3.19754 6.15081 3 6.62772 3 7.125V8.25H21V7.125C21 6.62772 20.8025 6.15081 20.4508 5.79917C20.0992 5.44754 19.6223 5.25 19.125 5.25H4.875ZM3 16.875C3 17.3723 3.19754 17.8492 3.54917 18.2008C3.90081 18.5525 4.37772 18.75 4.875 18.75H19.125C19.6223 18.75 20.0992 18.5525 20.4508 18.2008C20.8025 17.8492 21 17.3723 21 16.875V9.75H3V16.875ZM15.75 14.25H18C18.1989 14.25 18.3897 14.329 18.5303 14.4697C18.671 14.6103 18.75 14.8011 18.75 15C18.75 15.1989 18.671 15.3897 18.5303 15.5303C18.3897 15.671 18.1989 15.75 18 15.75H15.75C15.5511 15.75 15.3603 15.671 15.2197 15.5303C15.079 15.3897 15 15.1989 15 15C15 14.8011 15.079 14.6103 15.2197 14.4697C15.3603 14.329 15.5511 14.25 15.75 14.25Z" fill="#20B015" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="ct_font_poppins ct_fs_16 ct_fw_500 ct_dark_blue_text">{t("help_page.card_payments_title")}</h5>
                      <p className="ct_text_707070 ct_fs_12 ct_fw_400">{t("help_page.card_payments_desc")}</p>
                    </div>
                  </div>
                  <a href="#" className="text-end d-block mt-auto">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.33366 10H16.667M11.667 5L16.667 10L11.667 15" stroke="#20B015" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="col-xl-2 col-sm-4  mb-3">
                <div className="bg-white ct_p_12 ct_custom_box_shodow ct_border_radius_10 h-100 help-card">
                  <div className="help-card-desc">
                    <div className="ct_mb_12">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2113_5030)">
                          <path d="M6.8076 0C7.03038 0 7.24404 0.0884998 7.40157 0.24603C7.5591 0.403561 7.6476 0.617218 7.6476 0.84V2.4108H16.668V0.8508C16.668 0.628018 16.7565 0.414361 16.914 0.25683C17.0716 0.0992998 17.2852 0.0108 17.508 0.0108C17.7308 0.0108 17.9444 0.0992998 18.102 0.25683C18.2595 0.414361 18.348 0.628018 18.348 0.8508V2.4108H21.6C22.2363 2.4108 22.8466 2.66349 23.2966 3.11332C23.7467 3.56315 23.9997 4.17329 24 4.8096V21.6012C23.9997 22.2375 23.7467 22.8477 23.2966 23.2975C22.8466 23.7473 22.2363 24 21.6 24H2.4C1.76369 24 1.15342 23.7473 0.703368 23.2975C0.253315 22.8477 0.000318156 22.2375 0 21.6012L0 4.8096C0.000318156 4.17329 0.253315 3.56315 0.703368 3.11332C1.15342 2.66349 1.76369 2.4108 2.4 2.4108H5.9676V0.8388C5.96792 0.616226 6.05656 0.402877 6.21405 0.245606C6.37155 0.0883348 6.58503 -2.27116e-07 6.8076 0ZM1.68 9.2904V21.6012C1.68 21.6958 1.69862 21.7894 1.73481 21.8767C1.77099 21.9641 1.82403 22.0435 1.89088 22.1103C1.95774 22.1772 2.03711 22.2302 2.12447 22.2664C2.21182 22.3026 2.30545 22.3212 2.4 22.3212H21.6C21.6946 22.3212 21.7882 22.3026 21.8755 22.2664C21.9629 22.2302 22.0423 22.1772 22.1091 22.1103C22.176 22.0435 22.229 21.9641 22.2652 21.8767C22.3014 21.7894 22.32 21.6958 22.32 21.6012V9.3072L1.68 9.2904ZM8.0004 17.5428V19.542H6V17.5428H8.0004ZM12.9996 17.5428V19.542H11.0004V17.5428H12.9996ZM18 17.5428V19.542H15.9996V17.5428H18ZM8.0004 12.7704V14.7696H6V12.7704H8.0004ZM12.9996 12.7704V14.7696H11.0004V12.7704H12.9996ZM18 12.7704V14.7696H15.9996V12.7704H18ZM5.9676 4.0896H2.4C2.30545 4.0896 2.21182 4.10822 2.12447 4.14441C2.03711 4.18059 1.95774 4.23362 1.89088 4.30048C1.82403 4.36734 1.77099 4.44671 1.73481 4.53407C1.69862 4.62142 1.68 4.71505 1.68 4.8096V7.6116L22.32 7.6284V4.8096C22.32 4.71505 22.3014 4.62142 22.2652 4.53407C22.229 4.44671 22.176 4.36734 22.1091 4.30048C22.0423 4.23362 21.9629 4.18059 21.8755 4.14441C21.7882 4.10822 21.6946 4.0896 21.6 4.0896H18.348V5.2044C18.348 5.42718 18.2595 5.64084 18.102 5.79837C17.9444 5.9559 17.7308 6.0444 17.508 6.0444C17.2852 6.0444 17.0716 5.9559 16.914 5.79837C16.7565 5.64084 16.668 5.42718 16.668 5.2044V4.0896H7.6476V5.1936C7.6476 5.41638 7.5591 5.63004 7.40157 5.78757C7.24404 5.9451 7.03038 6.0336 6.8076 6.0336C6.58482 6.0336 6.37116 5.9451 6.21363 5.78757C6.0561 5.63004 5.9676 5.41638 5.9676 5.1936V4.0896Z" fill="#20B015" />
                        </g>
                        <defs>
                          <clipPath id="clip0_2113_5030">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div>
                      <h5 className="ct_font_poppins ct_fs_16 ct_fw_500 ct_dark_blue_text">{t("help_page.card_bookings_title")}</h5>
                      <p className="ct_text_707070 ct_fs_12 ct_fw_400">{t("help_page.card_bookings_desc")}</p>
                    </div>
                  </div>
                  <a href="#" className="text-end d-block mt-auto">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.33366 10H16.667M11.667 5L16.667 10L11.667 15" stroke="#20B015" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="col-xl-2 col-sm-4  mb-3">
                <div className="bg-white ct_p_12 ct_custom_box_shodow ct_border_radius_10 h-100 help-card">
                  <div className="help-card-desc">
                    <div className="ct_mb_12">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM7.07 18.28C7.5 17.38 10.12 16.5 12 16.5C13.88 16.5 16.5 17.38 16.93 18.28C15.5291 19.3955 13.7908 20.002 12 20C10.14 20 8.43 19.36 7.07 18.28ZM18.36 16.83C16.93 15.09 13.46 14.5 12 14.5C10.54 14.5 7.07 15.09 5.64 16.83C4.57632 15.4446 3.99982 13.7467 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 13.82 19.38 15.5 18.36 16.83ZM12 6C10.06 6 8.5 7.56 8.5 9.5C8.5 11.44 10.06 13 12 13C13.94 13 15.5 11.44 15.5 9.5C15.5 7.56 13.94 6 12 6ZM12 11C11.6022 11 11.2206 10.842 10.9393 10.5607C10.658 10.2794 10.5 9.89782 10.5 9.5C10.5 9.10218 10.658 8.72064 10.9393 8.43934C11.2206 8.15804 11.6022 8 12 8C12.3978 8 12.7794 8.15804 13.0607 8.43934C13.342 8.72064 13.5 9.10218 13.5 9.5C13.5 9.89782 13.342 10.2794 13.0607 10.5607C12.7794 10.842 12.3978 11 12 11Z" fill="#20B015" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="ct_font_poppins ct_fs_16 ct_fw_500 ct_dark_blue_text">{t("help_page.card_account_title")}</h5>
                      <p className="ct_text_707070 ct_fs_12 ct_fw_400">{t("help_page.card_account_desc")}</p>
                    </div>
                  </div>
                  <a href="#" className="text-end d-block mt-auto">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.33366 10H16.667M11.667 5L16.667 10L11.667 15" stroke="#20B015" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="col-xl-2 col-sm-4  mb-3">
                <div className="bg-white ct_p_12 ct_custom_box_shodow ct_border_radius_10 h-100 help-card">
                  <div className="help-card-desc">
                    <div className="ct_mb_12">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1.5L3 4.5V13.5C3 18.4711 7.02891 22.5 12 22.5C16.9711 22.5 21 18.4711 21 13.5V4.5L12 1.5ZM19.3125 13.5C19.3125 17.5383 16.0383 20.8125 12 20.8125C7.96172 20.8125 4.6875 17.5383 4.6875 13.5V5.76562L12 3.1875L19.3125 5.76562V13.5Z" fill="#20B015" />
                        <path d="M8.86857 11.1352C8.79037 11.0566 8.69742 10.9943 8.59505 10.9517C8.49269 10.9092 8.38294 10.8873 8.27209 10.8873C8.16124 10.8873 8.05148 10.9092 7.94912 10.9517C7.84676 10.9943 7.75381 11.0566 7.6756 11.1352C7.59704 11.2134 7.5347 11.3063 7.49217 11.4087C7.44963 11.511 7.42773 11.6208 7.42773 11.7316C7.42773 11.8425 7.44963 11.9522 7.49217 12.0546C7.5347 12.157 7.59704 12.2499 7.6756 12.3281L10.7084 15.3609L10.7576 15.4102C10.8316 15.4843 10.9195 15.5431 11.0162 15.5832C11.1129 15.6233 11.2166 15.6439 11.3213 15.6439C11.426 15.6439 11.5297 15.6233 11.6264 15.5832C11.7231 15.5431 11.811 15.4843 11.885 15.4102L17.1233 10.1719C17.1974 10.0979 17.2562 10.01 17.2963 9.91332C17.3364 9.8166 17.357 9.71292 17.357 9.6082C17.357 9.50349 17.3364 9.39981 17.2963 9.30309C17.2562 9.20637 17.1974 9.1185 17.1233 9.04453L17.0576 8.97891C16.9837 8.9048 16.8958 8.846 16.7991 8.80588C16.7024 8.76577 16.5987 8.74512 16.494 8.74512C16.3893 8.74512 16.2856 8.76577 16.1888 8.80588C16.0921 8.846 16.0043 8.9048 15.9303 8.97891L11.3201 13.5867L8.86857 11.1352Z" fill="#20B015" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="ct_font_poppins ct_fs_16 ct_fw_500 ct_dark_blue_text">{t("help_page.card_safety_title")}</h5>
                      <p className="ct_text_707070 ct_fs_12 ct_fw_400">{t("help_page.card_safety_desc")}</p>
                    </div>
                  </div>
                  <a href="#" className="text-end d-block mt-auto">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.33366 10H16.667M11.667 5L16.667 10L11.667 15" stroke="#20B015" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row ct_mb_32">
            <div className="col-lg-5 mb-3">
              <div className="bg-white h-100 p-sm-4 p-3 ct_custom_box_shodow ct_border_radius_20">
                <h3 className="ct_font_poppins ct_fs_20 ct_fw_500 ct_dark_blue_text mb-0">{t("help_page.still_need_help")}</h3>
                <p className="ct_text_707070 ct_fs_14 ct_fw_400">{t("help_page.support_available")}</p>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <div className="help-icon-box">
                      <img src="/assets/img/chat-icon.png" />
                    </div>
                    <div>
                      <h4 className="ct_font_poppins ct_fs_14 ct_fw_500 ct_dark_blue_text mb-0">{t("help_page.live_chat")}</h4>
                      <p className="ct_text_707070 ct_fs_12 ct_fw_400 mb-0">{t("help_page.live_chat_desc")}</p>
                    </div>
                  </div>
                  <div>
                    <a href="#" className="help-det-btn">
                      {t("help_page.start_chat")}
                    </a>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <div className="help-icon-box">
                      <img src="/assets/img/chat-icon.png" />
                    </div>
                    <div>
                      <h4 className="ct_font_poppins ct_fs_14 ct_fw_500 ct_dark_blue_text mb-0">{t("help_page.email_us")}</h4>
                      <p className="ct_text_707070 ct_fs_12 ct_fw_400 mb-0">support@flexsirent.com</p>
                    </div>
                  </div>
                  <div>
                    <a href="#" className="help-det-btn">
                      {t("help_page.send_email")}
                    </a>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <div className="help-icon-box">
                      <img src="/assets/img/chat-icon.png" />
                    </div>
                    <div>
                      <h4 className="ct_font_poppins ct_fs_14 ct_fw_500 ct_dark_blue_text mb-0">{t("help_page.call_us")}</h4>
                      <p className="ct_text_707070 ct_fs_12 ct_fw_400 mb-0">+34 900 123 456</p>
                    </div>
                  </div>
                  <div>
                    <a href="#" className="help-det-btn">
                      {t("help_page.call_now")}
                    </a>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-0 ct_bg_EFF4EC p-2 ct_border_radius_8">
                  <div className="d-flex align-items-center gap-2">
                    <div className="">
                      <img src="/assets/img/chat-icon.png" />
                    </div>
                    <div>
                      <h4 className="ct_font_poppins ct_fs_14 ct_fw_500 ct_dark_blue_text mb-0">{t("help_page.response_time")}</h4>
                      <p className="ct_text_707070 ct_fs_12 ct_fw_400 mb-0">{t("help_page.available_247")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 mb-3">
              <ContactUs />
            </div>
          </div>
          <div className="h-100 bg-white p-4 ct_custom_box_shodow ct_border_radius_20">
            <h3 className="ct_font_poppins ct_fs_20 ct_fw_500 ct_dark_blue_text mb-3">{t("help_page.popular_questions")}</h3>
            <div className=" ct_faq_question_main eti_faq_green">
              <div className="accordion accordion-flush" id="accordionFlushExample">
                {FAQ_ITEMS.map((item) => (
                  <div className="accordion-item border-0" key={item.id}>
                    <h2 className="accordion-header border-0">
                      <button
                        className="accordion-button collapsed ps-3 pe-5 ct_text_707070 ct_fs_14 ct_fw_500 ct_font_poppins px-0 border-0 py-3"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#flush-collapse${item.id}`}
                        aria-expanded="false"
                        aria-controls={`flush-collapse${item.id}`}
                      >
                        {item.question}
                      </button>
                    </h2>
                    <div
                      id={`flush-collapse${item.id}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <div className="ct_custom_sticky_sec" onClick={() => document.getElementById("ai-bar-section")?.scrollIntoView({ behavior: "smooth" })}>
            <div>
              <svg width="36" height="36" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.6247 10.6039C20.3018 7.29136 18.3434 2.08301 12.2914 2.08301C6.23928 2.08301 4.28093 7.29136 3.95803 10.6039C2.82522 11.0338 2.078 12.1214 2.08303 13.333V14.7914C2.08303 16.4022 3.38889 17.708 4.99968 17.708C6.61052 17.708 7.91638 16.4021 7.91638 14.7914V13.333C7.91111 12.1475 7.19138 11.0823 6.09343 10.6351C6.30178 8.71841 7.32263 4.16636 12.2914 4.16636C17.2601 4.16636 18.2705 8.71841 18.4789 10.6351C17.3832 11.0833 16.6671 12.1492 16.6664 13.333V14.7914C16.6686 15.3402 16.8251 15.8773 17.118 16.3414C17.4108 16.8056 17.8282 17.1781 18.3226 17.4164C17.8851 18.2393 16.7705 19.3539 14.0309 19.6872C13.4833 18.8556 12.4238 18.5278 11.5022 18.9048C10.5807 19.2817 10.0547 20.2582 10.2469 21.2351C10.439 22.2121 11.2957 22.9164 12.2914 22.9164C12.6772 22.9142 13.0548 22.805 13.3822 22.6008C13.7096 22.3967 13.9738 22.1056 14.1455 21.7601C18.6143 21.2497 20.0414 18.9476 20.4893 17.5934C21.7011 17.2009 22.516 16.065 22.4997 14.7914V13.333C22.5047 12.1214 21.7575 11.0338 20.6247 10.6039ZM5.83303 14.7914C5.83303 15.2516 5.45994 15.6247 4.99968 15.6247C4.53943 15.6247 4.16638 15.2516 4.16638 14.7914V13.333C4.16554 13.223 4.18647 13.114 4.22798 13.0121C4.26948 12.9103 4.33072 12.8177 4.40819 12.7396C4.48565 12.6616 4.5778 12.5996 4.67933 12.5573C4.78085 12.515 4.88973 12.4933 4.99971 12.4933C5.10968 12.4933 5.21857 12.515 5.32009 12.5573C5.42161 12.5996 5.51376 12.6616 5.59123 12.7396C5.66869 12.8177 5.72994 12.9103 5.77144 13.0121C5.81294 13.114 5.83388 13.223 5.83303 13.333V14.7914ZM18.7497 13.333C18.7497 12.8728 19.1228 12.4997 19.583 12.4997C20.0433 12.4997 20.4164 12.8728 20.4164 13.333V14.7914C20.4164 15.2516 20.0433 15.6247 19.583 15.6247C19.1228 15.6247 18.7497 15.2516 18.7497 14.7914V13.333Z" fill="#ff7f00"></path></svg>
            </div>
          </div> */}
          <section className="my-5 pb-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <AIBar />
                  <div className="d-flex flex-wrap gap-4 justify-content-center ct_mt_35">
                    <div>
                      <div className="d-flex gap-1 align-items-center">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.75 10.3688L7.13125 8.75L6.25 9.63125L8.75 12.1313L13.75 7.13125L12.8688 6.25L8.75 10.3688Z" fill="#20B015" />
                          <path d="M10 18.75L6.14 16.6919C5.0395 16.1066 4.11919 15.2325 3.4779 14.1637C2.83661 13.0948 2.49854 11.8715 2.5 10.625V2.5C2.5 2.16848 2.6317 1.85054 2.86612 1.61612C3.10054 1.3817 3.41848 1.25 3.75 1.25H16.25C16.5815 1.25 16.8995 1.3817 17.1339 1.61612C17.3683 1.85054 17.5 2.16848 17.5 2.5V10.625C17.5015 11.8715 17.1634 13.0948 16.5221 14.1637C15.8808 15.2325 14.9605 16.1066 13.86 16.6919L10 18.75ZM3.75 2.5V10.625C3.74931 11.6448 4.02618 12.6456 4.55093 13.52C5.07568 14.3945 5.82853 15.1096 6.72875 15.5887L10 17.3331L13.2713 15.5894C14.1716 15.1102 14.9245 14.3949 15.4492 13.5204C15.974 12.6458 16.2508 11.6449 16.25 10.625V2.5H3.75Z" fill="#20B015" />
                        </svg>
                        <span className="ct_text_707070 ct_fs_15">{t("ai_discovery_banner.verified_properties")}</span>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex gap-1 align-items-center">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.66699 9.99967C1.66699 6.85717 1.66699 5.28551 2.64366 4.30967C3.62033 3.33384 5.19116 3.33301 8.33366 3.33301H11.667C14.8095 3.33301 16.3812 3.33301 17.357 4.30967C18.3328 5.28634 18.3337 6.85717 18.3337 9.99967V11.6663C18.3337 14.8088 18.3337 16.3805 17.357 17.3563C16.3803 18.3322 14.8095 18.333 11.667 18.333H8.33366C5.19116 18.333 3.61949 18.333 2.64366 17.3563C1.66783 16.3797 1.66699 14.8088 1.66699 11.6663V9.99967Z" stroke="#20B015" />
                          <path d="M5.83398 3.33301V2.08301M14.1673 3.33301V2.08301M2.08398 7.49967H17.9173" stroke="#20B015" strokeLinecap="round" />
                          <path d="M15 14.1667C15 14.3877 14.9122 14.5996 14.7559 14.7559C14.5996 14.9122 14.3877 15 14.1667 15C13.9457 15 13.7337 14.9122 13.5774 14.7559C13.4211 14.5996 13.3333 14.3877 13.3333 14.1667C13.3333 13.9457 13.4211 13.7337 13.5774 13.5774C13.7337 13.4211 13.9457 13.3333 14.1667 13.3333C14.3877 13.3333 14.5996 13.4211 14.7559 13.5774C14.9122 13.7337 15 13.9457 15 14.1667ZM15 10.8333C15 11.0543 14.9122 11.2663 14.7559 11.4226C14.5996 11.5789 14.3877 11.6667 14.1667 11.6667C13.9457 11.6667 13.7337 11.5789 13.5774 11.4226C13.4211 11.2663 13.3333 10.8333 13.3333 10.8333C13.3333 10.6123 13.4211 10.4004 13.5774 10.2441C13.7337 10.0878 13.9457 10 14.1667 10C14.3877 10 14.5996 10.0878 14.7559 10.2441C14.9122 10.4004 15 10.6123 15 10.8333ZM10.8333 14.1667C10.8333 14.3877 10.7455 14.5996 10.5893 14.7559C10.433 14.9122 10.221 15 10 15C9.77899 15 9.56702 14.9122 9.41074 14.7559C9.25446 14.5996 9.16667 14.3877 9.16667 14.1667C9.16667 13.9457 9.25446 13.7337 9.41074 13.5774C9.56702 13.4211 9.77899 13.3333 10 13.3333C10.221 13.3333 10.433 13.4211 10.5893 13.5774C10.7455 13.7337 10.8333 13.9457 10.8333 14.1667ZM10.8333 10.8333C10.8333 11.0543 10.7455 11.2663 10.5893 11.4226C10.433 11.5789 10.221 11.6667 10 11.6667C9.77899 11.6667 9.56702 11.5789 9.41074 11.4226C9.25446 11.2663 9.16667 11.0543 9.16667 10.8333C9.16667 10.6123 9.25446 10.4004 9.41074 10.2441C9.56702 10.0878 9.77899 10 10 10C10.221 10 10.433 10.0878 10.5893 10.2441C10.7455 10.4004 10.8333 10.6123 10.8333 10.8333ZM6.66667 14.1667C6.66667 14.3877 6.57887 14.5996 6.42259 14.7559C6.26631 14.9122 6.05435 15 5.83333 15C5.61232 15 5.40036 14.9122 5.24408 14.7559C5.0878 14.5996 5 14.3877 5 14.1667C5 13.9457 5.0878 13.7337 5.24408 13.5774C5.40036 13.4211 5.61232 13.3333 5.83333 13.3333C6.05435 13.3333 6.26631 13.4211 6.42259 13.5774C6.57887 13.7337 6.66667 13.9457 6.66667 14.1667ZM6.66667 10.8333C6.66667 11.0543 6.57887 11.2663 6.42259 11.4226C6.26631 11.5789 6.05435 11.6667 5.83333 11.6667C5.61232 11.6667 5.40036 11.5789 5.24408 11.4226C5.0878 11.2663 5 11.0543 5 10.8333C5 10.6123 5.0878 10.4004 5.24408 10.2441C5.40036 10.0878 5.61232 10 5.83333 10C6.05435 10 6.26631 10.0878 6.42259 10.2441C6.57887 10.4004 6.66667 10.6123 6.66667 10.8333Z" fill="#20B015" />
                        </svg>
                        <span className="ct_text_707070 ct_fs_15">{t("ai_discovery_banner.flexible_stays")}</span>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex gap-1 align-items-center">
                        <svg className="me-1" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.41797 8.05554V5.13888C5.41797 4.10748 5.82769 3.11833 6.557 2.38903C7.28631 1.65972 8.27546 1.25 9.30686 1.25C10.3383 1.25 11.3274 1.65972 12.0567 2.38903C12.786 3.11833 13.1957 4.10748 13.1957 5.13888V8.05554" stroke="#20B015" strokeLinecap="round" />
                          <path d="M2.5 8.05566H16.1111V16.8056C16.1111 17.3213 15.9063 17.8159 15.5416 18.1806C15.1769 18.5452 14.6824 18.7501 14.1667 18.7501H4.44444C3.92875 18.7501 3.43417 18.5452 3.06951 18.1806C2.70486 17.8159 2.5 17.3213 2.5 16.8056V8.05566Z" stroke="#20B015" strokeLinejoin="round" />
                          <path d="M11.7344 13.4033H11.7427V13.4117H11.7344V13.4033Z" stroke="#20B015" strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>
                        <span className="ct_text_707070 ct_fs_15">{t("ai_discovery_banner.secure_payments")}</span>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex gap-1 align-items-center">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M16.5003 8.48367C16.242 5.83367 14.6753 1.66699 9.83369 1.66699C4.99201 1.66699 3.42533 5.83367 3.16701 8.48367C2.26076 8.82762 1.66299 9.69769 1.66701 10.667V11.8337C1.66701 13.1223 2.7117 14.167 4.00033 14.167C5.289 14.167 6.33369 13.1223 6.33369 11.8337V10.667C6.32947 9.71859 5.75369 8.86641 4.87533 8.50867C5.04201 6.97531 5.85869 3.33367 9.83369 3.33367C13.8087 3.33367 14.617 6.97531 14.7837 8.50867C13.9071 8.86719 13.3342 9.71996 13.3337 10.667V11.8337C13.3355 12.2727 13.4607 12.7024 13.6949 13.0737C13.9292 13.4451 14.2632 13.743 14.6587 13.9337C14.3087 14.592 13.417 15.4837 11.2253 15.7503C10.7872 15.0851 9.93963 14.8228 9.20236 15.1244C8.46514 15.426 8.04432 16.2071 8.19807 16.9887C8.35182 17.7702 9.03713 18.3337 9.83369 18.3337C10.1423 18.3319 10.4444 18.2446 10.7063 18.0812C10.9682 17.9179 11.1797 17.6851 11.317 17.4087C14.892 17.0003 16.0337 15.1587 16.392 14.0753C17.3614 13.7613 18.0134 12.8526 18.0003 11.8337V10.667C18.0044 9.69769 17.4066 8.82762 16.5003 8.48367ZM4.66701 11.8337C4.66701 12.2018 4.36854 12.5003 4.00033 12.5003C3.63213 12.5003 3.33369 12.2019 3.33369 11.8337V10.667C3.33302 10.579 3.34977 10.4918 3.38297 10.4103C3.41617 10.3288 3.46517 10.2547 3.52714 10.1923C3.58911 10.1298 3.66283 10.0803 3.74405 10.0464C3.82526 10.0126 3.91237 9.99521 4.00035 9.99521C4.08833 9.99521 4.17544 10.0126 4.25666 10.0464C4.33788 10.0803 4.41159 10.1298 4.47357 10.1923C4.53554 10.2547 4.58454 10.3288 4.61774 10.4103C4.65094 10.4918 4.66769 10.579 4.66701 10.667V11.8337ZM15.0003 10.667C15.0003 10.2988 15.2988 10.0003 15.667 10.0003C16.0352 10.0003 16.3337 10.2988 16.3337 10.667V11.8337C16.3337 12.2018 16.0352 12.5003 15.667 12.5003C15.2988 12.5003 15.0003 12.2019 15.0003 11.8337V10.667Z" fill="#20B015" />
                        </svg>
                        <span className="ct_text_707070 ct_fs_15">{t("ai_discovery_banner.support_24_7")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* comment by sakshi */}
          {/* <HelpBy />   */}
          {/* end */}
          {/* footer section S */}
        </div>
        <WebFooter />
      </div>
    </>
  );
};

export default Help;
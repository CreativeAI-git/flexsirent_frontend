import toast from "react-hot-toast";
import { useState } from "react";

import WebHeader from "../../layout/WebHeader";
import WebFooter from "../../layout/WebFooter";
import AIBar from "@/components/AIBar";
import { webPath } from "../../../user/routes";
import { Rating } from "react-simple-star-rating";
import CustomSwiper from "../../components/swiper";
import WebSubHeader from "../../layout/WebSubHeader";
import NoRecord from "../../components/other/NoRecord";
import { useDispatch } from "react-redux";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import BackButton from "../../components/other/BackButton";
import Overview from "../../components/pages/apartment/Overview";
import MultiDatePicker from "../../components/MultiDateSelector";
import HouseRules from "../../components/pages/apartment/HouseRules";
import RentNdDeposite from "../../components/pages/apartment/RentNdDeposite";

import {
  addToWishlist,
} from "../../../redux/features/user/actions/bookingAction";
import { curSym, getAnyActiveToken, pipViewDate } from "../../utils/pip";

import axios from "axios";
import { parseIdFromSlug } from "../../../shared/utils/slugs";
import { BASE_URL, propertyDetailAPI } from "../../../shared/routes/apiURLs";

export async function loader({ params }) {
  const { listing_id } = params;
  if (!listing_id) {
    throw new Response("Not Found", { status: 404 });
  }

  const isTridentId = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(listing_id) || listing_id.startsWith("aaaaaaaa-");

  if (isTridentId) {
    try {
      const aiUrl = (import.meta.env.VITE_AI_URL || "https://api.flexsirent.com").replace(/\/+$/, "");
      const aiToken = import.meta.env.VITE_AI_TOKEN || "fsr_live_9f3c1a7e5b28d64084ac1177e2b93f0a";
      const res = await axios.get(`${aiUrl}/listings/${listing_id}`, {
        headers: {
          Authorization: `Bearer ${aiToken}`
        }
      });
      const data = res.data;
      if (!data) {
        throw new Response("Not Found", { status: 404 });
      }

      const lang = params.lang || "en";
      const TRIDENT_AMENITY_MAP = {
        en: {
          WIFI: "Wi-Fi",
          AC: "Air Conditioning",
          HEATING: "Heating",
          WASHING_MACHINE: "Washing Machine",
          DISHWASHER: "Dishwasher",
          OVEN: "Oven",
          MICROWAVE: "Microwave",
          BALCONY: "Balcony",
          TERRACE: "Terrace",
          ELEVATOR: "Elevator",
          PARKING: "Free Parking on Premises",
          PET_FRIENDLY: "Pet Friendly",
          SMOKE_FREE: "Smoke Free",
          DESK_WORKSPACE: "Desk / Workspace"
        },
        es: {
          WIFI: "WiFi",
          AC: "Aire acondicionado",
          HEATING: "Calefacción",
          WASHING_MACHINE: "Lavadora",
          DISHWASHER: "Lavavajillas",
          OVEN: "Horno",
          MICROWAVE: "Microondas",
          BALCONY: "Balcón",
          TERRACE: "Terraza",
          ELEVATOR: "Ascensor",
          PARKING: "Aparcamiento gratuito",
          PET_FRIENDLY: "Admite mascotas",
          SMOKE_FREE: "Sin humo",
          DESK_WORKSPACE: "Zona de trabajo"
        }
      };

      const propertyData = {
        property_id: data.id,
        id: data.id,
        property_title: data.title,
        title: data.title,
        city: data.city,
        address: data.address_masked,
        address_masked: data.address_masked,
        property_description: data.description,
        monthly_rent: data.rent_monthly_minor / 100,
        monthly_rent_type: 0,
        security_deposit: data.deposit_minor != null ? data.deposit_minor / 100 : 0,
        cleaning_fee: 0,
        cleaning_fee_type: 0,
        offer_value: 0,
        bedrooms: data.rooms_count || 0,
        bathrooms: data.baths_count || 0,
        beds: data.beds_count || 0,
        square_foot: data.size_m2,
        is_m2: true,
        propertyImage: [
          {
            image: data.cover_photo || "https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_2.png"
          }
        ],
        available_from: data.available_from,
        min_stay_duration: data.min_stay_days || 1,
        max_stay_duration: data.max_stay_days,
        is_wishlist: false,
        isTrident: true,
        canellationPolicy: {
          content: lang === "es"
            ? "Se aplica la política de cancelación estándar de 30 días. Las estancias pueden cancelarse o modificarse hasta 30 días antes de la fecha de entrada."
            : "Standard 30-day cancellation policy applies. Stays can be cancelled or modified up to 30 days prior to the check-in date."
        },
        amenities_label: (data.amenities || []).map(code => ({
          title: (TRIDENT_AMENITY_MAP[lang] || TRIDENT_AMENITY_MAP.en)[code] || code
        }))
      };

      return { propertyData, propertyId: listing_id };
    } catch (error) {
      throw new Response("Not Found", { status: 404 });
    }
  }

  try {
    const res = await axios.get(`${BASE_URL}${propertyDetailAPI}${listing_id}`);
    const propertyData = res.data?.data;
    if (!propertyData) {
      throw new Response("Not Found", { status: 404 });
    }
    return { propertyData, propertyId: listing_id };
  } catch (error) {
    throw new Response("Not Found", { status: 404 });
  }
}

import { getMaskedAddress, getHrefLangs } from "../../utils/seoHelper";

export function meta({ data, params }) {
  if (!data || !data.propertyData) {
    return [{ title: "Luxury Accommodation | Flexsirent" }];
  }

  const prop = data.propertyData;
  const lang = params.lang || "en";
  const listingId = params.listing_id;
  const url = `https://flexsirent.com/${lang}/l/${listingId}`;
  const maskedAddress = getMaskedAddress(prop.address || "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Apartment",
    "name": prop.property_title,
    "description": prop.property_description || "",
    "url": url,
    "numberOfRooms": Number(prop.bedrooms) || 1,
    "numberOfBathroomsTotal": Number(prop.bathrooms) || 1,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": maskedAddress
    },
    "offers": {
      "@type": "Offer",
      "price": prop.monthly_rent - (prop.monthly_rent * (prop.offer_value || 0)) / 100,
      "priceCurrency": "EUR",
      "url": url,
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": prop.monthly_rent,
        "priceCurrency": "EUR",
        "unitCode": "MON"
      }
    }
  };

  return [
    { title: `${prop.property_title} | Flexsirent` },
    { name: "description", content: prop.property_description || "Book flexible stays with Flexsirent." },
    { property: "og:title", content: prop.property_title },
    { property: "og:description", content: prop.property_description || "Book flexible stays with Flexsirent." },
    { property: "og:image", content: prop.propertyImage?.[0]?.image || "" },
    { property: "og:url", content: url },
    { tagName: "link", rel: "canonical", href: url },
    ...getHrefLangs(`l/${listingId}`),
    { "script:ld+json": jsonLd }
  ];
}

const PropertyDetails = () => {
  const { t } = useTranslation();
  const loaderData = useLoaderData();
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();

  // Loader is the single source of truth for initial render
  const propertyData = loaderData?.propertyData || null;
  const resolvedPropertyId = loaderData?.propertyId;

  const [selectDate, setSelectDate] = useState({});
  const [guestCount, setGuestCount] = useState("1");
  const [logInModal, setLogInModal] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(!!propertyData?.is_wishlist);

  const appartmentData = propertyData?.propertyImage || [];

  const handleIncrement = () => {
    const newValue = Math.max(0, Number(guestCount) + 1);
    setGuestCount(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(1, Number(guestCount) - 1);
    setGuestCount(newValue);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleWishlist = () => {
    const callback = (res) => {
      if (res?.success) {
        setIsWishlisted((prev) => !prev);
      }
    };

    const { token, role } = getAnyActiveToken() || {};
    if (role === "guest" && token) {
      dispatch(
        addToWishlist({
          payload: { property_id: resolvedPropertyId },
          callback,
        }),
      );
    } else {
      toast.error(
        "Please log in with a guest account to add this property to your wishlist.",
      );
    }
  };

  const getMinDate = () => {
    if (!propertyData?.available_from) return new Date();
    const avail = new Date(propertyData.available_from);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return avail > now ? avail : now;
  };
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .ct_gallery.ct_single_image {
            grid-template-columns: 1fr;
          }
          .ct_gallery.ct_single_image .ct_gallery_left img {
            height: 480px;
            border-radius: 12px;
          }
        `
      }} />
      {/* Header Section S */}
      <WebHeader
        logInModal={logInModal}
        setLogInModal={setLogInModal}
        loginAs="guest"
      />
      <WebSubHeader lebel={t("table.property_details")} desc={""} propertyId={propertyData?.property_id} />

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex align-items-center justify-content-between gap-3 mb-4 ct_flex_col_575 flex-wrap">
                <h4 className="ct_fs_24 ct_fw_600 mb-0">
                  <BackButton /> {propertyData?.property_title || "#N/A"}
                </h4>
                <div class="d-flex flex-wrap gap-4">
                  <div className="d-flex align-items-center gap-3 ">
                    {/* <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="ct_fs_14 text-dark ct_fw_500"
                  >
                    <i className="fa-solid fa-arrow-up-from-bracket me-1"></i>
                    Share
                  </a> */}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleWishlist();
                      }}
                      className="ct_fs_14 text-dark ct_fw_500"
                    >
                      <i
                        className={`fa-${isWishlisted ? "solid text-danger" : "regular"} fa-heart me-1`}
                      ></i>
                      {t("properties_page.save")}
                    </a>
                  </div>
                  {propertyData?.address_masked && (
                    <p className="text-muted ct_fs_16   mb-0">
                      <i className="fa-solid fa-location-dot me-2 text-warning"></i>
                      {propertyData.address_masked}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 mb-4 mb-lg-0">
              {propertyData?.propertyImage?.length > 0 && (
                <div className={`ct_gallery p-0 ${propertyData?.propertyImage?.length === 1 ? 'ct_single_image' : ''}`}>
                  <div className="ct_gallery_left">
                    <img
                      loading="lazy"
                      src={propertyData?.propertyImage[0]?.image}
                      alt="Main"
                      className=""
                    />
                  </div>

                  {propertyData?.propertyImage.length > 1 && (
                    <div className="ct_gallery_right">
                      {propertyData?.propertyImage
                        .slice(1, 4)
                        .map((img, index) => (
                          <img
                            loading="lazy"
                            key={index}
                            src={img?.image}
                            alt={`Gallery-${index + 1}`}
                          />
                        ))}
                      {/* {propertyData?.propertyImage.length > 4 && ( */}
                      <button
                        className="ct_show_all_images_btn"
                        data-bs-toggle="modal"
                        data-bs-target="#ct_show_all_photos"
                      >
                        <i className="fa-regular fa-image me-1"></i>
                        {t("properties_page.show_all_photos")}
                      </button>
                      {/* )} */}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="ct_outline_border px-4 pt-3 pb-3">
                <ul className="ct_aprtment_detail_prices_card mb-3">
                  <li className="mb-3">
                    <h4 className="ct_fs_18 ct_fw_600 mb-0 ct_white_nowrap">
                      {curSym}
                      {(
                        propertyData?.monthly_rent -
                        (propertyData?.monthly_rent *
                          (propertyData?.offer_value || 0)) /
                        100
                      ).toFixed(2)}

                      {propertyData?.offer_value > 0 && (
                        <>
                          <del className="ms-2 text-muted ct_fs_16">
                            {curSym}
                            {propertyData?.monthly_rent || 0}
                          </del>
                          <span className="ms-2 ct_orange_text ct_fs_16">
                            ({propertyData?.offer_value}% OFF)
                          </span>
                        </>
                      )}
                    </h4>
                    <p className="mb-0 ct_text_op_6 ct_white_nowrap">
                      {t("properties_page.rent_month")}{" "}
                      <small>
                        (
                        {propertyData?.monthly_rent_type == 1
                          ? t("properties_page.per_person")
                          : t("properties_page.fixed")}
                        )
                      </small>
                    </p>
                  </li>
                  <li>
                    <h4 className="ct_fs_18 ct_fw_600 mb-0 ct_white_nowrap">
                      {curSym}
                      {propertyData?.security_deposit || 0}
                    </h4>
                    <p className="mb-0 ct_text_op_6 ct_white_nowrap">{t("properties_page.deposit")}</p>
                  </li>
                </ul>
                <ul className=" ct_aprtment_detail_prices_card mb-3 ">
                  <li className="border-0">
                    <h4 className="ct_fs_18 ct_fw_600 mb-0 ct_white_nowrap">
                      {curSym}
                      {propertyData?.cleaning_fee || 0}
                    </h4>
                    <p className="mb-0 ct_text_op_6 ct_white_nowrap">
                      {t("properties_page.cleaning_fee")}{" "}
                      <small>
                        (
                        {propertyData?.cleaning_fee_type == 1
                          ? t("properties_page.per_person")
                          : t("properties_page.fixed")}
                        )
                      </small>
                    </p>
                  </li>
                </ul>

                <div
                  className="row mb-4 pt-3"
                  style={{ borderTop: "1px solid #e6e6e6" }}
                >
                  <p className="mb-2 ct_fw_500 px-0 ">{t("properties_page.check_in_out")}</p>
                  <MultiDatePicker
                    blockedDates={propertyData?.booked_dates}
                    onDateSelect={(val) => setSelectDate(val)}
                    min_stay_duration={propertyData?.min_stay_duration}
                    max_stay_duration={propertyData?.max_stay_duration}
                    minDate={getMinDate()}
                  />
                </div>

                <div className="form-group mb-4">
                  <label for="" className="mb-2 ct_fw_500">
                    {t("properties_page.guest")}{" "}
                  </label>
                  <div className="position-relative">
                    <span className="ct_increase_btn" onClick={handleIncrement}>
                      <i className="fa-solid fa-plus"></i>
                    </span>
                    <input
                      type="number"
                      className="form-control ct_px_70 text-center ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
                      value={guestCount}
                      readOnly
                      placeholder="1"
                    />
                    <span className="ct_decrease_btn" onClick={handleDecrement}>
                      <i className="fa-solid fa-minus"></i>
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <a
                    onClick={(e) => {
                      e.preventDefault();

                      const activeSession = getAnyActiveToken();

                      //  No one is logged in
                      if (!activeSession?.token) {
                        // 👇 Save intent before login
                        sessionStorage.setItem(
                          "postLoginRedirect",
                          JSON.stringify({
                            path: webPath.BookProperty,
                            state: {
                              data: {
                                guestCount,
                                ...propertyData,
                                ...selectDate,
                                loggedInRole: "guest",
                              },
                            },
                          }),
                        );

                        setLogInModal(true);
                        toast.error("Please login to continue booking");
                        return;
                      }

                      const allowedRoles = ["guest", "guest-business"];

                      if (!allowedRoles.includes(activeSession.role)) {
                        toast.error(
                          "Please login with a guest account to continue booking",
                        );
                        return;
                      }

                      //  Dates not selected
                      if (Object.values(selectDate).length != 2) {
                        toast.error("Please select check-in/check-out date");
                        return;
                      }
                      navigate(webPath?.BookProperty, {
                        state: {
                          data: {
                            guestCount,
                            ...propertyData,
                            ...selectDate,
                            loggedInRole: activeSession?.role,
                          },
                        },
                      });
                    }}
                    className="ct_orange_btn"
                  >
                    {t("properties_page.continue_booking")}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="ct_white_bg ct_box_shadow p-4 mt-4">
            <ul className="ct_footer_link ct_apartment_detail_section_links">
              <li>
                <button
                  className="property-detail-tabs"
                  onClick={() => scrollToSection("overview")}
                >
                  {t("properties_page.overview")}
                </button>
              </li>
              <li>
                <button
                  className="property-detail-tabs"
                  onClick={() => scrollToSection("rent-&-deposit")}
                >
                  {t("properties_page.rent_and_deposit")}
                </button>
              </li>
              <li>
                <button
                  className="property-detail-tabs"
                  onClick={() => scrollToSection("cancellation-policies")}
                >
                  {t("properties_page.cancellation_policies")}
                </button>
              </li>
              <li>
                <button
                  className="property-detail-tabs"
                  onClick={() => scrollToSection("house-rules")}
                >
                  {t("properties_page.house_rules")}
                </button>
              </li>
              <li>
                <button
                  className="property-detail-tabs"
                  onClick={() => scrollToSection("landlord")}
                >
                  {t("properties_page.professional_landlord")}
                </button>
              </li>
              <li>
                <button
                  className="property-detail-tabs"
                  onClick={() => scrollToSection("availabilities")}
                >
                  {t("properties_page.availabilities")}
                </button>
              </li>
              {!propertyData?.isTrident && (
                <li>
                  <button
                    className="property-detail-tabs"
                    onClick={() => scrollToSection("getting-around")}
                  >
                    {t("properties_page.getting_around")}
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Overview */}
          <Overview data={propertyData} />

          {/* Rent & Deposit */}
          <RentNdDeposite data={propertyData} />

          <div
            className="ct_white_bg ct_box_shadow p-4 mt-4"
            id="cancellation-policies"
          >
            <div className="d-flex align-items-center justify-content-between gap-3">
              <h4 className="ct_fs_20 ct_fw_600">{t("properties_page.cancellation_policies")}</h4>
              <a
                onClick={() => navigate(webPath?.cancellationPolicy)}
                className="ct_orange_link ct_white_nowrap ct_cursor_pointer"
              >
                {t("properties_page.view_details")}
                <i className="fa-solid fa-arrow-right ms-1"></i>
              </a>
            </div>
            <div className="mt-3">
              <div className="row">
                <div
                  className="ct_minimise_cnt"
                  style={{ maxWidth: "100%" }}
                  dangerouslySetInnerHTML={{
                    __html: propertyData?.canellationPolicy?.content,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {propertyData?.house_rules_label?.length && (
            <HouseRules data={propertyData} />
          )}
          <div className="ct_white_bg ct_box_shadow p-4 mt-4" id="landlord">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <h4 className="ct_fs_20 ct_fw_600">{t("properties_page.professional_landlord")}</h4>
              {!propertyData?.isTrident && (
                <a
                  href="javascript:void(0)"
                  data-bs-toggle="modal"
                  data-bs-target="#ct_contact_host"
                  className="ct_orange_link ct_white_nowrap"
                >
                  {t("properties_page.contact_host")}
                  <i className="fa-solid fa-arrow-right ms-1"></i>
                </a>
              )}
            </div>
            <p className="mb-0 ct_fs_14 mt-2">
              {propertyData?.isTrident
                ? "This property is managed by a verified FlexsiRent professional landlord. The host has been fully verified and meets our premium quality standards for business and student housing, ensuring a smooth rental experience."
                : "In Rentalaria as rental experts, we take our work extremely seriously. We understand that only through daily effort can we maintain our position as the undisputed leaders in the sector. Our goal is to remain the most dynamic Rental Management Agency in Málaga for many years to come."}
            </p>
            <div className="row ct_mt_30 align-items-center">
              <div className="col-lg-3 mb-4 mb-lg-0">
                <div className="d-flex align-items-center gap-3 ">
                  <div className="ct_landloard_user">
                    <img
                      loading="lazy"
                      src={propertyData?.isTrident
                        ? "https://app.flexsirent.com/assets/img/verify_icon.png"
                        : "https://app.flexsirent.com/assets/img/user_5.png"}
                      alt=""
                    />
                    <img
                      loading="lazy"
                      src="https://app.flexsirent.com/assets/img/verify_icon.png"
                      alt=""
                    />
                  </div>
                  <h4 className="mb-0 ct_fs_22 ct_fw_600 ct_white_nowrap">
                    {propertyData?.isTrident ? "Verified Landlord" : "Rentalaria"}
                  </h4>
                </div>
              </div>
              {!propertyData?.isTrident && (
                <div className="col-lg-9 mb-4 mb-lg-0">
                  <ul className="ct_landloard_right_info">
                    <li className="ps-0">
                      <h5 className="ct_fs_24 ct_fw_600 mb-1">86</h5>
                      <p className="mb-0 ct_fs_14">{t("sidebar.reviews")}</p>
                    </li>
                    <li>
                      <h5 className="ct_fs_24 ct_fw_600 mb-1">
                        4.97
                        <i className="fa-solid fa-star ms-1"></i>
                      </h5>
                      <p className="mb-0 ct_fs_14">{t("table.status") === "Status" ? "Ratings" : "Valoración"}</p>
                    </li>
                    <li>
                      <h5 className="ct_fs_24 ct_fw_600 mb-1">2</h5>
                      <p className="mb-0 ct_fs_14">{t("properties_page.years_hosting")}</p>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div
            className="ct_white_bg ct_box_shadow p-4 mt-4"
            id="availabilities"
          >
            <h4 className="ct_fs_20 ct_fw_600">{t("properties_page.availabilities")}</h4>
            <div className="row">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <table className="table mt-4 ct_avalable_table">

                  <tr>
                    <td className="ct_fw_600 py-2">{t("properties_page.available_from")}{" "}</td>
                    <td className="text-end py-2">
                      {propertyData?.isTrident
                        ? (pipViewDate(propertyData.available_from) || "N/A")
                        : t("properties_page.available_now")}
                    </td>
                  </tr>
                  <tr>
                    <td className="ct_fw_600 py-2">{t("properties_page.min_stay")}</td>
                    <td className="text-end py-2">
                      {propertyData?.isTrident
                        ? `${propertyData.min_stay_duration} ${t("table.date") === "Date" ? "Days" : "Días"}`
                        : `1 ${t("table.month")} (30 ${t("table.date") === "Date" ? "Days" : "Días"})`}
                    </td>
                  </tr>
                  <tr>
                    <td className="ct_fw_600 py-2">{t("properties_page.max_stay")}</td>
                    <td className="text-end py-2">
                      {propertyData?.isTrident
                        ? (propertyData.max_stay_duration ? `${propertyData.max_stay_duration} ${t("table.date") === "Date" ? "Days" : "Días"}` : t("properties_page.no_max_stay"))
                        : t("properties_page.no_max_stay")}
                    </td>
                  </tr>
                  {!propertyData?.isTrident && (
                    <>
                      <tr>
                        <td className="ct_fw_600 py-2">{t("properties_page.calendar_updated")}</td>
                        <td className="text-end py-2">
                          ({t("properties_page.calendar_updated")} 14 {t("table.date") === "Date" ? "Days" : "Días"})
                        </td>
                      </tr>
                      <tr>
                        <td className="ct_fw_600 py-2">{t("properties_page.booking_window")}</td>
                        <td className="text-end py-2">
                          {t("properties_page.booking_window_desc")}
                        </td>
                      </tr>
                    </>
                  )}

                </table>
              </div>
            </div>
          </div>
          {!propertyData?.isTrident && (
            <div
              className="ct_white_bg ct_box_shadow p-4 mt-4"
              id="getting-around"
            >
              <h4 className="ct_fs_20 ct_fw_600">{t("properties_page.getting_around")}</h4>
              <h6 className="mb-0 ct_fs_16 ct_fw_600 mt-3">
                {t("properties_page.getting_around_desc")}
              </h6>
              <div className="row mt-4">
                <div className="col-md-5">
                  <div>
                    <p>
                      <span className="ct_fw_600">{t("properties_page.bus_stop")}</span>2 {t("properties_page.min_walk")}
                    </p>
                  </div>
                </div>
                <div className="col-md-5">
                  <div>
                    <p>
                      <span className="ct_fw_600">{t("properties_page.nearby_university")}</span>
                      10 {t("properties_page.min_walk")}
                    </p>
                  </div>
                </div>
                <div className="col-md-5">
                  <div>
                    <p>
                      <span className="ct_fw_600">{t("properties_page.metro_station")}</span>5 {t("properties_page.min_walk")}
                    </p>
                  </div>
                </div>
                <div className="col-md-5">
                  <div>
                    <p>
                      <span className="ct_fw_600">{t("properties_page.supermarket")}</span>
                      200m
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {propertyData?.reviews?.length > 0 && (
            <div className="ct_white_bg ct_box_shadow p-4 mt-4">
              <h4 className="ct_fs_20 ct_fw_600">{t("properties_page.user_reviews")}</h4>
              <CustomSwiper
                data={propertyData?.reviews || []}
                className="ct_testimonial_slider ct_mt_60"
                swiperProps={{
                  slidesPerView: 3,
                  spaceBetween: 20,
                  loop: true,
                  pagination: false,
                  navigation: true,
                  breakpoints: {
                    0: {
                      slidesPerView: 1,
                    },
                    576: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 3,
                    },
                    1400: {
                      slidesPerView: 3,
                    },
                  },
                }}
                renderSlide={(item) =>
                  propertyData?.reviews?.length > 0 ? (
                    <div className="ct_testimonial_slide_card">
                      <div className="d-flex align-items-center gap-2 justify-content-center pt-4 mb-2">
                        <div className="ct_client_user_img">
                          <img
                            loading="lazy"
                            src={item?.profile_image || ""}
                            alt=""
                          />
                        </div>
                        <div>
                          <h5 className="ct_fs_18 ct_fw_600 mb-1">
                            {`${item?.first_name} ${item?.last_name}` || "#N/A"}
                          </h5>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2 mb-1 justify-content-center">
                        <Rating
                          initialValue={item?.rating}
                          allowFraction
                          readonly
                        />
                      </div>
                      <p className="px-4">{item?.review || "#N/A"}</p>
                    </div>
                  ) : (
                    <NoRecord />
                  )
                }
              />
            </div>
          )}
        </div>
      </section>

      {/* <!-- Show all Photos Modal S --> */}
      <div
        className="modal fade modal-lg"
        id="ct_show_all_photos"
        tabindex="-1"
        aria-labelledby="ct_show_all_photosLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className=" modal-content">
            <div className="modal-header border-0 pb-2">
              <h4 className="ct_fs_20 ct_fw_600">{t("properties_page.all_photos")}</h4>
              <button
                type="button"
                className="btn-close "
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="owl-carousel owl-theme ct_product_gallary_slider">
                <CustomSwiper
                  data={appartmentData}
                  className="ct_testimonial_slider ct_ab_mt_40"
                  swiperProps={{
                    slidesPerView: 1,
                    spaceBetween: 20,
                    loop: true,
                    pagination: false,
                    navigation: true,
                    breakpoints: {
                      0: {
                        slidesPerView: 1,
                      },
                      576: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 1,
                      },
                      1024: {
                        slidesPerView: 1,
                      },
                      1400: {
                        slidesPerView: 1,
                      },
                    },
                  }}
                  renderSlide={(item) => (
                    <div className="item">
                      <div className="ct_product_gallry_img">
                        <img loading="lazy" src={item?.image} alt="" />
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="ct_custom_sticky_sec" onClick={() => document.getElementById("ai-bar-section")?.scrollIntoView({ behavior: "smooth" })}>
        <div>
          <svg width="36" height="36" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.6247 10.6039C20.3018 7.29136 18.3434 2.08301 12.2914 2.08301C6.23928 2.08301 4.28093 7.29136 3.95803 10.6039C2.82522 11.0338 2.078 12.1214 2.08303 13.333V14.7914C2.08303 16.4022 3.38889 17.708 4.99968 17.708C6.61052 17.708 7.91638 16.4021 7.91638 14.7914V13.333C7.91111 12.1475 7.19138 11.0823 6.09343 10.6351C6.30178 8.71841 7.32263 4.16636 12.2914 4.16636C17.2601 4.16636 18.2705 8.71841 18.4789 10.6351C17.3832 11.0833 16.6671 12.1492 16.6664 13.333V14.7914C16.6686 15.3402 16.8251 15.8773 17.118 16.3414C17.4108 16.8056 17.8282 17.1781 18.3226 17.4164C17.8851 18.2393 16.7705 19.3539 14.0309 19.6872C13.4833 18.8556 12.4238 18.5278 11.5022 18.9048C10.5807 19.2817 10.0547 20.2582 10.2469 21.2351C10.439 22.2121 11.2957 22.9164 12.2914 22.9164C12.6772 22.9142 13.0548 22.805 13.3822 22.6008C13.7096 22.3967 13.9738 22.1056 14.1455 21.7601C18.6143 21.2497 20.0414 18.9476 20.4893 17.5934C21.7011 17.2009 22.516 16.065 22.4997 14.7914V13.333C22.5047 12.1214 21.7575 11.0338 20.6247 10.6039ZM5.83303 14.7914C5.83303 15.2516 5.45994 15.6247 4.99968 15.6247C4.53943 15.6247 4.16638 15.2516 4.16638 14.7914V13.333C4.16554 13.223 4.18647 13.114 4.22798 13.0121C4.26948 12.9103 4.33072 12.8177 4.40819 12.7396C4.48565 12.6616 4.5778 12.5996 4.67933 12.5573C4.78085 12.515 4.88973 12.4933 4.99971 12.4933C5.10968 12.4933 5.21857 12.515 5.32009 12.5573C5.42161 12.5996 5.51376 12.6616 5.59123 12.7396C5.66869 12.8177 5.72994 12.9103 5.77144 13.0121C5.81294 13.114 5.83388 13.223 5.83303 13.333V14.7914ZM18.7497 13.333C18.7497 12.8728 19.1228 12.4997 19.583 12.4997C20.0433 12.4997 20.4164 12.8728 20.4164 13.333V14.7914C20.4164 15.2516 20.0433 15.6247 19.583 15.6247C19.1228 15.6247 18.7497 15.2516 18.7497 14.7914V13.333Z" fill="#ff7f00"></path></svg>
        </div>
      </div> */}
      <section className="mb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <AIBar placeholder={t("ai_discovery_banner.placeholder")} />
            </div>
          </div>
        </div>
      </section>

      {/* footer section S */}
      <WebFooter />
    </>
  );
};

export default PropertyDetails;

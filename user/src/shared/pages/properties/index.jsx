import rcSlider from "rc-slider";
import "rc-slider/assets/index.css";
const Slider = rcSlider.default || rcSlider;
import { useRef } from "react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Country } from "country-state-city";
import Loader from "../../components/loader";
import WebFooter from "../../layout/WebFooter";
import WebHeader from "../../layout/WebHeader";
import AIBar from "@/components/AIBar";
import { webPath } from "../../../user/routes";
import { useDispatch, useSelector } from "react-redux";
import NoRecord from "../../components/other/NoRecord";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useLocation, useLoaderData, useParams, useRevalidator } from "react-router";
import { curSym, getAnyActiveToken } from "../../utils/pip";
import PlaceSearchInput from "../../components/form/PlaceSearchInput";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { generateSlug } from "../../utils/slugs";
import {
  fetchBhks,
  addToWishlist,
  fetchAmenties,
  fetchbedBaths,
  fetchProperties,
} from "../../../redux/features/user/actions/bookingAction";
import { BASE_URL, webPropertiesAPI, bhksAPI, amentiesAPI, bedBathsAPI, seoBySlugAPI } from "../../../shared/routes/apiURLs";

export async function loader({ request }) {
  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());

  const payload = {
    location: searchParams.location || "",
    sort_by: searchParams.sort_by || "",
    amenties: searchParams.amenties || "",
    bed_bath: searchParams.bed_bath || "",
    bhk: searchParams.bhk || "",
    min_price: searchParams.min_price || "",
    max_price: searchParams.max_price || "",
    move_in: searchParams.move_in || "",
    move_out: searchParams.move_out || "",
    max_person: searchParams.max_person || "",
    viewport: searchParams.viewport || "",
  };

  const cleanPayload = Object.fromEntries(
    Object.entries(payload).filter(([, v]) => v !== undefined && v !== null && v !== "")
  );

  try {
    const activeSession = getAnyActiveToken();
    const token = activeSession?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const [propertiesRes, bhksRes, amenitiesRes, bedBathsRes, seoRes] = await Promise.all([
      axios.get(`${BASE_URL}${webPropertiesAPI}`, { params: cleanPayload, headers }),
      axios.get(`${BASE_URL}${bhksAPI}`),
      axios.get(`${BASE_URL}${amentiesAPI}`),
      axios.get(`${BASE_URL}${bedBathsAPI}`),
      axios.get(`${BASE_URL}${seoBySlugAPI}properties`).catch(() => null),
    ]);

    return {
      properties: propertiesRes.data?.data || [],
      bhks: bhksRes.data?.data || {},
      amenities: amenitiesRes.data?.data || [],
      bedBaths: bedBathsRes.data?.data || {},
      seoData: seoRes?.data?.data || null,
      searchParams: {
        location: searchParams.location || "",
        sort_by: searchParams.sort_by || "",
        amenties: searchParams.amenties || "",
        bed_bath: searchParams.bed_bath || "",
        bhk: searchParams.bhk || "",
        min_price: searchParams.min_price || "",
        max_price: searchParams.max_price || "",
        move_in: searchParams.move_in || "",
        move_out: searchParams.move_out || "",
        max_person: searchParams.max_person || "",
        viewport: searchParams.viewport || "",
      }
    };
  } catch (error) {
    return {
      properties: [],
      bhks: {},
      amenities: [],
      bedBaths: {},
      seoData: null,
      searchParams: {},
    };
  }
}

export function meta({ data, params }) {
  const lang = params.lang || "en";
  const canonicalBase = (import.meta.env.VITE_CANONICAL_URL || "https://flexsirent.com").replace(/\/+$/, "");
  const url = `${canonicalBase}/${lang}/properties`;
  const seo = data?.seoData;
  const title = seo?.meta_title || "Properties | Flexsirent";
  const description = seo?.meta_description || "Explore flexible rental properties including apartments, rooms, and flats on Flexsirent.";

  const propertyList = data?.properties || [];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "numberOfItems": propertyList.length,
    "itemListElement": propertyList.slice(0, 10).map((item, idx) => {
      const propId = item.property_id || item.id;
      const imageUrl = item.propertyImage?.length ? item.propertyImage[0].image : "";
      return {
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Accommodation",
          "name": item.property_title || "Rental Property",
          "url": `${canonicalBase}/${lang}/l/${propId}`,
          "image": imageUrl || undefined,
          "description": item.property_description || undefined,
          "address": item.address ? {
            "@type": "PostalAddress",
            "addressLocality": item.address // Masked or public address string
          } : undefined,
          "offers": {
            "@type": "Offer",
            "price": item.monthly_rent ? (item.monthly_rent - (item.monthly_rent * (item.offer_value || 0)) / 100) : undefined,
            "priceCurrency": "EUR",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": item.monthly_rent || undefined,
              "priceCurrency": "EUR",
              "unitCode": "MON"
            }
          }
        }
      };
    })
  };

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { tagName: "link", rel: "canonical", href: url },
    { "script:ld+json": structuredData }
  ];
}

const Properties = () => {
  const { t } = useTranslation();
  const loaderData = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useLocalizedNavigate();
  const { state } = useLocation();
  const { lang } = useParams();
  const lastParamsRef = useRef(null);
  const revalidator = useRevalidator();

  const { isLoading: reduxIsLoading, propertyList: reduxPropertyList, amenityOptions: reduxAmenityOptions, bhkObj: reduxBhkObj, bedBathObj: reduxBedBathObj } =
    useSelector((state) => state?.guest?.booking);

  const [hasFetchedClient, setHasFetchedClient] = useState(false);

  const propertyList = hasFetchedClient
    ? reduxPropertyList
    : (loaderData?.properties || []);
  const amenityOptions = loaderData?.amenities || reduxAmenityOptions;
  const bhkObj = loaderData?.bhks || reduxBhkObj;
  const bedBathObj = loaderData?.bedBaths || reduxBedBathObj;
  const isLoading = loaderData ? false : reduxIsLoading;

  // Fetch the list of countries
  const initialParams = loaderData?.searchParams || {};
  const [priceRange, setPriceRange] = useState([
    initialParams.min_price ? Number(initialParams.min_price) : 0,
    initialParams.max_price ? Number(initialParams.max_price) : 100000
  ]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: initialParams.location || "",
    address: initialParams.location || "",
    sort_by: initialParams.sort_by || "",
    amenties: initialParams.amenties ? initialParams.amenties.split(",").filter(Boolean) : [],
    bedBath: initialParams.bed_bath ? initialParams.bed_bath.split(",").filter(Boolean) : [],
    bhk: initialParams.bhk ? initialParams.bhk.split(",").filter(Boolean) : [],
    viewport: initialParams.viewport ? (typeof initialParams.viewport === "string" ? JSON.parse(initialParams.viewport) : initialParams.viewport) : null,
    move_in: initialParams.move_in || "",
    move_out: initialParams.move_out || "",
    max_person: initialParams.max_person || "",
  });
  const countryOptions = Country.getAllCountries();

  useEffect(() => {
    const fetchOnMount = async () => {
      const { token } = getAnyActiveToken() || {};
      if (token) {
        await dispatch(fetchProperties({ payload: getParams() }));
        setHasFetchedClient(true);
      }
    };
    lastParamsRef.current = getParams();
    fetchOnMount();
  }, [dispatch]);

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleMultiSelect = (key, value) => {
    setFilters((prev) => {
      const updated = prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value];
      return { ...prev, [key]: updated };
    });
  };

  const getParams = () => {
    const params = {
      location: filters.location ? filters.location?.toLowerCase() : "",
      viewport: filters.viewport ? (typeof filters.viewport === "string" ? filters.viewport : JSON.stringify(filters.viewport)) : null,
      sort_by: filters.sort_by,
      amenties: filters.amenties.length
        ? filters.amenties.join(",")
        : undefined,
      min_price: priceRange[0],
      max_price: priceRange[1],
      bed_bath:
        filters.bedBath && filters.bedBath.length
          ? filters.bedBath.join(",")
          : undefined,
      bhk:
        filters.bhk && filters.bhk.length ? filters.bhk.join(",") : undefined,
      move_in: filters.move_in,
      move_out: filters.move_out,
      max_person: filters.max_person,
    };

    // remove empty values
    return Object.fromEntries(
      Object.entries(params).filter(
        ([, v]) => v !== undefined && v !== null && v !== "",
      ),
    );
  };

  const handleFilter = () => {
    const currentParams = getParams();
    const currentParamsStr = JSON.stringify(currentParams);
    const lastParamsStr = JSON.stringify(lastParamsRef.current);

    if (currentParamsStr === lastParamsStr) {
      return;
    }

    lastParamsRef.current = currentParams;

    // Update URL search parameters natively
    const query = new URLSearchParams();
    Object.entries(currentParams).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        query.set(key, String(val));
      }
    });

    navigate(`?${query.toString()}`, { replace: true });
    dispatch(fetchProperties({ payload: currentParams }));
  };

  const handleWishlist = (item) => {
    const callback = (res) => {
      if (res?.success) {
        dispatch(fetchProperties({ payload: getParams() }));
        revalidator.revalidate();
      }
    };

    const { token, role } = getAnyActiveToken() || {};
    if (role === "guest" && token) {
      dispatch(
        addToWishlist({
          payload: { property_id: item?.property_id },
          callback,
        }),
      );
    } else {
      toast.error(
        "Please log in with a guest account to add this property to your wishlist.",
      );
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <WebHeader />
      <section className="ct_inner_banner_bg">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="ct_fs_35 ct_fw_700">Properties</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 position-relative">
        <div className="container">
          <div className="row ">
            <div className="col-md-12">
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "15px" }}>
                <button
                  type="button"
                  className="ct_orange_btn btn-sm d-inline-flex align-items-center gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                  style={{ padding: "8px 16px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}
                >
                  <i className="fa-solid fa-filter"></i>
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
              </div>
              {showFilters && (
                <div className="animate-fade-in">
                  <ul className="d-flex align-items-center gap-3 flex-wrap  mb-4 ct_flex_col_767 ct_multifilter_main">
                    {/* Sort By */}
                    <li className="ct_w_100_767">
                      <select
                        value={filters.sort_by}
                        onChange={(e) => handleChange("sort_by", e.target.value)}
                        className="form-control ct_input ct_input_h_50 ct_w_100_767"
                      >
                        <option value="">Sort By</option>
                        <option value="1">Oldest</option>
                        <option value="2">Newest</option>
                      </select>
                    </li>
                    {/* Amenities */}
                    <li className="ct_custom_drop_mega ct_w_100_767">
                      <a
                        href="#"
                        id="Amenities"
                        className="form-control ct_custom_price_select_dropdown ct_input ct_input_h_50 ct_w_100_575  d-flex align-items-center gap-1 justify-content-between"
                      >
                        Amenities
                        <i className="fa-solid fa-angle-down ms-1"></i>
                      </a>
                      <ul
                        className="ct_custom_drop_mega_menus"
                        id="ct_Amenities_drop"
                      >
                        <div className="ct_filter_scroll ct_custom_scroll ct_pe_30">
                          {amenityOptions?.length > 0 ? (
                            amenityOptions?.map((item, ind) => {
                              return (
                                <div
                                  key={ind}
                                  className="d-flex align-items-center gap-2 justify-content-between "
                                >
                                  <div className="d-flex align-items-center gap-1">
                                    <div className="form-check ct_custom_check2">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        checked={filters.amenties.includes(
                                          item?.amenities_id,
                                        )}
                                        onChange={() =>
                                          handleMultiSelect(
                                            "amenties",
                                            item?.amenities_id,
                                          )
                                        }
                                        id="flexCheckDefault"
                                      />
                                    </div>
                                    <label
                                      for=""
                                      className="ct_fs_14 ct_fw_500 ct_text_op_6"
                                    >
                                      {item?.title || ""}
                                    </label>
                                  </div>
                                  <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14">
                                    {item?.property_count || 0}
                                  </p>
                                </div>
                              );
                            })
                          ) : (
                            <NoRecord />
                          )}
                        </div>
                      </ul>
                    </li>
                    {/* Price Range */}
                    <li className="ct_custom_drop_mega ct_w_100_767">
                      <a
                        href="#"
                        id="filter_price"
                        className="form-control ct_custom_price_select_dropdown ct_input ct_input_h_50 ct_w_100_767  d-flex align-items-center  gap-1 justify-content-between"
                      >
                        {t("properties_page.price_range")}
                        <i className="fa-solid fa-angle-down ms-1"></i>
                      </a>
                      <ul
                        className="ct_custom_drop_mega_menus"
                        id="ct_filter_price_drop"
                      >
                        <div className="ct_multirange_wrapper">
                          <div className="p-3">
                            <Slider
                              range
                              min={0}
                              max={100000}
                              step={100}
                              className="ct_range_slider1"
                              value={priceRange}
                              onChange={(value) => setPriceRange(value)}
                              trackStyle={[{ backgroundColor: "#ff5a3c" }]}
                              handleStyle={[
                                {
                                  borderColor: "#ff5a3c",
                                  backgroundColor: "#ff5a3c",
                                },
                                {
                                  borderColor: "#ff5a3c",
                                  backgroundColor: "#ff5a3c",
                                },
                              ]}
                            />
                            <div className="mt-2 gap-3 d-flex align-items-center justify-content-between">
                              <div>
                                <strong className="">{t("properties_page.min")}:</strong> {curSym}
                                {priceRange[0]}
                              </div>
                              <div>
                                <strong>{t("properties_page.max")}:</strong> {curSym}
                                {priceRange[1]}
                              </div>
                            </div>
                          </div>
                        </div>
                      </ul>
                    </li>
                    {/* Bed/Bath */}
                    <li className="ct_custom_drop_mega ct_w_100_767">
                      <a
                        href="#"
                        id="bed_bath"
                        className="form-control ct_custom_price_select_dropdown ct_input ct_input_h_50 ct_w_100_767  d-flex align-items-center  gap-1 justify-content-between"
                      >
                        {t("properties_page.bed_bath")}
                        <i className="fa-solid fa-angle-down ms-1"></i>
                      </a>
                      <ul className="ct_custom_drop_mega_menus" id="ct_bed_bath_drop">
                        <div className="ct_filter_scroll ct_custom_scroll ct_pe_30">
                          {Object.keys(bedBathObj || {}).length > 0 ? (
                            Object.keys(bedBathObj).map((item, ind) => {
                              return (
                                <div
                                  key={ind}
                                  className="d-flex align-items-center gap-2 justify-content-between "
                                >
                                  <div className="d-flex align-items-center gap-1">
                                    <div className="form-check ct_custom_check2">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        checked={filters.bedBath.includes(
                                          `${item == "4+" ? 5 : item}`,
                                        )}
                                        onChange={() =>
                                          handleMultiSelect(
                                            "bedBath",
                                            `${item == "4+" ? 5 : item}`,
                                          )
                                        }
                                        id="flexCheckDefault"
                                      />
                                    </div>
                                    <label
                                      for=""
                                      className="ct_fs_14 ct_fw_500 ct_text_op_6"
                                    >
                                      {`${item} ${t("properties_page.bed_bath_suffix")}`}
                                    </label>
                                  </div>
                                  <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14">
                                    {bedBathObj[item] || 0}
                                  </p>
                                </div>
                              );
                            })
                          ) : (
                            <NoRecord />
                          )}
                        </div>
                      </ul>
                    </li>
                    {/* BHK */}
                    <li className="ct_custom_drop_mega ct_w_100_767">
                      <a
                        href="#"
                        id="bhk"
                        className="form-control ct_custom_price_select_dropdown ct_input ct_input_h_50 ct_w_100_767  d-flex align-items-center  gap-1 justify-content-between"
                      >
                        {t("properties_page.bhk")}
                        <i className="fa-solid fa-angle-down ms-1"></i>
                      </a>
                      <ul className="ct_custom_drop_mega_menus" id="ct_bhk_drop">
                        <div className="ct_filter_scroll ct_custom_scroll ct_pe_30">
                          {Object.keys(bhkObj || {}).length > 0 ? (
                            Object.keys(bhkObj).map((item, ind) => {
                              return (
                                <div
                                  key={ind}
                                  className="d-flex align-items-center gap-2 justify-content-between "
                                >
                                  <div className="d-flex align-items-center gap-1">
                                    <div className="form-check ct_custom_check2">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        checked={filters.bhk.includes(
                                          `${item == "4+" ? 5 : item}`,
                                        )}
                                        onChange={() =>
                                          handleMultiSelect(
                                            "bhk",
                                            `${item == "4+" ? 5 : item}`,
                                          )
                                        }
                                        id="flexCheckDefault"
                                      />
                                    </div>
                                    <label
                                      for=""
                                      className="ct_fs_14 ct_fw_500 ct_text_op_6"
                                    >
                                      {`${item} ${t("properties_page.bhk")}`}
                                    </label>
                                  </div>
                                  <p className="mb-0 ct_fw_500 ct_text_op_6 ct_fs_14">
                                    {bhkObj[item] || 0}
                                  </p>
                                </div>
                              );
                            })
                          ) : (
                            <NoRecord />
                          )}
                        </div>
                      </ul>
                    </li>
                  </ul>
                </div>
              )}
              <div>
                <div className=" position-relative">
                  <PlaceSearchInput
                    placeholder={t("search.by_location")}
                    value={filters.location}
                    onChange={(val) => {
                      setFilters((prev) => ({
                        ...prev,
                        location: val,
                        viewport: val ? prev.viewport : null,
                      }));
                    }}
                    onSelect={
                      ({ address, lat, lng, place }) => {
                        setFilters((prev) => ({
                          ...prev,
                          location: address,
                          viewport: place?.geometry?.viewport || null,
                        }));
                      }
                    }
                    inputclassName="form-control ct_input_h_50 ct_pe_60"
                    style={{ width: "100%" }}
                  />
                  <div
                    onClick={handleFilter}
                    className="ct_search_bg_icon ct_show_eye"
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                </div>
                <div className="mt-4 row">
                  {propertyList?.length > 0 ? (
                    propertyList.map((item, index) => (
                      <div className="col-lg-4 col-md-6 mb-4" key={index}>
                        <figure className="ct_apartmen_card ct_apartmen_card_bg d-grid h-100 ">
                          <div>
                            <div className="ct_aprtment_img">
                              <img
                                loading="lazy"
                                src={
                                  item?.propertyImage?.length
                                    ? item?.propertyImage[0]?.image
                                    : ""
                                }
                                alt=""
                                className="ct_img_h_280 ct_border_radius_10"
                              />
                              <div
                                className="ct_like_icon"
                                onClick={() => {
                                  handleWishlist(item);
                                }}
                              >
                                <i
                                  className={`fa-${item?.is_wishlist ? "solid text-danger" : "regular"} fa-heart`}
                                ></i>
                                
                              </div>
                            </div>
                            <figcaption className="mt-4">
                              <h4 className="ct_fs_16 ct_fw_600 mb-2 ct_overlay_text w-100">
                                {item?.property_title || "#N/A"}
                              </h4>
                              <p className="ct_fs_14 mb-0">
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7.05534 0.5C6.21534 0.5 5.43756 0.71 4.72201 1.13C4.00645 1.55 3.43867 2.11778 3.01867 2.83333C2.59867 3.54889 2.38867 4.31111 2.38867 5.12C2.38867 5.92889 2.57534 6.69111 2.94867 7.40667L6.82201 14.36C6.85312 14.4533 6.93089 14.5 7.05534 14.5C7.17978 14.5 7.25756 14.4533 7.28867 14.36L11.162 7.36C11.5353 6.67556 11.722 5.92889 11.722 5.12C11.722 4.31111 11.512 3.54889 11.092 2.83333C10.672 2.11778 10.1042 1.55 9.38867 1.13C8.67312 0.71 7.89534 0.5 7.05534 0.5ZM7.05534 7.5C6.40201 7.5 5.84978 7.27444 5.39867 6.82333C4.94756 6.37222 4.72201 5.82 4.72201 5.16667C4.72201 4.51333 4.94756 3.96111 5.39867 3.51C5.84978 3.05889 6.40201 2.83333 7.05534 2.83333C7.70867 2.83333 8.26089 3.05889 8.71201 3.51C9.16312 3.96111 9.38867 4.51333 9.38867 5.16667C9.38867 5.82 9.16312 6.37222 8.71201 6.82333C8.26089 7.27444 7.70867 7.5 7.05534 7.5Z"
                                    fill="#FF8000"
                                  />
                                </svg>
                                {item?.address || "#N/A"}
                              </p>
                              <ul className="d-flex align-items-center gap-2 flex-wrap mt-2">
                                <li>
                                  <p className="ct_fs_14 mb-0 ct_text_op_6">
                                    <span className="ct_fw_700">
                                      {item?.bedrooms || 0}
                                    </span>{' '}
                                    {item?.bedrooms === 1 ? t("properties_page.bed") : t("properties_page.beds")}
                                  </p>
                                </li>
                                <li>
                                  <p className="ct_fs_14 mb-0 ct_text_op_6">
                                    <span className="ct_fw_700">
                                      {item?.bathrooms || 0}
                                    </span>
                                    {' '}
                                    {item?.bathrooms === 1 ? t("properties_page.bath") : t("properties_page.baths")}
                                  </p>
                                </li>
                                <li>
                                  <p className="ct_fs_14 mb-0 ct_text_op_6">
                                    <span className="ct_fw_700">
                                      {item?.floor || 0}
                                    </span>
                                    {' '}
                                    {t("properties_page.sq_ft")}
                                  </p>
                                </li>
                              </ul>
                            </figcaption>
                          </div>
                          <div className="mt-auto px-3 pb-3">
                            <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap mt-0 ct_border_top_1 pt-3">
                              <div>
                                <h5 className="ct_fs_16  mb-0">
                                  <span className="ct_fw_700">
                                    {curSym}
                                    {(
                                      item?.monthly_rent -
                                      (item?.monthly_rent * (item?.offer_value || 0)) /
                                      100
                                    ).toFixed(2)}
                                  </span>
                                  /{t("table.month")}
                                </h5>
                                {Number(item?.offer_value) > 0 && (
                                  <div className="mb-1">
                                    <del className="text-muted ct_fs_16 ms-1">
                                      {" "}
                                      {item?.monthly_rent || 0}
                                    </del>
                                    <span className="ms-1 ct_orange_text ct_fs_14">
                                      ({item?.offer_value}% OFF)
                                    </span>
                                  </div>
                                )}
                              </div>
                              <a
                                href={`/${lang || "en"}/l/${item?.property_id}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigate(`l/${item?.property_id}`);
                                }}
                                className="ct_fs_16 ct_fw_600 mb-0 ct_orange_text"
                              >
                                {t("properties_page.view_details")}
                              </a>
                            </div>
                          </div>
                        </figure>
                      </div>
                    ))
                  ) : (
                    <NoRecord />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="ct_custom_sticky_sec" onClick={() => document.getElementById("ai-bar-section")?.scrollIntoView({ behavior: "smooth" })}>
        <div>
          <svg width="36" height="36" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.6247 10.6039C20.3018 7.29136 18.3434 2.08301 12.2914 2.08301C6.23928 2.08301 4.28093 7.29136 3.95803 10.6039C2.82522 11.0338 2.078 12.1214 2.08303 13.333V14.7914C2.08303 16.4022 3.38889 17.708 4.99968 17.708C6.61052 17.708 7.91638 16.4021 7.91638 14.7914V13.333C7.91111 12.1475 7.19138 11.0823 6.09343 10.6351C6.30178 8.71841 7.32263 4.16636 12.2914 4.16636C17.2601 4.16636 18.2705 8.71841 18.4789 10.6351C17.3832 11.0833 16.6671 12.1492 16.6664 13.333V14.7914C16.6686 15.3402 16.8251 15.8773 17.118 16.3414C17.4108 16.8056 17.8282 17.1781 18.3226 17.4164C17.8851 18.2393 16.7705 19.3539 14.0309 19.6872C13.4833 18.8556 12.4238 18.5278 11.5022 18.9048C10.5807 19.2817 10.0547 20.2582 10.2469 21.2351C10.439 22.2121 11.2957 22.9164 12.2914 22.9164C12.6772 22.9142 13.0548 22.805 13.3822 22.6008C13.7096 22.3967 13.9738 22.1056 14.1455 21.7601C18.6143 21.2497 20.0414 18.9476 20.4893 17.5934C21.7011 17.2009 22.516 16.065 22.4997 14.7914V13.333C22.5047 12.1214 21.7575 11.0338 20.6247 10.6039ZM5.83303 14.7914C5.83303 15.2516 5.45994 15.6247 4.99968 15.6247C4.53943 15.6247 4.16638 15.2516 4.16638 14.7914V13.333C4.16554 13.223 4.18647 13.114 4.22798 13.0121C4.26948 12.9103 4.33072 12.8177 4.40819 12.7396C4.48565 12.6616 4.5778 12.5996 4.67933 12.5573C4.78085 12.515 4.88973 12.4933 4.99971 12.4933C5.10968 12.4933 5.21857 12.515 5.32009 12.5573C5.42161 12.5996 5.51376 12.6616 5.59123 12.7396C5.66869 12.8177 5.72994 12.9103 5.77144 13.0121C5.81294 13.114 5.83388 13.223 5.83303 13.333V14.7914ZM18.7497 13.333C18.7497 12.8728 19.1228 12.4997 19.583 12.4997C20.0433 12.4997 20.4164 12.8728 20.4164 13.333V14.7914C20.4164 15.2516 20.0433 15.6247 19.583 15.6247C19.1228 15.6247 18.7497 15.2516 18.7497 14.7914V13.333Z" fill="#ff7f00"></path></svg>
        </div>
      </div> */}
      <section className="my-5 pb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <AIBar placeholder={t("ai_discovery_banner.placeholder")} />
            </div>
          </div>
        </div>
      </section>
      <WebFooter />
    </>
  );
};

export default Properties;

import { curSym, testimonialData } from "../../utils/pip";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import WebHeader from "../../layout/WebHeader";
import { webPath } from "../../../user/routes";
import WebFooter from "../../layout/WebFooter";
import WebSubHeader from "../../layout/WebSubHeader";
import Overview from "../../components/pages/apartment/Overview";
import RentNdDeposite from "../../components/pages/apartment/RentNdDeposite";
import CustomSwiper from "../../components/swiper";

const ApartmentDetails = () => {
  const navigate = useLocalizedNavigate();
  const appartmentData = [
    {
      image:
        "https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_1.png",
    },
    {
      image:
        "https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_1.png",
    },
    {
      image:
        "https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_1.png",
    },
    {
      image:
        "https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_1.png",
    },
  ];
  return (
    <>
      {/* Header Section S */}
      <WebHeader />
      <WebSubHeader
        lebel={"Apartments Details"}
        desc={
          "Explore full details, check availability, and book your ideal apartment with everything you need for a comfortable mid-term stay."
        }
      />

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex  align-items-center justify-content-between gap-3 mb-4 ct_flex_col_575">
                <h4 className="ct_fs_24 ct_fw_600 mb-0">New Apartment Nice View</h4>
                <div className="d-flex align-items-center gap-3 ">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="ct_fs_14 text-dark ct_fw_500"
                  >
                    <i className="fa-solid fa-arrow-up-from-bracket me-1"></i>
                    Share
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className="ct_fs_14 text-dark ct_fw_500"
                  >
                    <i className="fa-regular fa-heart me-1"></i>
                    Save
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <div className="ct_gallery">
                <div className="ct_gallery_left">
                  <img loading="lazy"
                    src="https://app.flexsirent.com/assets/img/apartments/apartment_detail_big_ing.png"
                    alt="Main"
                  />
                </div>
                <div className="ct_gallery_right">
                  <img loading="lazy"
                    src="https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_1.png"
                    alt="Bathroom"
                  />
                  <img loading="lazy"
                    src="https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_2.png"
                    alt="Kitchen"
                  />
                  <img loading="lazy"
                    src="https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_3.png"
                    alt="Bed"
                  />
                  <img loading="lazy"
                    src="https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_4.png"
                    alt="Couch"
                  />
                  <button
                    className="ct_show_all_images_btn"
                    data-bs-toggle="modal"
                    data-bs-target="#ct_show_all_photos"
                  >
                    <i className="fa-regular fa-image me-1"></i>
                    Show all Photos
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="ct_outline_border px-4 pt-5 pb-3">
                <ul className="d-flex align-items-center justify-content-around ct_aprtment_detail_prices_card mb-3">
                  <li>
                    <h4 className="ct_fs_24 ct_fw_600 mb-0">{curSym}2800</h4>
                    <p className="mb-0 ct_text_op_6">Rent/Month</p>
                  </li>
                  <li>
                    <h4 className="ct_fs_24 ct_fw_600 mb-0">{curSym}2800</h4>
                    <p className="mb-0 ct_text_op_6">Deposit</p>
                  </li>
                </ul>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="ct_mov_in_out_card">
                      <p className="ct_fs_14 mb-0 ct_text_op_6 mb-1">Check In</p>
                      <h4 className="ct_fs_16 ct_fw_600 mb-0">22-May-2025</h4>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="ct_mov_in_out_card">
                      <p className="ct_fs_14 mb-0 ct_text_op_6 mb-1">Check Out</p>
                      <h4 className="ct_fs_16 ct_fw_600 mb-0">22-May-2025</h4>
                    </div>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <select className="form-control ct_input ct_input_h_50">
                    <option value="">Select Guests</option>
                    <option value="">Guest 1</option>
                    <option value="">Guest 2</option>
                    <option value="">Guest 3</option>
                  </select>
                </div>
                <div className="mb-3 d-flex align-items-center justify-content-between gap-3">
                  <p className="mb-0 ct_fs_14 ct_fw_500">
                    Total to Pay Per Booking Request
                    <svg
                      width="20"
                      height="19"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.834 16V12M12.834 8H12.844M22.834 12C22.834 17.5228 18.3568 22 12.834 22C7.31114 22 2.83398 17.5228 2.83398 12C2.83398 6.47715 7.31114 2 12.834 2C18.3568 2 22.834 6.47715 22.834 12Z"
                        stroke="#0D0D0D"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </p>
                  <p className="mb-0 ct_fs_14 ct_fw_600 ct_orange_text ct_white_nowrap">
                    {curSym}12344
                  </p>
                </div>
                <div className="mt-3">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(webPath?.BookApartment);
                    }}
                    className="ct_orange_btn"
                  >
                    Continue Booking
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="ct_white_bg ct_box_shadow p-4 mt-4">
            <ul className="ct_footer_link ct_apartment_detail_section_links">
              <li>
                <a href="#overview" className="active">
                  Overview
                </a>
              </li>
              <li>
                <a href="#rent-&-deposit">Rent & Deposit</a>
              </li>
              <li>
                <a href="#cancellation-policies">Cancellation Policies</a>
              </li>
              <li>
                <a href="#house-rules">House Rules</a>
              </li>
              <li>
                <a href="#landlord">Landlord</a>
              </li>
              <li>
                <a href="#availabilities">Availabilities</a>
              </li>
              <li>
                <a href="#getting-around">Getting Around</a>
              </li>
            </ul>
          </div>

          {/* Overview */}
          <Overview />

          {/* Rent & Deposit */}
          <RentNdDeposite />

          <div
            className="ct_white_bg ct_box_shadow p-4 mt-4"
            id="cancellation-policies"
          >
            <div className="d-flex ct_flex_col_575  align-items-center justify-content-between gap-3">
              <h4 className="ct_fs_20 ct_fw_600">Cancellation Policies</h4>
              <a
                href="cancellation-policy.html"
                className="ct_orange_link ct_white_nowrap"
              >
                View Details
                <i className="fa-solid fa-arrow-right ms-1"></i>
              </a>
            </div>
            <div className="mt-3">
              {/* <div dangerouslySetInnerHTML={{ __html: policyData }}></div> */}
              <h6 className="ct_fs_16 ct_fw_600">Moderate</h6>
              <p className="mb-0 ct_fs_14">
                Cancel up to 30 days prior to arrival and get a 100% refund
              </p>
            </div>
          </div>
          <div className="ct_white_bg ct_box_shadow p-4 mt-4 " id="house-rules">
            <h4 className="ct_fs_20 ct_fw_600">House Rules</h4>
            <div className="ct_mt_30">
              <ul className="ct_para_scroll ct_custom_scroll ct_amenties_list mt-4 ct_pe_30">
                <li>
                  <img loading="lazy"
                    src="https://app.flexsirent.com/assets/img/house_rule_icon_1.png"
                    alt=""
                  />
                  Check-In: 4PM-9PM
                </li>
                <li>
                  <img loading="lazy"
                    src="https://app.flexsirent.com/assets/img/house_rule_icon_2.png"
                    alt=""
                  />
                  No Parties or Events
                </li>
                <li>
                  <img loading="lazy"
                    src="https://app.flexsirent.com/assets/img/house_rule_icon_3.png"
                    alt=""
                  />
                  Quiet Hours: 10:00 PM – 8:00 AM
                </li>
                <li>
                  <img loading="lazy"
                    src="https://app.flexsirent.com/assets/img/house_rule_icon_4.png"
                    alt=""
                  />
                  Pets Not Allowed
                </li>
                <li>
                  <img loading="lazy"
                    src="https://app.flexsirent.com/assets/img/house_rule_icon_5.png"
                    alt=""
                  />
                  Keep Shared Spaces Clean
                </li>
                <li>
                  <img loading="lazy"
                    src="https://app.flexsirent.com/assets/img/house_rule_icon_6.png"
                    alt=""
                  />
                  Max 2 Visitors Allowed During The Day
                </li>
                <li>
                  <img loading="lazy"
                    src="https://app.flexsirent.com/assets/img/house_rule_icon_7.png"
                    alt=""
                  />
                  Report Any Damage Immediately
                </li>
              </ul>
            </div>
          </div>
          <div className="ct_white_bg ct_box_shadow p-4 mt-4" id="landlord">
            <div className="d-flex ct_flex_col_575  align-items-center justify-content-between gap-3">
              <h4 className="ct_fs_20 ct_fw_600">Professional Landlord</h4>
              <a
                href="javascript:void(0)"
                data-bs-toggle="modal"
                data-bs-target="#ct_contact_host"
                className="ct_orange_link ct_white_nowrap"
              >
                Contact Host
                <i className="fa-solid fa-arrow-right ms-1"></i>
              </a>
            </div>
            <p className="mb-0 ct_fs_14 mt-2">
              In Rentalaria as rental experts, we take our work extremely
              seriously. We understand that only through daily effort can we
              maintain our position as the undisputed leaders in the sector. Our
              goal is to remain the most dynamic Rental Management Agency in
              Málaga for many years to come.
            </p>
            <div className="row ct_mt_30 align-items-center">
              <div className="col-lg-3 mb-4 mb-lg-0">
                <div className="d-flex align-items-center gap-3 ">
                  <div className="ct_landloard_user">
                    <img loading="lazy"
                      src="https://app.flexsirent.com/assets/img/user_5.png"
                      alt=""
                    />
                    <img loading="lazy"
                      src="https://app.flexsirent.com/assets/img/verify_icon.png"
                      alt=""
                    />
                  </div>
                  <h4 className="mb-0 ct_fs_22 ct_fw_600 ct_white_nowrap">
                    Retanlaria
                  </h4>
                </div>
              </div>
              <div className="col-lg-9 mb-4 mb-lg-0">
                <ul className="ct_landloard_right_info">
                  <li className="ps-0">
                    <h5 className="ct_fs_24 ct_fw_600 mb-1">86</h5>
                    <p className="mb-0 ct_fs_14">Reviews</p>
                  </li>
                  <li>
                    <h5 className="ct_fs_24 ct_fw_600 mb-1">
                      4.97
                      <i className="fa-solid fa-star ms-1"></i>
                    </h5>
                    <p className="mb-0 ct_fs_14">Ratings</p>
                  </li>
                  <li>
                    <h5 className="ct_fs_24 ct_fw_600 mb-1">2</h5>
                    <p className="mb-0 ct_fs_14">Years hosting</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="ct_white_bg ct_box_shadow p-4 mt-4" id="availabilities">
            <h4 className="ct_fs_20 ct_fw_600">Availabilities</h4>
            <div className="row">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <table className="table mt-4 ct_avalable_table">
                  <tr>
                    <thead>
                      <tr>
                        <td className="ct_fw_600 py-2">Available From</td>
                        <td className="text-end py-2">Available Now!</td>
                      </tr>
                      <tr>
                        <td className="ct_fw_600 py-2">Min. Stay</td>
                        <td className="text-end py-2">1 Month (30 Days).</td>
                      </tr>
                      <tr>
                        <td className="ct_fw_600 py-2">Max. Stay</td>
                        <td className="text-end py-2">No Maximum Stay</td>
                      </tr>
                      <tr>
                        <td className="ct_fw_600 py-2">Calendar Updated</td>
                        <td className="text-end py-2">
                          (Calendar Updated 14 Days)
                        </td>
                      </tr>
                      <tr>
                        <td className="ct_fw_600 py-2">Booking window</td>
                        <td className="text-end py-2">
                          Landlord only accepts check- ins within 60 days
                        </td>
                      </tr>
                    </thead>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="ct_white_bg ct_box_shadow p-4 mt-4" id="getting-around">
            <h4 className="ct_fs_20 ct_fw_600">Getting Around</h4>
            <h6 className="mb-0 ct_fs_16 ct_fw_600 mt-3">
              Stay connected to transport, shops, and city essentials with ease.
            </h6>
            <div className="row mt-4">
              <div className="col-md-5">
                <div>
                  <p>
                    <span className="ct_fw_600">Bus Stop:</span>2 Min Walk
                  </p>
                </div>
              </div>
              <div className="col-md-5">
                <div>
                  <p>
                    <span className="ct_fw_600">Nearby University:</span>
                    10 Min Walk
                  </p>
                </div>
              </div>
              <div className="col-md-5">
                <div>
                  <p>
                    <span className="ct_fw_600">Metro Station:</span>5 Min Walk
                  </p>
                </div>
              </div>
              <div className="col-md-5">
                <div>
                  <p>
                    <span className="ct_fw_600">Supermarket:</span>
                    200m
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="ct_white_bg ct_box_shadow p-4 mt-4">
            <h4 className="ct_fs_20 ct_fw_600">User Reviews</h4>
            <CustomSwiper
              data={testimonialData}
              className="ct_testimonial_slider ct_mt_60"
              swiperProps={{
                slidesPerView: 3,
                spaceBetween: 20,
                loop: true,
                pagination: false,
                navigation: true,
                breakpoints: {
                  0: { slidesPerView: 1 },
                  576: {
                    slidesPerView: 1,
                  },
                  1200: { slidesPerView: 1 },
                },
              }}
              renderSlide={(item) => (
                <div className="ct_testimonial_slide_card">
                  <div
                    style={{
                      maxWidth: 'calc(100% - 50px)',
                      margin: '0 auto',
                    }}
                  >
                    <div className="d-flex align-items-center gap-2 mb-3 justify-content-center">
                      <i className="fa-solid fa-star ct_star_active"></i>
                      <i className="fa-solid fa-star ct_star_active"></i>
                      <i className="fa-solid fa-star ct_star_active"></i>
                      <i className="fa-solid fa-star ct_star_active"></i>
                      <i className="fa-solid fa-star ct_star_active"></i>
                    </div>
                    <p className="">
                      "I stayed here for three months during my Erasmus program,
                      and it felt just like home. The apartment was clean,
                      well-equipped, and the landlord was super responsive and
                      friendly. The Wi-Fi was fast enough for my online classes,
                      and the kitchen had everything I needed to cook daily. The
                      metro station was just a short walk away, and there were
                      grocery stores, cafés, and a gym nearby, which made life
                      super convenient. The neighborhood felt safe and quiet,
                      especially at night. I didn’t face any issues during my
                      stay, and the move-in process was smooth and stress-free.
                      Highly recommend it for students or anyone staying
                      mid-term!"
                    </p>
                    <p className="">
                      "I stayed here for three months during my Erasmus program,
                      and it felt just like home.
                    </p>
                    <div className="d-flex align-items-center gap-2 justify-content-center pt-4">
                      <div className="ct_client_user_img">
                        <img loading="lazy"
                          src="https://app.flexsirent.com/assets/img/user_1.jpg"
                          alt=""
                        />
                      </div>
                      <div>
                        <h5 className="ct_fs_18 ct_fw_600 mb-1">Kristin Watson</h5>
                        <p className="mb-0">New Mexico 31134</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            />
            {/* <div className="owl-carousel owl-theme ct_user_slider mt-4">
              <div className="item">
                <div className="ct_testimonial_slide_card">
                  <div className="d-flex align-items-center gap-2 mb-3 justify-content-center">
                    <i className="fa-solid fa-star ct_star_active"></i>
                    <i className="fa-solid fa-star ct_star_active"></i>
                    <i className="fa-solid fa-star ct_star_active"></i>
                    <i className="fa-solid fa-star ct_star_active"></i>
                    <i className="fa-solid fa-star ct_star_active"></i>
                  </div>
                  <p className="">
                    "I stayed here for three months during my Erasmus program,
                    and it felt just like home. The apartment was clean,
                    well-equipped, and the landlord was super responsive and
                    friendly. The Wi-Fi was fast enough for my online classes,
                    and the kitchen had everything I needed to cook daily. The
                    metro station was just a short walk away, and there were
                    grocery stores, cafés, and a gym nearby, which made life
                    super convenient. The neighborhood felt safe and quiet,
                    especially at night. I didn’t face any issues during my
                    stay, and the move-in process was smooth and stress-free.
                    Highly recommend it for students or anyone staying
                    mid-term!"
                  </p>
                  <p className="">
                    "I stayed here for three months during my Erasmus program,
                    and it felt just like home.
                  </p>
                  <div className="d-flex align-items-center gap-2 justify-content-center pt-4">
                    <div className="ct_client_user_img">
                      <img  loading="lazy" src="https://app.flexsirent.com/assets/img/user_1.jpg" alt="" />
                    </div>
                    <div>
                      <h5 className="ct_fs_18 ct_fw_600 mb-1">Kristin Watson</h5>
                      <p className="mb-0">New Mexico 31134</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="ct_testimonial_slide_card">
                  <div className="d-flex align-items-center gap-2 mb-3 justify-content-center">
                    <i className="fa-solid fa-star ct_star_active"></i>
                    <i className="fa-solid fa-star ct_star_active"></i>
                    <i className="fa-solid fa-star ct_star_active"></i>
                    <i className="fa-solid fa-star ct_star_active"></i>
                    <i className="fa-solid fa-star ct_star_active"></i>
                  </div>
                  <p className="">
                    "I stayed here for three months during my Erasmus program,
                    and it felt just like home. The apartment was clean,
                    well-equipped, and the landlord was super responsive and
                    friendly. The Wi-Fi was fast enough for my online classes,
                    and the kitchen had everything I needed to cook daily. The
                    metro station was just a short walk away, and there were
                    grocery stores, cafés, and a gym nearby, which made life
                    super convenient. The neighborhood felt safe and quiet,
                    especially at night. I didn’t face any issues during my
                    stay, and the move-in process was smooth and stress-free.
                    Highly recommend it for students or anyone staying
                    mid-term!"
                  </p>
                  <p className="">
                    "I stayed here for three months during my Erasmus program,
                    and it felt just like home.
                  </p>
                  <div className="d-flex align-items-center gap-2 justify-content-center pt-4">
                    <div className="ct_client_user_img">
                      <img  loading="lazy" src="https://app.flexsirent.com/assets/img/user_1.jpg" alt="" />
                    </div>
                    <div>
                      <h5 className="ct_fs_18 ct_fw_600 mb-1">Kristin Watson</h5>
                      <p className="mb-0">New Mexico 31134</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="ct_testimonial_slide_card">
                  <div className="d-flex align-items-center gap-2 mb-3 justify-content-center">
                    <i className="fa-solid fa-star ct_star_active"></i>
                    <i className="fa-solid fa-star ct_star_active"></i>
                    <i className="fa-solid fa-star ct_star_active"></i>
                    <i className="fa-solid fa-star ct_star_active"></i>
                    <i className="fa-solid fa-star ct_star_active"></i>
                  </div>
                  <p className="">
                    "I stayed here for three months during my Erasmus program,
                    and it felt just like home. The apartment was clean,
                    well-equipped, and the landlord was super responsive and
                    friendly. The Wi-Fi was fast enough for my online classes,
                    and the kitchen had everything I needed to cook daily. The
                    metro station was just a short walk away, and there were
                    grocery stores, cafés, and a gym nearby, which made life
                    super convenient. The neighborhood felt safe and quiet,
                    especially at night. I didn’t face any issues during my
                    stay, and the move-in process was smooth and stress-free.
                    Highly recommend it for students or anyone staying
                    mid-term!"
                  </p>
                  <p className="">
                    "I stayed here for three months during my Erasmus program,
                    and it felt just like home.
                  </p>
                  <div className="d-flex align-items-center gap-2 justify-content-center pt-4">
                    <div className="ct_client_user_img">
                      <img  loading="lazy" src="https://app.flexsirent.com/assets/img/user_1.jpg" alt="" />
                    </div>
                    <div>
                      <h5 className="ct_fs_18 ct_fw_600 mb-1">Kristin Watson</h5>
                      <p className="mb-0">New Mexico 31134</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="ct_testimonial_slide_card">
                  <div className="d-flex align-items-center gap-2 mb-3 justify-content-center">
                    <i className="fa-solid fa-star ct_star_active"></i>
                    <i className="fa-solid fa-star ct_star_active"></i>
                    <i className="fa-solid fa-star ct_star_active"></i>
                    <i className="fa-solid fa-star ct_star_active"></i>
                    <i className="fa-solid fa-star ct_star_active"></i>
                  </div>
                  <p className="">
                    "I stayed here for three months during my Erasmus program,
                    and it felt just like home. The apartment was clean,
                    well-equipped, and the landlord was super responsive and
                    friendly. The Wi-Fi was fast enough for my online classes,
                    and the kitchen had everything I needed to cook daily. The
                    metro station was just a short walk away, and there were
                    grocery stores, cafés, and a gym nearby, which made life
                    super convenient. The neighborhood felt safe and quiet,
                    especially at night. I didn’t face any issues during my
                    stay, and the move-in process was smooth and stress-free.
                    Highly recommend it for students or anyone staying
                    mid-term!"
                  </p>
                  <p className="">
                    "I stayed here for three months during my Erasmus program,
                    and it felt just like home.
                  </p>
                  <div className="d-flex align-items-center gap-2 justify-content-center pt-4">
                    <div className="ct_client_user_img">
                      <img  loading="lazy" src="https://app.flexsirent.com/assets/img/user_1.jpg" alt="" />
                    </div>
                    <div>
                      <h5 className="ct_fs_18 ct_fw_600 mb-1">Kristin Watson</h5>
                      <p className="mb-0">New Mexico 31134</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="ct_white_bg ct_box_shadow p-4 mt-4">
            <h4 className="ct_fs_20 ct_fw_600">Rate Your Experience</h4>
            <div className="d-flex align-items-center gap-2 mb-3 mt-4">
              <i className="fa-solid fa-star  ct_fs_24 ct_star_active"></i>
              <i className="fa-solid fa-star ct_text_clr_ccc ct_fs_24 "></i>
              <i className="fa-solid fa-star ct_text_clr_ccc ct_fs_24 "></i>
              <i className="fa-solid fa-star ct_text_clr_ccc ct_fs_24 "></i>
              <i className="fa-solid fa-star ct_text_clr_ccc ct_fs_24 "></i>
            </div>
            <form action="" className="mt-4">
              <div className="form-group">
                <label for="" className="mb-2 ct_fw_600">
                  Comments
                </label>
                <textarea
                  className="form-control ct_input h-auto ct_input_grey"
                  placeholder="Tell Us What You Liked...Or Didn’t"
                  rows="6"
                ></textarea>
              </div>
              <div className="mt-4">
                <button className="ct_orange_btn">Submit</button>
              </div>
            </form>
          </div>
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
              <h4 className="ct_fs_20 ct_fw_600 mb-0">All Photos</h4>
              <button
                type="button"
                className="btn-close "
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="owl-carousel owl-theme ct_product_gallary_slider">
                {/* <CustomSwiper
                  data={appartmentData}
                  className="ct_testimonial_slider ct_mt_60"
                  swiperProps={{
                    slidesPerView: 1,
                    spaceBetween: 20,
                    loop: true,
                    pagination: false,
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
                        <img  loading="lazy"
                          src="https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_1.png"
                          alt=""
                        />
                      </div>
                    </div>
                  )}
                /> */}
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
                        <img loading="lazy"
                          src="https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_1.png"
                          alt=""
                        />
                      </div>
                    </div>
                  )}
                />
                {/* <div className="item">
                  <div className="ct_product_gallry_img">
                    <img  loading="lazy"
                      src="https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_1.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="item">
                  <div className="ct_product_gallry_img">
                    <img  loading="lazy"
                      src="https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_1.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="item">
                  <div className="ct_product_gallry_img">
                    <img  loading="lazy"
                      src="https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_1.png"
                      alt=""
                    />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer section S */}
      <WebFooter />
    </>
  );
};

export default ApartmentDetails;

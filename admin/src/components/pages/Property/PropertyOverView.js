import {
  curSym,
  getAmenityIcon,
  getHouseRulesIcon,
  getOtherIcon,
  getSaftyAmenityIcon,
  pipViewDate,
} from "../../../utills/pip";
import CustomSwiper from "../../../shared/components/swiper";

const   PropertyOverView = ({ data = {} }) => {
  const propertyImages = data?.propertyImage || [];
  const monthlyRent = Number(data?.monthly_rent) || 0;
  const offerValue = Number(data?.offer_value) || 0;

  const discountedPrice =
    offerValue > 0
      ? monthlyRent - (monthlyRent * offerValue) / 100
      : monthlyRent;
  return (
    <>
      <div className="row ct_mt_40">
        <div className="col-lg-7 mb-4 mb-lg-0">
          {propertyImages?.length > 0 && (
            <div className="ct_gallery p-0">
              <div className="ct_gallery_left">
                <img loading="lazy" src={propertyImages[0]?.image} alt="Main" />
              </div>

              {propertyImages.length > 1 && (
                <div className="ct_gallery_right">
                  {propertyImages.slice(1, 4).map((img, index) => (
                    <img
                      loading="lazy"
                      key={index}
                      src={img?.image}
                      alt={`Gallery-${index + 1}`}
                    />
                  ))}

                  {propertyImages.length > 0 && (
                    <button
                      className="ct_show_all_images_btn"
                      data-bs-toggle="modal"
                      data-bs-target="#ct_show_all_photos"
                    >
                      <i className="fa-regular fa-image me-1"></i>
                      Show all Photos
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="col-lg-5 mb-4 mb-lg-0">
          <h4 className="ct_fs_20 ct_fw_600 mb-3">
            {/* Luxury Downtown Apartment */}
            {data?.property_title || "Luxury Downtown Apartment"}
          </h4>
          <ul>
            <li>
              <img
                loading="lazy"
                src="assets/img/lsicon_building-outline.svg"
                alt=""
                className="me-1"
              />
              {/* Apartment */}
              {data?.category_name || "Apartment"}
            </li>
            <li className="mt-3">
              <img
                loading="lazy"
                src="assets/img/ep_location.svg"
                alt=""
                className="me-1"
              />
              {data?.address || "123 Main St, New York"}
            </li>
            <li className="mt-3">
              <img
                loading="lazy"
                src="assets/img/lets-icons_calendar-light.svg"
                alt=""
                className="me-1"
              />
              {pipViewDate(data?.available_from) || "15 January 2025"}
            </li>
          </ul>
          <div class="ct_mt_40">
            <h4 class="ct_fs_20 ct_fw_600 mb-3">Pricing Details</h4>
            {data?.monthly_rent && (
              <div class="d-flex align-items-center gap-4">
                <p class="ct_text_clr_4B5563 mb-0">
                  Monthly Rent{" "}
                  <small>
                    ({data?.monthly_rent_type == 1 ? "per person" : "fixed"})
                  </small>{" "}
                </p>
                <p className="mb-0">
                  {curSym}
                  {discountedPrice.toFixed(2)}

                  {offerValue > 0 && (
                    <>
                      <del className="ms-2 text-muted ct_fs_14">
                        {curSym}
                        {monthlyRent.toFixed(2)}
                      </del>
                      <span className="ms-2 ct_orange_text ct_fs_14">
                        ({offerValue}% OFF)
                      </span>
                    </>
                  )}
                </p>
              </div>
            )}
            {data?.cleaning_fee && (
              <div class="d-flex align-items-center gap-4 mt-3">
                <p class="ct_text_clr_4B5563 mb-0">
                  Cleaning Fee{" "}
                  <small>
                    ({data?.cleaning_fee_type == 1 ? "per person" : "fixed"})
                  </small>{" "}
                </p>
                <p class="mb-0">
                  {curSym}
                  {data?.cleaning_fee}
                </p>
              </div>
            )}
            {data?.security_deposit && (
              <div class="d-flex align-items-center gap-4 mt-3">
                <p class="ct_text_clr_4B5563 mb-0">Security Deposit</p>
                <p class="mb-0">
                  {curSym}
                  {data?.security_deposit}{" "}
                  <span class="ct_text_op_6">(held until checkout)</span>
                </p>
              </div>
            )}
          </div>
          <div className="mt-4 d-none">
            <a href="../user/apartments.html" className="ct_dark_blue_btn">
              View on Site
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {data?.property_description && (
            <div className="ct_light_blue_outline ct_mt_40 pe-0">
              <h4 className="ct_fs_24 ct_fw_600 mb-3 ct_pe_40">About</h4>
              <p className="ct_para_scroll ct_pe_40 ct_custom_scroll">
                {data?.property_description}
              </p>
            </div>
          )}
          {data?.video_url && (
            <div className="ct_light_blue_outline ct_mt_40 ">
              <h4 className="ct_fs_24 ct_fw_600 mb-3 ct_pe_40">
                Property Video
              </h4>
              <video
                controls
                className="ct_uploded_img position-relative ct_border_radius_10"
                style={{
                  maxHeight: "200px",
                  width: "100%",
                  objectFit: "cover",
                }}
              >
                <source src={data?.video_url} />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          <div className="ct_light_blue_outline ct_mt_40 pe-0">
            <div className="row">
              <div className="col-xl-6 mb-4 mb-xl-0">
                <h4 className="ct_fs_24 ct_fw_600 mb-3 ct_pe_40">Ameneties</h4>
                <ul className="ct_para_scroll ct_custom_scroll ct_amenties_list mt-4 ct_pe_40">
                  {data?.amenities_label?.map((item, index) => (
                    <li key={index}>
                      <img
                        loading="lazy"
                        src={`assets/img/${getAmenityIcon(
                          item?.title,
                        )}`}
                        alt={""}
                      />
                      {item?.title}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-xl-6 mb-4 mb-xl-0">
                <h4 className="ct_fs_24 ct_fw_600 mb-3 ct_pe_40">
                  Safety Amenities
                </h4>
                <ul className="ct_para_scroll ct_custom_scroll ct_amenties_list mt-4 ct_pe_40">
                  {data?.safety_amenities_label?.map((item, index) => (
                    <li key={index}>
                      <img
                        loading="lazy"
                        src={`assets/img/${getSaftyAmenityIcon(
                          item?.title,
                        )}`}
                        alt={""}
                      />
                      {item?.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="ct_light_blue_outline ct_mt_40 pe-0">
            <h4 className="ct_fs_24 ct_fw_600 mb-3 ct_pe_40">Other Details</h4>
            <ul className="ct_para_scroll ct_custom_scroll d-flex align-items-center gap-3 flex-wrap mt-4 ct_pe_40">
              {data?.category_name && (
                <li>
                  <span className="ct_light_grey_badge">
                    <img
                      loading="lazy"
                      className="ct_icon_w_25"
                      src={`assets/img/${getOtherIcon(
                        data?.category_name,
                      )}`}
                      alt=""
                    />
                    {data?.category_name}
                  </span>
                </li>
              )}
              {data?.floor && (
                <li>
                  <span className="ct_light_grey_badge">
                    <img
                      loading="lazy"
                      className="ct_icon_w_25"
                      src={`assets/img/${getOtherIcon(
                        "floor",
                      )}`}
                      alt=""
                    />
                    {data?.floor}
                  </span>
                </li>
              )}

              {data?.ideal_for_label?.length > 0 &&
                data?.ideal_for_label?.map((item, index) => (
                  <li key={index}>
                    <span className="ct_light_grey_badge">
                      <img
                        loading="lazy"
                        className="ct_icon_w_25"
                        src={`assets/img/${getOtherIcon(
                          item?.title,
                        )}`}
                        alt=""
                      />
                      {item?.title}
                    </span>
                  </li>
                ))}

              <li>
                <span className="ct_light_grey_badge">
                  <img
                    loading="lazy"
                    src="assets/img/cil_room.svg"
                    alt=""
                  />
                  {`${data?.bedrooms || 0} Badroom${data?.bedrooms > 1 && "s"}`}
                </span>
              </li>
              <li>
                <span className="ct_light_grey_badge">
                  <img
                    loading="lazy"
                    src="assets/img/iconoir_bathroom.svg"
                    alt=""
                  />
                  {`${data?.bathrooms || 0} Bathroom${
                    data?.bathrooms > 1 && "s"
                  }`}
                </span>
              </li>
              <li>
                <span className="ct_light_grey_badge">
                  <img
                    loading="lazy"
                    src="assets/img/mingcute_bed-line.svg"
                    alt=""
                  />
                  {`${data?.beds || 0} Bed${data?.beds > 1 && "s"}`}
                </span>
              </li>
              <li>
                <span className="ct_light_grey_badge">
                  <img
                    loading="lazy"
                    src="assets/img/bx_area.svg"
                    alt=""
                  />
                  {data?.square_foot || 0} sqft
                </span>
              </li>
            </ul>
          </div>
          <div className="ct_light_blue_outline ct_mt_40 pe-0">
            <div className="row">
              {(data?.min_stay_duration || data?.available_from) && (
                <div className="col-lg-7 mb-4 mb-lg-0">
                  <h4 className="ct_fs_24 ct_fw_600 mb-3 ct_pe_40">
                    Availability
                  </h4>
                  <div className="d-flex align-items-center gap-3 ct_flex_col_1199 ct_flex_row_991 ct_flex_col_767">
                    {data?.available_from && (
                      <div className="ct_light_grey_miduam ct_w_100_1199">
                        <img
                          loading="lazy"
                          src="assets/img/lets-icons_calendar-light.svg"
                          alt=""
                        />
                        <div>
                          <p className="mb-1">Available From</p>
                          <p className="mb-0 ct_text_clr_4B5563">
                            {pipViewDate(data?.available_from)}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="ct_light_grey_miduam ct_w_100_1199">
                      <img
                        loading="lazy"
                        src="assets/img/clock_icon.svg"
                        alt=""
                      />
                      {data?.min_stay_duration && (
                        <div>
                          <p className="mb-1">Minimum Stay Duration</p>
                          <p className="mb-0 ct_text_clr_4B5563">
                            {data?.min_stay_duration} days
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {(data?.check_in || data?.check_out) && (
                <div className="col-lg-5 mb-4 mb-lg-0">
                  <h4 className="ct_fs_24 ct_fw_600 mb-3 ct_pe_40">
                    Check-In Timings
                  </h4>
                  <div className="d-flex align-items-center gap-3 ct_flex_col_1199 ct_flex_row_991 ct_flex_col_767">
                    {data?.check_in && (
                      <div className="ct_light_grey_miduam ct_w_100_1199">
                        <img
                          loading="lazy"
                          src="assets/img/clock_icon.svg"
                          alt=""
                        />
                        <div>
                          <p className="mb-1">From</p>
                          <p className="mb-0 ct_text_clr_4B5563">
                            {data?.check_in}
                          </p>
                        </div>
                      </div>
                    )}
                    {data?.check_out && (
                      <div className="ct_light_grey_miduam ct_w_100_1199">
                        <img
                          loading="lazy"
                          src="assets/img/clock_icon.svg"
                          alt=""
                        />
                        <div>
                          <p className="mb-1">To</p>
                          <p className="mb-0 ct_text_clr_4B5563">
                            {data?.check_out}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {data?.house_rules_label?.length && (
            <div className="ct_light_blue_outline ct_mt_40 pe-0">
              <h4 className="ct_fs_24 ct_fw_600 mb-3 ct_pe_40">House Rules</h4>
              <ul className="ct_para_scroll ct_custom_scroll d-flex align-items-center gap-3 flex-wrap mt-4 ct_pe_40">
                {data?.house_rules_label?.length > 0 &&
                  data?.house_rules_label?.map((item, index) => (
                    <li>
                      <span className="ct_light_grey_badge">
                        <img
                          loading="lazy"
                          //       className="ct_icon_w_25"
                          src={`assets/img/${getHouseRulesIcon(
                            item?.title,
                          )}`}
                          alt=""
                        />
                        {item?.title}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div
        class="modal fade modal-lg"
        id="ct_show_all_photos"
        tabindex="-1"
        aria-labelledby="ct_show_all_photosLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class=" modal-content">
            <div class="modal-header border-0 pb-2">
              <h4 class="ct_fs_20 ct_fw_600 mb-0">All Photos</h4>
              <button
                type="button"
                class="btn-close "
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="owl-carousel owl-theme ct_product_gallary_slider">
                <CustomSwiper
                  data={propertyImages}
                  className="ct_testimonial_slider ct_ab_mt_40"
                  swiperProps={{
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
                    <div class="item">
                      <div class="ct_product_gallry_img">
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
    </>
  );
};

export default PropertyOverView;

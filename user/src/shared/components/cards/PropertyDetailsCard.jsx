import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { curSym, pipViewDate } from "../../utils/pip";
import { StatusDefinitions } from "../../utils/data";
import ImageWithPreview from "../image preview/imageWithPreview";

const PropertyDetailsCard = ({
  label = "Property Details",
  navigateURL = "",
  badge = "",
  isModify = false,
  data = {},
}) => {
  const navigate = useLocalizedNavigate();
  return (
    <>
      <div className="ct_dash_light_blue_bg ct_py_24_px_48 ct_mt_40 ">
        <div
          className={`d-flex align-items-center justify-content-between mb-4 ${isModify ? "gap-3 ct_flex_col_767" : "ct_flex_col_575"
            }`}
        >
          <div className="d-flex align-items-center justify-content-between w-100">
            <h4 className="ct_fs_20 ct_fw_600 mb-0 ">{label}</h4>

            {badge && (
              <p
                className={`mb-0 ${StatusDefinitions.bookingBadge?.[badge]?.color
                  } ${isModify ? "ms-auto" : ""}`}
              >
                {StatusDefinitions.bookingBadge?.[badge]?.value}
              </p>
            )}
          </div>
          {isModify && (
            <div className="ct_w_100_767 ct_white_nowrap">
              <button
                className="ct_orange_btn ct_w_100_767"
                data-bs-toggle="modal"
                data-bs-target="#ct_Request_Modification"
              >
                Request Modification
              </button>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-md-3 mb-4 mb-md-0">
            <div className="ct_flex_shrink_0">
              <ImageWithPreview
                image={
                  data?.propertyImage?.[0]?.image
                    ? data.propertyImage[0].image
                    : "https://app.flexsirent.com/assets/img/dashbaord-images/property_img.jpg"
                }
                className="ct_img_h_232 ct_border_radius_10 ct_flex_shrink_0"
              />
            </div>
          </div>
          <div className="col-md-9 mb-4 mb-md-0">
            <div className="row">
              <div className="col-md-8 mb-4 mb-md-0">
                <h4 className="ct_fs_18 ct_fw_600 mb-2">
                  {data?.property_title || "#N/A"}
                </h4>
                <p className="ct_text_clr_4B5563 d-flex align-items-start  gap-2">
                  <img loading="lazy"
                    src="https://app.flexsirent.com/assets/img/dashbaord-images/ep_location.svg"
                    alt=""
                    className=" ct_text_op_6"
                  />{" "}
                  <span> {data?.address || "#N/A"}</span>
                </p>
                <ul className="ct_mt_40 ct_grid_dash_2">
                  {/* <li>
                    <p className="d-flex align-items-center gap-2 mb-1">
                      <img  loading="lazy"
                        src="https://app.flexsirent.com/assets/img/dashbaord-images/clock_icon.svg"
                        alt=""
                      />
                      Booked On
                    </p>
                    <p className="ct_text_clr_4B5563 mb-0">
                      Booked on: {pipViewDate(data?.created_at) || "#N/A"}
                    </p>
                  </li> */}
                  {/* <li>
                    <p className="d-flex align-items-center gap-2 mb-1">
                      <img  loading="lazy"
                        src="https://app.flexsirent.com/assets/img/dashbaord-images/clock_icon.svg"
                        alt=""
                      />
                      Duration
                    </p>
                    <p className="ct_text_clr_4B5563 mb-0">4 Months</p>
                  </li> */}
                  {badge != "Cancelled" && (
                    <>
                      <li>
                        <p className="d-flex align-items-center gap-2 mb-1">
                          <img loading="lazy"
                            src="https://app.flexsirent.com/assets/img/dashbaord-images/outline_calnder_icon.png"
                            alt=""
                          />
                          Check-In
                        </p>
                        <p className="ct_text_clr_4B5563 mb-0">
                          {data?.check_in || "#N/A"}
                        </p>
                      </li>
                      <li>
                        <p className="d-flex align-items-center gap-2 mb-1">
                          <img loading="lazy"
                            src="https://app.flexsirent.com/assets/img/dashbaord-images/outline_calnder_icon.png"
                            alt=""
                          />
                          Check-Out
                        </p>
                        <p className="ct_text_clr_4B5563 mb-0">
                          {data?.check_out || "#N/A"}
                        </p>
                      </li>
                    </>
                  )}
                  {badge == "Cancelled" && (
                    <li>
                      <p className="d-flex align-items-center gap-2 mb-1 ct_cancle_red_clr">
                        Cancelled On
                      </p>
                      <p className="ct_text_clr_4B5563 mb-0 ct_cancle_red_clr">
                        10 March, 2024
                      </p>
                    </li>
                  )}
                </ul>
              </div>
              <div className="col-md-4 mb-4 mb-md-0">
                <div className="ct_property_dtl_grid">
                  <div>
                    <div>
                      <h4 className="ct_fs_18 ct_fw_600 mb-0">Monthly Rent:</h4>
                      <p className="ct_text_clr_4B5563 mb-0">
                        {curSym}
                        {data?.monthly_rent || 0}
                      </p>
                    </div>
                    <div className="mt-4">
                      <h4 className="ct_fs_18 ct_fw_600 mb-0">
                        Security Deposit:
                      </h4>
                      <p className="ct_text_clr_4B5563 mb-0">
                        {curSym}
                        {data?.security_deposit || 0}
                      </p>
                    </div>
                  </div>
                  <div className="mt-md-auto mt-4">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault(e);
                        navigate(navigateURL, { state: { data: data } });
                      }}
                      className="ct_view_dtl_black_link"
                    >
                      View Details <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* payment detail S */}
      <div
        className="modal fade modal-lg"
        id="ct_Request_Modification"
        tabindex="-1"
        aria-labelledby="ct_Request_ModificationLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close ct_login_btn_close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body pt-3">
              <h4 className="ct_fs_24 ct_fw_600 mb-5">Modification Request</h4>
              <form action="">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label for="" className="mb-2 ct_fw_600">
                        Check-In Date
                      </label>
                      <input
                        type="date"
                        className="form-control ct_input ct_input_h_50"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label for="" className="mb-2 ct_fw_600">
                        Check-Out Date
                      </label>
                      <input
                        type="date"
                        className="form-control ct_input ct_input_h_50"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label for="" className="mb-2 ct_fw_600">
                        Cleaning Fee (€)
                      </label>
                      <input
                        type="number"
                        className="form-control ct_input ct_input_h_50"
                        value="500"
                        readonly
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label for="" className="mb-2 ct_fw_600">
                        Extra Guest Fee (€)
                      </label>
                      <input
                        type="number"
                        className="form-control ct_input ct_input_h_50"
                        value="200"
                        readonly
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group mb-4">
                      <label for="" className="mb-2 ct_fw_600">
                        Number of Guests
                      </label>
                      <input
                        type="number"
                        className="form-control ct_input ct_input_h_50"
                        placeholder="Number of Guests"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-4">
                      <label for="" className="mb-2 ct_fw_600">
                        Reason for Change:
                      </label>
                      <textarea
                        type="number"
                        className="form-control ct_input h-auto"
                        rows="4"
                        placeholder="Reason for Change"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button className="ct_orange_btn ms-auto">Send Request</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetailsCard;

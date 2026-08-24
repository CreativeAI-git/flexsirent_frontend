const RentalApplication = ({ handleNext }) => {
  return (
    <fieldset className="ct_mt_60">
      <div className="ct_form-card">
        <div className="row">
          <div className="col-lg-7 mb-4 mb-lg-0">
            <h4 className="ct_fs_22 ct_fw_600 mb-3">Apartment Summary</h4>
            <figure className="ct_aprtment_summary_card">
              <img loading="lazy"
                src="https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_2.png"
                alt=""
              />
              <figcaption className="ct_mt_30">
                <h5 className="ct_fs_18 ct_fw_600 mb-3">
                  Modern Downtown Apartment
                </h5>
                <p className="mb-0">
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="mask0_1_7104"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="20"
                      height="21"
                    >
                      <path
                        d="M0 0.720703H20V20.7207H0V0.720703Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_1_7104)">
                      <mask
                        id="mask1_1_7104"
                        style={{ maskType: "luminance" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="20"
                        height="21"
                      >
                        <path
                          d="M0 0.720703H20V20.7207H0V0.720703Z"
                          fill="white"
                        />
                      </mask>
                      <g mask="url(#mask1_1_7104)">
                        <path
                          d="M9.22923 20.3172C3.55352 12.0891 2.5 11.2447 2.5 8.2207C2.5 4.07855 5.85785 0.720703 10 0.720703C14.1421 0.720703 17.5 4.07855 17.5 8.2207C17.5 11.2447 16.4465 12.0891 10.7708 20.3172C10.3983 20.8552 9.60164 20.8552 9.22923 20.3172ZM10 11.3457C11.7259 11.3457 13.125 9.9466 13.125 8.2207C13.125 6.4948 11.7259 5.0957 10 5.0957C8.2741 5.0957 6.875 6.4948 6.875 8.2207C6.875 9.9466 8.2741 11.3457 10 11.3457Z"
                          fill="#9CA3AF"
                        />
                      </g>
                    </g>
                  </svg>
                  Cozy Studio, Berlin
                </p>
                <div className="ct_grey_bg ct_outline_border p-3 mt-3">
                  <div className="d-flex align-items-center justify-content-between gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <i className="fa-solid fa-calendar-days ct_orange_text"></i>
                      <h6 className="mb-0 ct_fs_16">Rental Period</h6>
                    </div>
                    <p className="mb-0  ct_text_op_6">3 months</p>
                  </div>
                  <ul className="mt-3">
                    <li className="d-flex align-items-center gap-2 justify-content-between">
                      <p className="mb-0 ct_text_op_6 ct_fs_14">Check-In</p>
                      <p className="mb-0 ct_fs_14">July 1, 2025</p>
                    </li>
                    <li className="d-flex align-items-center gap-2 justify-content-between mt-2">
                      <p className="mb-0 ct_text_op_6 ct_fs_14">Check-Out</p>
                      <p className="mb-0 ct_fs_14">Oct 1, 2025</p>
                    </li>
                  </ul>
                </div>
                <div className=" ct_outline_border p-3 mt-3">
                  <div className="d-flex align-items-center justify-content-between gap-2">
                    <h5 className="mb-0 ct_fs_16">Price Breakdown</h5>
                    <p className="mb-0  ct_text_op_6">3 months</p>
                  </div>
                  <ul className="mt-3">
                    <li className="d-flex align-items-center gap-2 justify-content-between">
                      <p className="mb-0 ct_text_op_6 ct_fs_14">Monthly Rent</p>
                      <p className="mb-0 ct_fs_14">€300</p>
                    </li>
                    <li className="d-flex align-items-center gap-2 justify-content-between mt-2">
                      <p className="mb-0 ct_text_op_6 ct_fs_14">Duration</p>
                      <p className="mb-0 ct_fs_14">3 months</p>
                    </li>
                    <li className="d-flex align-items-center gap-2 justify-content-between mt-2">
                      <p className="mb-0 ct_text_op_6 ct_fs_14">Security Deposit</p>
                      <p className="mb-0 ct_fs_14">€300</p>
                    </li>
                  </ul>
                  <hr className="ct_hr_border_clr " />
                  <div className="d-flex align-items-center gap-2 justify-content-between mt-2">
                    <h5 className="mb-0 ct_fs_18 ct_fw_600 ct_orange_text">
                      Total Payable Amount
                    </h5>
                    <h5 className="mb-0 ct_fs_18 ct_fw_600 ct_orange_text">
                      €70,000
                    </h5>
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
          <div className="col-lg-5 mb-4 mb-lg-0">
            <div className="ct_outline_border py-5 px-4">
              <h4 className="ct_fs_22 ct_fw_600 mb-3">Personal Information</h4>
              <div className="form-group mb-3">
                <label for="" className="mb-2 ct_fw_500">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control ct_input"
                  placeholder="Enter Full Name"
                />
              </div>
              <div className="form-group mb-3">
                <label for="" className="mb-2 ct_fw_500">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control ct_input"
                  placeholder="Enter Email"
                />
              </div>
              <div className="form-group mb-3">
                <label for="" className="mb-2 ct_fw_500">
                  Phone Number
                </label>
                <input
                  type="email"
                  className="form-control ct_input"
                  placeholder="Enter Phone Number"
                />
              </div>
              <div className="form-group mb-3">
                <label for="" className="mb-2 ct_fw_500">
                  Nationality
                </label>
                <select className="form-control ct_input">
                  <option value="">American</option>
                  <option value="">American</option>
                </select>
              </div>
              <div className="form-group mb-3">
                <label for="" className="mb-2 ct_fw_500">
                  Purpose Of Stay
                </label>
                <select className="form-control ct_input">
                  <option value="">College Student</option>
                  <option value="">College Student</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- <input type="button" name="next" className="ct_form_next action-button" value="Next" /> --/> */}
      <button
        type="button"
        className="ct_orange_btn ct_form_next float-end"
        onClick={handleNext}
      >
        Continue to Payment
      </button>
    </fieldset>
  );
};

export default RentalApplication;

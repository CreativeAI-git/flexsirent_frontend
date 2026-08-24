const PaymentMethod = ({ handleNext, handleBack }) => {
  return (
    <fieldset className="ct_mt_60">
      <div className="ct_form-card">
        <div className="row">
          <div className="col-lg-7 mb-4 mb-lg-0">
            <h4 className="ct_fs_22 ct_fw_600 mb-3">Choose Payment Method</h4>
            <div className="ct_payment_method_card">
              <div className="ct_radio-container">
                <div className="ct_radio-wrapper d-flex align-items-center gap-2">
                  <label className="ct_radio-button">
                    <input id="option1" name="ct_radio-group" type="radio" />
                    <span className="ct_radio-checkmark"></span>
                  </label>
                  <div>
                    <p className="mb-0 d-flex align-items-center gap-2 ct_fw_600">
                      <img loading="lazy" src="https://app.flexsirent.com/assets/img/creadit_card.png" alt="" />
                      Credit/Debit Card
                    </p>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <img loading="lazy" src="https://app.flexsirent.com/assets/img/visa.png" alt="" />
                <img loading="lazy" src="https://app.flexsirent.com/assets/img/mastercard.png" alt="" />
                <img loading="lazy" src="https://app.flexsirent.com/assets/img/american_card.png" alt="" />
              </div>
            </div>
            <div className="ct_payment_method_card mt-4">
              <div className="ct_radio-container ">
                <div className="ct_radio-wrapper d-flex align-items-center gap-2 mb-0">
                  <label className="ct_radio-button">
                    <input id="option1" name="ct_radio-group" type="radio" />
                    <span className="ct_radio-checkmark"></span>
                  </label>
                  <div>
                    <p className="mb-0 d-flex align-items-center gap-2 ct_fw_600">
                      <img loading="lazy" src="https://app.flexsirent.com/assets/img/paypal_icon_small.png" alt="" />
                      PayPal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 mb-4 mb-lg-0">
            <div className="ct_outline_border py-4 px-3">
              <h5 className="ct_fs_18 ct_fw_600 mb-3">Booking Summary</h5>
              <figure className="ct_booking_summary_card">
                <img loading="lazy"
                  src="https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_2.png"
                  alt=""
                />
                <figcaption className="ct_mt_30">
                  <ul>
                    <li>
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
                    </li>
                    <li className="mt-3">
                      <p className="mb-0">
                        <svg
                          width="21"
                          height="21"
                          viewBox="0 0 21 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_1_7433)">
                            <mask
                              id="mask0_1_7433"
                              style={{ maskType: "luminance" }}
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="0"
                              width="21"
                              height="21"
                            >
                              <path
                                d="M0.712891 0.185547H20.7129V20.1855H0.712891V0.185547Z"
                                fill="white"
                              />
                            </mask>
                            <g mask="url(#mask0_1_7433)">
                              <mask
                                id="mask1_1_7433"
                                style={{ maskType: "luminance" }}
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="21"
                                height="21"
                              >
                                <path
                                  d="M0.712891 0.185547H20.7129V20.1855H0.712891V0.185547Z"
                                  fill="white"
                                />
                              </mask>
                              <g mask="url(#mask1_1_7433)">
                                <path
                                  d="M1.96289 18.3105C1.96289 19.3457 2.80273 20.1855 3.83789 20.1855H17.5879C18.623 20.1855 19.4629 19.3457 19.4629 18.3105V7.68555H1.96289V18.3105ZM14.4629 10.6543C14.4629 10.3965 14.6738 10.1855 14.9316 10.1855H16.4941C16.752 10.1855 16.9629 10.3965 16.9629 10.6543V12.2168C16.9629 12.4746 16.752 12.6855 16.4941 12.6855H14.9316C14.6738 12.6855 14.4629 12.4746 14.4629 12.2168V10.6543ZM14.4629 15.6543C14.4629 15.3964 14.6738 15.1855 14.9316 15.1855H16.4941C16.752 15.1855 16.9629 15.3964 16.9629 15.6543V17.2168C16.9629 17.4747 16.752 17.6855 16.4941 17.6855H14.9316C14.6738 17.6855 14.4629 17.4747 14.4629 17.2168V15.6543ZM9.46289 10.6543C9.46289 10.3965 9.67383 10.1855 9.93164 10.1855H11.4941C11.752 10.1855 11.9629 10.3965 11.9629 10.6543V12.2168C11.9629 12.4746 11.752 12.6855 11.4941 12.6855H9.93164C9.67383 12.6855 9.46289 12.4746 9.46289 12.2168V10.6543ZM9.46289 15.6543C9.46289 15.3964 9.67383 15.1855 9.93164 15.1855H11.4941C11.752 15.1855 11.9629 15.3964 11.9629 15.6543V17.2168C11.9629 17.4747 11.752 17.6855 11.4941 17.6855H9.93164C9.67383 17.6855 9.46289 17.4747 9.46289 17.2168V15.6543ZM4.46289 10.6543C4.46289 10.3965 4.67383 10.1855 4.93164 10.1855H6.49414C6.75195 10.1855 6.96289 10.3965 6.96289 10.6543V12.2168C6.96289 12.4746 6.75195 12.6855 6.49414 12.6855H4.93164C4.67383 12.6855 4.46289 12.4746 4.46289 12.2168V10.6543ZM4.46289 15.6543C4.46289 15.3964 4.67383 15.1855 4.93164 15.1855H6.49414C6.75195 15.1855 6.96289 15.3964 6.96289 15.6543V17.2168C6.96289 17.4747 6.75195 17.6855 6.49414 17.6855H4.93164C4.67383 17.6855 4.46289 17.4747 4.46289 17.2168V15.6543ZM17.5879 2.68555H15.7129V0.810547C15.7129 0.466797 15.4316 0.185547 15.0879 0.185547H13.8379C13.4941 0.185547 13.2129 0.466797 13.2129 0.810547V2.68555H8.21289V0.810547C8.21289 0.466797 7.93164 0.185547 7.58789 0.185547H6.33789C5.99414 0.185547 5.71289 0.466797 5.71289 0.810547V2.68555H3.83789C2.80273 2.68555 1.96289 3.5254 1.96289 4.56055V6.43555H19.4629V4.56055C19.4629 3.5254 18.623 2.68555 17.5879 2.68555Z"
                                  fill="#9CA3AF"
                                />
                              </g>
                            </g>
                          </g>
                          <defs>
                            <clipPath id="clip0_1_7433">
                              <rect
                                width="20"
                                height="20"
                                fill="white"
                                transform="translate(0.712891 0.185547)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        July 1, 2025 - Oct 1, 2025
                      </p>
                    </li>
                    <li className="mt-3">
                      <p className="mb-0">
                        <svg
                          width="21"
                          height="21"
                          viewBox="0 0 21 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_1_7445)">
                            <mask
                              id="mask0_1_7445"
                              style={{ maskType: "luminance" }}
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="0"
                              width="21"
                              height="21"
                            >
                              <path
                                d="M0.712891 0.185547H20.7129V20.1855H0.712891V0.185547Z"
                                fill="white"
                              />
                            </mask>
                            <g mask="url(#mask0_1_7445)">
                              <mask
                                id="mask1_1_7445"
                                style={{ maskType: "luminance" }}
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="21"
                                height="21"
                              >
                                <path
                                  d="M0.712891 0.185547H20.7129V20.1855H0.712891V0.185547Z"
                                  fill="white"
                                />
                              </mask>
                              <g mask="url(#mask1_1_7445)">
                                <path
                                  d="M10.7129 0.498047C5.36133 0.498047 1.02539 4.83398 1.02539 10.1855C1.02539 15.537 5.36133 19.873 10.7129 19.873C16.0644 19.873 20.4004 15.537 20.4004 10.1855C20.4004 4.83398 16.0644 0.498047 10.7129 0.498047ZM14.3258 12.7246L13.5445 13.7012C13.4367 13.8359 13.297 13.9129 13.1255 13.9319C12.954 13.951 12.8008 13.9067 12.666 13.7988L10.0488 11.8566C9.86362 11.7084 9.71965 11.5273 9.61693 11.3134C9.5142 11.0995 9.46287 10.874 9.46289 10.6367V4.56055C9.46289 4.38796 9.52392 4.24065 9.64595 4.11861C9.76799 3.99657 9.9153 3.93555 10.0879 3.93555H11.3379C11.5105 3.93555 11.6578 3.99657 11.7798 4.11861C11.9019 4.24065 11.9629 4.38796 11.9629 4.56055V10.1855L14.2285 11.8457C14.3634 11.9536 14.4403 12.0933 14.4593 12.265C14.4783 12.4366 14.4338 12.5898 14.3258 12.7246Z"
                                  fill="#9CA3AF"
                                />
                              </g>
                            </g>
                          </g>
                          <defs>
                            <clipPath id="clip0_1_7445">
                              <rect
                                width="20"
                                height="20"
                                fill="white"
                                transform="translate(0.712891 0.185547)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        3 months
                      </p>
                    </li>
                  </ul>
                  <ul className="ct_mt_30">
                    <li className="d-flex justify-content-between align-items-center">
                      <p className="mb-0 ">Monthly Rent × 3</p>
                      <p className="mb-0 ">€2,850</p>
                    </li>
                    <li className="d-flex justify-content-between align-items-center mt-2">
                      <p className="mb-0 ">Service Fee</p>
                      <p className="mb-0 ">€2,850</p>
                    </li>
                  </ul>
                  <hr className="ct_hr_border_clr " />
                  <div className="d-flex align-items-center gap-2 justify-content-between mt-2">
                    <div>
                      <h5 className="mb-0 ct_fs_18 ct_fw_600 ct_orange_text">
                        Total Payable Amount
                      </h5>
                    </div>
                    <h5 className="mb-0 ct_fs_18 ct_fw_600 ct_orange_text">
                      €70,000
                    </h5>
                  </div>
                  <p className="ct_fs_14 mb-0 mt-2">
                    Includes monthly rent, security deposit
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <button
        type="button"
        onClick={handleNext}
        className="ct_orange_btn ct_form_next float-end"
      >
        Confirm & Pay
      </button>
      <button
        type="button"
        onClick={handleBack}
        className="ct_outline_btn previous float-end me-3"
      >
        Back
      </button>
    </fieldset>
  );
};

export default PaymentMethod;

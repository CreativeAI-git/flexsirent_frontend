const Step2 = ({ handleNext, handleBack }) => {
  return (
    <fieldset className="ct_mt_60">
      <div className="ct_form-card">
        <h2 className="ct_fs_35 ct_fw_600 mb-2">2. Describe Your Space</h2>
        <p className="ct_text_op_8 mb-0">
          Add essential details about your property so we can present it clearly
          to potential guests.
        </p>
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="form-group mb-4">
              <label for="" className="mb-2 ct_fw_400">
                Property Name
              </label>
              <input
                type="text"
                placeholder="Property Name"
                className="form-control ct_input ct_input ct_input_h_50"
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group mb-4">
              <label for="" className="mb-2 ct_fw_400">
                Location
              </label>
              <select
                type="text"
                placeholder="Last Name"
                className="form-control ct_input ct_input_h_50"
              >
                <option>Uk</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-4">
              <label for="" className="mb-2 ct_fw_400">
                Total Bedrooms
              </label>
              <div className="position-relative ">
                <div className="ct_decrease_btn ct_input_icon_left">-</div>
                <input
                  type="email"
                  placeholder="0"
                  className="form-control ct_input ct_input_h_50 ct_input_px_60 text-center"
                />
                <div className="ct_increase_btn ct_show_eye">+</div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-4">
              <label for="" className="mb-2 ct_fw_400">
                Total Bathrooms
              </label>
              <div className="position-relative overflow-hidden">
                <div className="ct_decrease_btn ct_input_icon_left">-</div>
                <input
                  type="email"
                  placeholder="0"
                  className="form-control ct_input ct_input_h_50 ct_input_px_60 text-center"
                />
                <div className="ct_increase_btn ct_show_eye">+</div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-4">
              <label for="" className="mb-2 ct_fw_400">
                Total Beds Available
              </label>
              <div className="position-relative overflow-hidden">
                <div className="ct_decrease_btn ct_input_icon_left">-</div>
                <input
                  type="email"
                  placeholder="0"
                  className="form-control ct_input ct_input_h_50 ct_input_px_60 text-center"
                />
                <div className="ct_increase_btn ct_show_eye">+</div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-4">
              <label for="" className="mb-2 ct_fw_400">
                Square Footage
              </label>
              <div className="position-relative overflow-hidden">
                <div className="ct_increase_btn ct_show_eye">+</div>
                <input
                  type="email"
                  placeholder="0"
                  className="form-control ct_input ct_input_h_50 ct_input_px_60 text-center"
                />
                <div className="ct_decrease_btn ct_input_icon_left">-</div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group mb-4">
              <label for="" className="mb-2 ct_fw_400">
                Property Description
              </label>
              <textarea
                type="text"
                placeholder="Property Description"
                rows="4"
                className="form-control ct_input ct_input ct_input_h_50 h-auto"
                aria-placeholder=""
              ></textarea>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group mb-4">
              <label for="" className="mb-2 ct_fw_400">
                Upload Images & Videos
              </label>
              <div className="ct_upload_product_main">
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.87174 22.0167C4.26376 20.9403 3.20508 19.1073 3.20508 17.027C3.20508 13.9023 5.59376 11.3354 8.64473 11.0528C9.26883 7.25653 12.5654 4.36035 16.5384 4.36035C20.5114 4.36035 23.808 7.25653 24.4321 11.0528C27.4831 11.3354 29.8717 13.9023 29.8717 17.027C29.8717 19.1073 28.8131 20.9403 27.2051 22.0167M11.2051 21.6937L16.5384 16.3604M16.5384 16.3604L21.8717 21.6937M16.5384 16.3604V28.3604"
                    stroke="#9CA3AF"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <p className="text-center ct_fs_18 ct_text_op_6 mb-0">
                  Upload Your Images & Videos here
                </p>
                <label for="ct_upload_product">
                  <input
                    type="file"
                    accept="image/*"
                    id="ct_upload_product"
                    className="d-none"
                  />
                  <div className="ct_browse_btn mt-3">
                    <span>Browse Files</span>
                  </div>
                </label>
              </div>
              <div className="ct_multiple_img_div ct_custom_scroll d-none">
                <div className="ct_uploaded_img123 position-relative ">
                  <div className="ct_uploaded_img_w">
                    <img loading="lazy"
                      src="https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_1.png"
                      alt=""
                    />
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                </div>
                <div className="ct_uploaded_img123 position-relative ">
                  <div className="ct_uploaded_img_w">
                    <img loading="lazy"
                      src="https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_1.png"
                      alt=""
                    />
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                </div>
                <div className="ct_uploaded_img123 position-relative ">
                  <div className="ct_uploaded_img_w">
                    <img loading="lazy"
                      src="https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_1.png"
                      alt=""
                    />
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                </div>
                <div className="ct_uploaded_img123 position-relative ">
                  <div className="ct_uploaded_img_w">
                    <video width="100" height="100" controls>
                      <source
                        src="https://youtu.be/9xwazD5SyVg?si=FBRmGuM69BoRrXvp"
                        type="video/mp4"
                      />
                    </video>
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                </div>
                <div className="ct_uploaded_img123 position-relative ">
                  <div className="ct_uploaded_img_w">
                    <img loading="lazy"
                      src="https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_1.png"
                      alt=""
                    />
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                </div>
                <div className="ct_uploaded_img123 position-relative ">
                  <div className="ct_uploaded_img_w">
                    <img loading="lazy"
                      src="https://app.flexsirent.com/assets/img/apartments/apartment_detail_small_1.png"
                      alt=""
                    />
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- <input type="button" name="previous" className="previous" value="Previous" />
                                <input type="button" name="next" className="ct_form_next" value="Next" /> --/> */}
      <br />
      <br />
      <button
        type="button"
        className="ct_orange_btn ct_form_next float-end"
        onClick={handleNext}
      >
        Next
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

export default Step2;

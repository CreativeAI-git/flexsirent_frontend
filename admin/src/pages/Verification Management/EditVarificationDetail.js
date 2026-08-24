import { useNavigate } from "react-router";
import SubHeader from "../../shared/layout/SubHeader";
import PanelLayout from "../../shared/layout/PanelLayout";

const EditVarificationDetail = () => {
  const navigate = useNavigate();

  return (
    <PanelLayout>
      <SubHeader label="Edit Verification Details" />
      <div class="ct_white_bg">
        <div class="ct_px_30_new pt-4">
          <form>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-4">
                  <label for="" class="ct_fw_600 mb-2">
                    Host Name
                  </label>
                  <input
                    type="text"
                    class="form-control ct_input ct_border_op_10"
                    placeholder="Host Name"
                    value="John Anderson"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-4">
                  <label for="" class="ct_fw_600 mb-2">
                    Status
                  </label>
                  <select
                    type="text"
                    class="form-control ct_input ct_border_op_10"
                  >
                    <option value="">Paid</option>
                    <option value="">Pending</option>
                    <option value="">Failed</option>
                  </select>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group mb-4">
                  <label for="" class="ct_fw_600 mb-2">
                    Submission Date
                  </label>
                  <input
                    type="date"
                    class="form-control ct_input ct_border_op_10"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-4">
                  <label for="" class="ct_fw_600 mb-2">
                    Last Updated
                  </label>
                  <input
                    type="date"
                    class="form-control ct_input ct_border_op_10"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group mb-4">
                  <label for="" class="ct_fw_600 mb-2">
                    Upload Document
                  </label>
                  <div class="ct_upload_product_main ct_upload_product_main_180">
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    <p class="text-center ct_fs_18 ct_text_op_07 mb-0">
                      Upload your Document here
                    </p>

                    <label for="ct_upload_product">
                      <input
                        type="file"
                        name=""
                        accept="image/*"
                        id="ct_upload_product"
                        class="d-none"
                      />
                      <div class="ct_browse_btn mt-3">
                        <span>Browse Files</span>
                      </div>
                    </label>
                  </div>
                  <div class="ct_multiple_img_div ct_custom_scroll d-none">
                    <div class="ct_uploaded_img123 position-relative">
                      <div class="ct_uploaded_img_w">
                        <img  loading="lazy"
                          src="assets/img/apartment_detail_small_1.jpg"
                          alt=""
                        />
                        <i class="fa-solid fa-xmark"></i>
                      </div>
                    </div>
                    <div class="ct_uploaded_img123 position-relative">
                      <div class="ct_uploaded_img_w">
                        <img  loading="lazy"
                          src="assets/img/apartment_detail_small_1.jpg"
                          alt=""
                        />
                        <i class="fa-solid fa-xmark"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button class="ct_orange_btn ct_border_radius_10 ct_h_40 ms-auto" type="button">
              Update
            </button>
          </form>
        </div>
      </div>
    </PanelLayout>
  );
};

export default EditVarificationDetail;

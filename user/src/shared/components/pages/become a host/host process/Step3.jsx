import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";

const Step3 = ({ handleNext, handleBack }) => {
  const navigate = useLocalizedNavigate();
  return (
    <fieldset className="ct_mt_60">
      <div className="ct_form-card">
        <h2 className="ct_fs_35 ct_fw_600 mb-2">
          3. What’s Included & Who’s It For?
        </h2>
        <p className="ct_text_op_8 mb-0">
          Let renters know what they’ll get and set expectations with amenities
          and house rules.
        </p>
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="mb-4">
              <p className="ct_fs_18 ct_fw_500 mb-2">Amenities</p>
              <div className="d-flex align-items-center gap-3 flex-wrap">
                <div className="d-flex align-items-center gap-1">
                  <div className="form-check ct_custom_check ct_flex_shrink_0 w-auto h-auto mt-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>
                  <label for="">Air Conditioned</label>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <div className="form-check ct_custom_check ct_flex_shrink_0 w-auto h-auto mt-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault2"
                    />
                  </div>
                  <label for="">Wi-Fi</label>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <div className="form-check ct_custom_check ct_flex_shrink_0 w-auto h-auto mt-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault3"
                    />
                  </div>
                  <label for="">Laundry</label>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <div className="form-check ct_custom_check ct_flex_shrink_0 w-auto h-auto mt-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault4"
                    />
                  </div>
                  <label for="">Parking</label>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <div className="form-check ct_custom_check ct_flex_shrink_0 w-auto h-auto mt-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault5"
                    />
                  </div>
                  <label for="">Kitchen Access</label>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <div className="form-check ct_custom_check ct_flex_shrink_0 w-auto h-auto mt-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault6"
                    />
                  </div>
                  <label for="">CCTV</label>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <div className="form-check ct_custom_check ct_flex_shrink_0 w-auto h-auto mt-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault7"
                    />
                  </div>
                  <label for="">Furnished</label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <p className="ct_fs_18 ct_fw_500 mb-2">Safety Amenities</p>
              <div className="d-flex align-items-center gap-3 flex-wrap">
                <div className="d-flex align-items-center gap-1">
                  <div className="form-check ct_custom_check ct_flex_shrink_0 w-auto h-auto mt-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>
                  <label for="">Smoke Detector</label>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <div className="form-check ct_custom_check ct_flex_shrink_0 w-auto h-auto mt-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault2"
                    />
                  </div>
                  <label for="">Carbon Monoxide Detector</label>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <div className="form-check ct_custom_check ct_flex_shrink_0 w-auto h-auto mt-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault3"
                    />
                  </div>
                  <label for="">First Aid Kit</label>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <div className="form-check ct_custom_check ct_flex_shrink_0 w-auto h-auto mt-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault4"
                    />
                  </div>
                  <label for="">Safety Card</label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <p className="ct_fs_18 ct_fw_500 mb-2">Who Is It Ideal For?</p>
              <div className="d-flex align-items-center gap-3 flex-wrap">
                <div className="d-flex align-items-center gap-1">
                  <div className="form-check ct_custom_check ct_flex_shrink_0 w-auto h-auto mt-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>
                  <label for="">Students</label>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <div className="form-check ct_custom_check ct_flex_shrink_0 w-auto h-auto mt-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault2"
                    />
                  </div>
                  <label for="">Digital Nomads</label>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <div className="form-check ct_custom_check ct_flex_shrink_0 w-auto h-auto mt-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault3"
                    />
                  </div>
                  <label for="">Couples</label>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <div className="form-check ct_custom_check ct_flex_shrink_0 w-auto h-auto mt-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault4"
                    />
                  </div>
                  <label for="">Families</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="form-group">
                  <label for="" className="mb-2 ct_fw_500">
                    Check In
                  </label>
                  <input
                    type="time"
                    className="form-control ct_input ct_input_h_50"
                  />
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="form-group">
                  <label for="" className="mb-2 ct_fw_500">
                    Check Out
                  </label>
                  <input
                    type="time"
                    className="form-control ct_input ct_input_h_50"
                  />
                </div>
              </div>
              <div className="col-md-12 mb-4">
                <div className="form-group">
                  <label for="" className="mb-2 ct_fw_500">
                    House Rules
                  </label>
                  <textarea
                    className="form-control ct_input ct_input_h_50 h-auto"
                    rows="4"
                    placeholder="House Rules"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- <input type="button" name="previous" className="previous" value="Previous" //> 
                                <input type="button" name="next" className="ct_form_next" value="Next" /> */}
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
        className="ct_outline_btn previous float-end me-3"
        onClick={handleBack}
      >
        Back
      </button>
    </fieldset>
  );
};

export default Step3;

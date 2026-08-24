import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";

const Step1 = ({ handleNext }) => {
  const navigate = useLocalizedNavigate()
  return (
    <fieldset className="ct_mt_60">
      <div className="ct_form-card">
        <h2 className="ct_fs_35 ct_fw_600 mb-2">1. Tell Us About Yourself</h2>
        <p className="ct_text_op_8 mb-0">
          Help us get to know you—share your contact details and what kind of
          host you are.
        </p>
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="form-group mb-4">
              <label for="" className="mb-2 ct_fw_400">
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="form-control ct_input ct_input ct_input_h_50"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-4">
              <label for="" className="mb-2 ct_fw_400">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="form-control ct_input ct_input_h_50"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-4">
              <label for="" className="mb-2 ct_fw_400">
                Email
              </label>
              <input
                type="email"
                placeholder="Email "
                className="form-control ct_input ct_input_h_50"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-4">
              <label for="" className="mb-2 ct_fw_400">
                Phone Number
              </label>
              <input
                type="number"
                placeholder="Phone Number"
                className="form-control ct_input ct_input_h_50"
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group mb-4">
              <label for="" className="mb-2 ct_fw_400">
                Property Type
              </label>
              <select
                type="text"
                placeholder="Last Name"
                className="form-control ct_input ct_input_h_50"
              >
                <option value="">Land</option>
                <option value="">House</option>
              </select>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group mb-4">
              <label for="" className="mb-2 ct_fw_400">
                Are You a
              </label>
              <div>
                <div className="d-flex align-items-center gap-1">
                  <div className="form-check ct_custom_check ct_flex_shrink_0 w-auto h-auto mt-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>
                  <label for="">Individual Owner</label>
                </div>
              </div>
              <div className="mt-2">
                <div className="d-flex align-items-center gap-1">
                  <div className="form-check ct_custom_check ct_flex_shrink_0 w-auto h-auto mt-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>
                  <label for="">Property Manager</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- <input type="button" name="next" className="ct_form_next action-button" value="Next" /> --/> */}
      <button
        type="button"
        onClick={handleNext}
        className="ct_orange_btn ct_form_next float-end"
      >
        Next
      </button>
      <a
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
        className="ct_outline_btn previous float-end me-3"
      >
        Back
      </a>
    </fieldset>
  );
};

export default Step1;

import { useState } from "react";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import SubmitCongrats from "../../../modals/SubmitCongrats";
import { curSym } from "../../../../utils/pip";

const Step4 = ({ handleNext, handleBack }) => {
  const [isViewModal, setIsViewModal] = useState(false);
  const navigate = useLocalizedNavigate();
  return (
    <>
      <fieldset>
        <div className="ct_form-card">
          <h2 className="ct_fs_35 ct_fw_600 mb-2">
            4. Set Your Price & Open Your Calendar
          </h2>
          <p className="ct_text_op_8 mb-0">
            Add your monthly rent, deposit details, and availability dates to
            start hosting with ease.
          </p>
          <div className="row mt-5">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12 mb-4">
                  <div className="form-group">
                    <label for="" className="mb-2 ct_fw_500">
                      Monthly Rent
                    </label>
                    <div className="position-relative">
                      <input
                        type="number"
                        className="form-control ct_input ct_input_h_50"
                        placeholder="0.00"
                      />
                      <span className="ct_show_eye">{curSym}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="form-group">
                    <label for="" className="mb-2 ct_fw_500">
                      Security Deposit
                    </label>
                    <div className="position-relative">
                      <input
                        type="number"
                        className="form-control ct_input ct_input_h_50"
                        placeholder="0.00"
                      />
                      <span className="ct_show_eye">{curSym}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="form-group">
                    <label for="" className="mb-2 ct_fw_500">
                      Available From
                    </label>
                    <input
                      type="date"
                      className="form-control ct_input ct_input_h_50"
                    />
                  </div>
                </div>
                <div className="col-md-12 mb-4">
                  <div className="form-group">
                    <label for="" className="mb-2 ct_fw_500">
                      Minimum Stay Duration
                    </label>
                    <select className="form-control ct_input ct_input_h_50">
                      <option value="">30 Days</option>
                      <option value="">60 Days</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <button
          type="button"
          className="ct_orange_btn  float-end"
          onClick={() => setIsViewModal(true)}
        >
          Confirm & Submit
        </button>
        <button
          type="button"
          onClick={handleBack}
          className="ct_outline_btn previous float-end me-3"
        >
          Back
        </button>
      </fieldset>

      {/* <!-- become_host_form_success S --> */}
      <SubmitCongrats
        isViewModal={isViewModal}
        setIsViewModal={setIsViewModal}
      />
    </>
  );
};

export default Step4;

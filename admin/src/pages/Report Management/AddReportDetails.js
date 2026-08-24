import { useNavigate } from "react-router";
import SubHeader from "../../shared/layout/SubHeader";
import PanelLayout from "../../shared/layout/PanelLayout";

const AddReport = () => {
  const navigate = useNavigate();

  return (
    <PanelLayout>
      <SubHeader label="Add Report Details " />
      <div class="ct_white_bg">
        <div class="ct_px_30_new pt-4">
          <form>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-4">
                  <label for="" class="ct_fw_600 mb-2">
                    Report Title
                  </label>
                  <input
                    type="text"
                    class="form-control ct_input ct_border_op_10"
                    placeholder="Report Title"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-4">
                  <label for="" class="ct_fw_600 mb-2">
                    Report Type
                  </label>
                  <select class="form-control ct_input ct_border_op_10">
                    <option value="">User Activity</option>
                    <option value="">Bookings</option>
                    <option value="">Payments</option>
                    <option value="">Revenue</option>
                  </select>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group mb-4">
                  <label for="" class="ct_fw_600 mb-2">
                    Start Date
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
                    End Date
                  </label>
                  <input
                    type="date"
                    class="form-control ct_input ct_border_op_10"
                  />
                </div>
              </div>
            </div>

            <button class="ct_orange_btn ct_border_radius_10 ct_h_40 ms-auto" type="button">
              Create Report
            </button>
          </form>
        </div>
      </div>
    </PanelLayout>
  );
};

export default AddReport;

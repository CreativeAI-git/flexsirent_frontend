import { useNavigate } from "react-router";
import SubHeader from "../../shared/layout/SubHeader";
import PanelLayout from "../../shared/layout/PanelLayout";

const AddListingDetail = () => {
  const navigate = useNavigate();

  return (
    <PanelLayout>
      <SubHeader label="Add Listing Details" />
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
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-4">
                  <label for="" class="ct_fw_600 mb-2">
                    Title
                  </label>
                  <input
                    type="url"
                    class="form-control ct_input ct_border_op_10"
                    placeholder="Title"
                  />
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group mb-4">
                  <label for="" class="ct_fw_600 mb-2">
                    Date
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
                    Location
                  </label>
                  <textarea
                    type="text"
                    class="form-control ct_input ct_border_op_10 h-auto"
                    rows="5"
                    placeholder="Location"
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              class="ct_orange_btn ct_border_radius_10 ct_h_40 ms-auto"
              type="button"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </PanelLayout>
  );
};

export default AddListingDetail;

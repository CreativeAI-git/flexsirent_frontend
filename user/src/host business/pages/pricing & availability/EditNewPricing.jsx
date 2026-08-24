import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import PanelLayout from "../../../shared/layout/PanelLayout";

const EditNewPricing = () => {
  const navigate = useLocalizedNavigate();
  const user = { name: "Edit New Pricing", role: "hostBusiness" };
  return (
    <PanelLayout user={user}>
      <div className="row">
        <div className="col-md-12">
          <div className="ct_light_blue_outline py-4">
            {/* <!-- <h4 className="ct_fs_20 ct_fw_600 mb-4">Tell Us About Yourself</h4> --> */}
            <form action="">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group mb-4">
                    <label for="" className="mb-2 ct_fw_500">
                      Base Price
                    </label>
                    <input
                      type="text"
                      className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
                      placeholder="Base Price"
                      value="2500"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-4">
                    <label for="" className="mb-2 ct_fw_500">
                      Date Range
                    </label>
                    <input
                      type="text"
                      id="dateRangeInput2"
                      className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
                      placeholder="e.g. 01 Aug 2025 to 10 Aug 2025"
                      value="01 Aug 2025 to 10 Aug 2025"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-4">
                    <label for="" className="mb-2 ct_fw_500">
                      Availability
                    </label>
                    <select className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10">
                      <option>Available</option>
                      <option>Blocked</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-4">
                    <label for="" className="mb-2 ct_fw_500">
                      Minimum Stay
                    </label>
                    <input
                      type="number"
                      className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
                      placeholder="Minimum Stay"
                      value="2"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-4">
                    <label for="" className="mb-2 ct_fw_500">
                      Maximum Stay
                    </label>
                    <input
                      type="number"
                      className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
                      placeholder="Maximum Stay"
                      value="10"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 justify-content-end mt-4">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                  }}
                  className="ct_outline_btn ct_dark_blue_outline_btn"
                >
                  Cancel
                </a>
                <button
                  className="ct_dark_blue_btn"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
};

export default EditNewPricing;

import { useEffect } from "react";
import { useLocation } from "react-router";
import SubHeader from "../../shared/layout/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import { fetchSubAdminPermissions } from "../../redux/actions/subAdminAction";

const SubAdminDetail = () => {
  const dispatch = useDispatch();
  const subAdminDetails = useLocation()?.state?.data || {};
  const { isLoading, permissionList } = useSelector(
    (state) => state.subAdminReducers
  );
  const permissions =
    subAdminDetails?.permission?.map((item) => item?.type) || [];

  const isAllSelected = permissions?.length === permissionList?.length;

  useEffect(() => {
    dispatch(fetchSubAdminPermissions());
  }, []);


  return (
    <PanelLayout>
      <SubHeader label="Sub Admin Details" />
      <div class="ct_white_bg h-auto">
        <div class="ct_px_30_new pt-4">
          <ul class="ct_view_profile_list">
            <li>
              <p class="mb-0 ct_fw_600">Full Name</p>
              <p class="mb-0">{subAdminDetails?.full_name || "#N/A"}</p>
            </li>
            <li>
              <p class="mb-0 ct_fw_600">Email </p>
              <p class="mb-0">{subAdminDetails?.email || "#N/A"}</p>
            </li>
            <li>
              <p class="mb-0 ct_fw_600">Mobile Number</p>
              <p class="mb-0">{subAdminDetails?.mobile || "#N/A"}</p>
            </li>
          </ul>
        </div>

        <div class="row  mt-3">
          <div class="form-group mb-2">
            <label for="" class="mb-2 ct_fw_600">
              Permissions
            </label>
            <div className="d-flex align-items-center ">
              <label className="ct_checkbox-container">
                <input
                  className="ct_custom-checkbox"
                  type="checkbox"
                  checked={isAllSelected}
                  disabled
                />
                <span className="ct_checkmark"></span>
              </label>
              <p className="mb-0 ct_line_h_27">All</p>
            </div>
          </div>

          {/* Individual permissions */}

          <div className="ct_para_scroll ct_custom_scroll">
            {permissionList?.map((perm) => (
              <div key={perm.type} className="d-flex align-items-center  mb-2">
                <label className="ct_checkbox-container">
                  <input
                    type="checkbox"
                    className="ct_custom-checkbox"
                    disabled
                    
                    checked={permissions?.includes(perm.permission_id)}
                  />
                  <span className="ct_checkmark"></span>
                </label>
                <p className="mb-0 ct_line_h_27">{perm.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PanelLayout>
  );
};

export default SubAdminDetail;

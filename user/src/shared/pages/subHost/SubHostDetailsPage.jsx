import { useEffect } from "react";
import Loader from "../../components/loader";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import PanelLayout from "../../layout/PanelLayout";
import {
  fetchHostPermissions,
  fetchSubHostDetails,
  updateSubHostStatus,
} from "../../../redux/features/host/actions/authAction";

const SubHostDetailsPage = ({ panelRole }) => {
  const dispatch = useDispatch();
  const data = useLocation()?.state?.data || {};
  const { isLoading, permissionList, subHostDetails } = useSelector(
    (state) => state.host.auth
  );
  const permissionAccess =
    subHostDetails?.permission
      ?.filter((item) => item?.type !== 1)
      .map((item) => item?.type) ||
    data?.permission
      ?.filter((item) => item?.type !== 1)
      .map((item) => item?.type) ||
    [];

  const filteredPermissionList = (permissionList || []).filter(
    (perm) => perm.title !== "Dashboard"
  );
  const user = { name: "Sub Host Details", role: panelRole };

  useEffect(() => {
    dispatch(fetchHostPermissions());
    if (data?.host_id) {
      dispatch(fetchSubHostDetails({ payload: data?.host_id }));
    }
  }, [data?.host_id, dispatch]);

  const handleStatusUpdate = (id) => {
    const callback = (res) => {
      if (res?.success) {
        dispatch(fetchSubHostDetails({ payload: id }));
      }
    };

    dispatch(updateSubHostStatus({ payload: id, callback }));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout user={user}>
      <form>
        <div className="ct_light_blue_outline py-4">
          <ul className="ct_view_profile_list">
            <li className="ct_flex_col_575 d-flex d-sm-grid">
              <p className="mb-0 ct_fw_600">First Name :</p>
              <p className="mb-0">{subHostDetails?.first_name}</p>
            </li>
            <li className="ct_flex_col_575 d-flex d-sm-grid">
              <p className="mb-0 ct_fw_600">Last Name :</p>
              <p className="mb-0">{subHostDetails?.last_name}</p>
            </li>
            <li className="ct_flex_col_575 d-flex d-sm-grid">
              <p className="mb-0 ct_fw_600">Email :</p>
              <p className="mb-0">{subHostDetails?.email}</p>
            </li>
            <li className="ct_flex_col_575 d-flex d-sm-grid">
              <p className="mb-0 ct_fw_600"> Phone Number :</p>
              <p className="mb-0">{subHostDetails?.phone}</p>
            </li>
            <li className="ct_flex_col_575 d-flex d-sm-grid">
              <p className="mb-0 ct_fw_600">Status :</p>
              <p className="mb-0">
                <span className="ct_upcoming_clr ct_fw_600">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={subHostDetails?.is_active}
                      onChange={() =>
                        handleStatusUpdate(subHostDetails?.host_id)
                      }
                    />
                    <div className="toggle-switch-background">
                      <div className="toggle-switch-handle"></div>
                    </div>
                  </label>
                </span>
              </p>
            </li>
            <li className="d-block">
              <div>
                <div className="form-group mb-2">
                  <label className="mb-3 ct_fw_600">Permissions</label>
                  <div className="d-flex align-items-center gap-0 ">
                    <label className="ct_checkbox-container">
                      <input
                        className="ct_custom-checkbox"
                        type="checkbox"
                        checked={
                          filteredPermissionList?.length === permissionAccess?.length
                        }
                        readOnly
                      />
                      <span className="ct_checkmark"></span>
                    </label>
                    <p className="mb-0 ct_line_h_27 ct_fw_600">All Modules</p>
                  </div>
                </div>

                {filteredPermissionList.map((perm) => (
                  <div
                    key={perm.type}
                    className="d-flex align-items-center gap-0 mb-2"
                  >
                    <label className="ct_checkbox-container">
                      <input
                        type="checkbox"
                        className="ct_custom-checkbox"
                        checked={permissionAccess.includes(perm.type)}
                        readOnly
                      />
                      <span className="ct_checkmark"></span>
                    </label>
                    <p className="mb-0 ct_line_h_27">{perm.title}</p>
                  </div>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </form>
    </PanelLayout>
  );
};

export default SubHostDetailsPage;

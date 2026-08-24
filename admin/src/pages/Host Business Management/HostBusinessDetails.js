import { useEffect } from "react";
import { useLocation } from "react-router";
import { pipViewDate } from "../../utills/pip";
import Loader from "../../components/form/Loader";
import SubHeader from "../../shared/layout/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import SubHostTable from "../../components/Table/SubHostTable";
import ImageWithPreview from "../../shared/components/image preview/imageWithPreview";
import { fetchHostBusinessDetails, fetchHostBusinessSubHosts } from "../../redux/actions/hostAction";

const HostBusinessDetails = () => {
  const dispatch = useDispatch();
  const host_id = useLocation().state.host_id || {};
  const { hostBusinessData, subHostHeader, isLoading, hostBusinessSubHostDataList } =
    useSelector((state) => state.hostReducers);

  useEffect(() => {
    dispatch(fetchHostBusinessDetails({ payload:  host_id }));
    dispatch(fetchHostBusinessSubHosts({ payload:  host_id }));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout>
      <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_575 pb-4">
          <SubHeader label="Host Business Details" />
      </div>
      <div className="ct_light_yellow_bg mb-4">
        <div className="d-flex gap-3 justify-content-between align-items-center ct_flex_col_767">
          <div className="d-flex gap-4 ct_flex_1 align-items-center">
            <div className="">
              <ImageWithPreview
                image={
                  hostBusinessData?.profile_image ||
                  "https://app.flexsirent.com/user_profile.png"
                }
                className="ct_img_w_90"
              />
            </div>
            <div className="ct_flex_1">
              <div className="d-flex gap-3 justify-content-between flex-wrap">
                <div>
                  <h4 className="ct_fs_20 ct_fw_600 mb-1">
                    {hostBusinessData?.first_name
                      ? `${hostBusinessData?.first_name} ${hostBusinessData?.last_name}`
                      : "#N/A"}
                  </h4>
                  <p className="ct_fs_16 ct_dark_grey_text mb-0">
                    {hostBusinessData?.email || "#N/A"}
                  </p>
                  <p className="ct_fs_16 ct_dark_grey_text mb-0">
                    {hostBusinessData?.phone || ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="ct_flex_1 w-100">
            <ul className="ct_grid_30_auto">
              <li>
                <p className="mb-2 ct_fs_16 ct_text_black">Member Since:</p>
                <p className="mb-2 ct_text_clr_858A9B">
                  {pipViewDate(hostBusinessData?.created_at)}
                </p>
              </li>
            
              <li>
                <p className="mb-2 ct_fs_16 ct_text_black">Total Sub Host:</p>
                <p className="mb-2 ct_text_clr_858A9B">
                  {hostBusinessSubHostDataList?.length || 0}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

         <div className="row">
        <div className="col-md-12">
          <h4 className="ct_fs_20 ct_fw_600 mb-4">Sub Host List</h4>
            <SubHostTable
              data={hostBusinessSubHostDataList}
              tableHeading={subHostHeader}
            />
        
        </div>
      </div>
    </PanelLayout>
  );
};

export default HostBusinessDetails;

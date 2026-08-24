import { useEffect } from "react";
import { useLocation } from "react-router";
import { pipViewDate } from "../../utills/pip";
import SubHeader from "../../shared/layout/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import { fetchUsersBookedProperties } from "../../redux/actions/userAction";
import BookedPropertyTable from "../../components/Table/BookedPropertyTable";
import ImageWithPreview from "../../shared/components/image preview/imageWithPreview";

const ViewUserDetails = () => {
  const dispatch = useDispatch();
  const { propertyBookingHeading, userBookingDetails } = useSelector(
    (state) => state.userReducers
  );
  const user_id = useLocation()?.state?.id || "";

  useEffect(() => {
    dispatch(fetchUsersBookedProperties({ payload: { user_id } }));
  }, []);

  return (
    <PanelLayout>
      <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_575 pb-4">
        <SubHeader label="User Details" />
      </div>
      <div className="ct_light_yellow_bg mb-4">
        <div className="d-flex gap-3 justify-content-between align-items-center ct_flex_col_767">
          <div className="d-flex gap-4 ct_flex_1 align-items-center">
            <div className="">
              <ImageWithPreview
                image={userBookingDetails?.profile_image || "user_profile.png"}
                className="ct_img_w_90"
              />
            </div>
            <div className="ct_flex_1">
              <div className="d-flex gap-3 justify-content-between flex-wrap">
                <div>
                  <h4 className="ct_fs_20 ct_fw_600 mb-1">
                    {userBookingDetails?.first_name
                      ? `${userBookingDetails?.first_name} ${userBookingDetails?.last_name}`
                      : "#N/A"}
                  </h4>
                  <p className="ct_fs_16 ct_dark_grey_text mb-0">
                    {userBookingDetails?.email || "#N/A"}
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
                  {pipViewDate(userBookingDetails?.created_at) || "#N/A"}
                </p>
              </li>
              <li>
                <p className="mb-2 ct_fs_16 ct_text_black">Total Bookings</p>
                <p className="mb-2 ct_text_clr_858A9B">
                  {userBookingDetails?.property_booked?.length || 0}
                </p>
              </li>
              <li>
                <p className="mb-2 ct_fs_16 ct_text_black">
                  Reviews Submitted:
                </p>
                <p className="mb-2 ct_text_clr_858A9B">
                  {userBookingDetails?.review_submitted_count || 0}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h4 className="ct_fs_20 ct_fw_600 mb-4">Booked Properties</h4>
          <BookedPropertyTable
            data={userBookingDetails?.property_booked || []}
            tableHeading={propertyBookingHeading}
          />
        </div>
      </div>
    </PanelLayout>
  );
};

export default ViewUserDetails;

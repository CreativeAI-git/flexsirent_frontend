import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { pipViewDate } from "../../utills/pip";
import Loader from "../../components/form/Loader";
import { useDispatch, useSelector } from "react-redux";
import SubHeader from "../../shared/layout/SubHeader";
import PanelLayout from "../../shared/layout/PanelLayout";
import PropertyTable from "../../components/Table/PropertyTable";
import { fetchHostProperties } from "../../redux/actions/hostAction";
import ListingPropertyTable from "../../components/Table/ListingPropertyTable";
import ImageWithPreview from "../../shared/components/image preview/imageWithPreview";

const HostDetails = () => {
  const dispatch = useDispatch();
  const host_id = useLocation().state.host_id || {};
  const { hostDetail, requestsHeaders, propertyTableHeading, isLoading } =
    useSelector((state) => state.hostReducers);

  const tabs = [
    { value: "propertyListing", label: "Property Listing" },
    { value: "listingRequest", label: "Listing Request" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]?.value);

  useEffect(() => {
    dispatch(fetchHostProperties({ payload: { host_id } }));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout>
      <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_575 pb-4">
          <SubHeader label="Host Details" />
      </div>
      <div className="ct_light_yellow_bg mb-4">
        <div className="d-flex gap-3 justify-content-between align-items-center ct_flex_col_767">
          <div className="d-flex gap-4 ct_flex_1 align-items-center">
            <div className="">
              <ImageWithPreview
                image={
                  hostDetail?.profile_image ||
                  "assets/img/user.png"
                }
                className="ct_img_w_90"
              />
            </div>
            <div className="ct_flex_1">
              <div className="d-flex gap-3 justify-content-between flex-wrap">
                <div>
                  <h4 className="ct_fs_20 ct_fw_600 mb-1">
                    {hostDetail?.first_name
                      ? `${hostDetail?.first_name} ${hostDetail?.last_name}`
                      : "#N/A"}
                  </h4>
                  <p className="ct_fs_16 ct_dark_grey_text mb-0">
                    {hostDetail?.email || "#N/A"}
                  </p>
                  <p className="ct_fs_16 ct_dark_grey_text mb-0">
                    {hostDetail?.phone || ""}
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
                  {pipViewDate(hostDetail?.created_at)}
                </p>
              </li>
              <li>
                <p className="mb-2 ct_fs_16 ct_text_black">Total Properties:</p>
                <p className="mb-2 ct_text_clr_858A9B">
                  {hostDetail?.approved_property_count || 0}{" "}
                </p>
              </li>
              <li>
                <p className="mb-2 ct_fs_16 ct_text_black">Current Bookings:</p>
                <p className="mb-2 ct_text_clr_858A9B">
                  {hostDetail?.current_bookings || 0}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <ul
          class="nav nav-pills mb-3 ct_custom_tabs justify-content-start"
          id="pills-tab"
          role="tablist"
        >
          {tabs?.map((item, index) => (
            <li key={index} class="nav-item" role="presentation">
              <button
                class={`nav-link ct_fw_500 ${
                  item?.value == activeTab ? "active" : ""
                }`}
                id="pills-Flexible-tab"
                onClick={() => {
                  setActiveTab(item?.value);
                }}
                type="button"
              >
                {item?.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="row">
        <div className="col-md-12">
          {tabs[0]?.value == activeTab ? (
            <PropertyTable
              data={hostDetail[activeTab]}
              tableHeading={propertyTableHeading}
            />
          ) : (
            <ListingPropertyTable
              data={hostDetail[activeTab]}
              tableHeading={requestsHeaders}
            />
          )}
        </div>
      </div>
    </PanelLayout>
  );
};

export default HostDetails;

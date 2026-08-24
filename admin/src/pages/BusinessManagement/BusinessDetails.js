import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import Loader from "../../components/form/Loader";
import SubHeader from "../../shared/layout/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import UserTable from "../../components/Table/UserTable";
import PanelLayout from "../../shared/layout/PanelLayout";
import SearchInput from "../../components/form/SearchInput";
import useDebounce from "../../components/hooks/useDebounce";
import SelectDropdown from "../../components/form/SelectDropdown";
import { fetchBusinessUsers } from "../../redux/actions/userAction";
import ImageWithPreview from "../../shared/components/image preview/imageWithPreview";

const BusinessDetails = () => {
  const dispatch = useDispatch();
  const user_id = useLocation()?.state?.id || "";
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);

  const { userTableHeading, businessUserDetail, filterOption, isLoading } =
    useSelector((state) => state.userReducers);

  const filteredData = businessUserDetail?.sub_users?.filter((item) => {
    const fullName = `${item?.first_name} ${item?.last_name}`;
    const search = debouncedSearch
      ? fullName?.toLowerCase()?.includes(debouncedSearch?.toLowerCase())
      : true;
    const status = selectedValue ? item?.is_active == selectedValue : true;
    return search && status;
  });

  useEffect(() => {
    dispatch(fetchBusinessUsers({ payload: { user_id } }));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout>
      <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_575 pb-4">
        <SubHeader label="Business Details" />
      </div>
      <div className="row">
        {[
          {
            value: businessUserDetail?.booking || 0,
            label: "Business Bookings",
          },
          {
            value: businessUserDetail?.total_booking || 0,
            label: "All Users' Bookings",
          },
          { value: businessUserDetail?.total_user || 0, label: "Total Users" },
        ]?.map((item) => (
          <div className="col-xxl-4 col-lg-6 col-md-6 mb-4">
            <div className="ct_dash_card">
              <div className="ct_card_title">
                <h6 className="ct_fs_16 mb-2 ct_black_text ct_text_op_07">
                  {item?.label ?? "#N/A"}
                </h6>
                <h4 className="mb-0 ct_fs_28 ct_fw_700">{item?.value ?? 0}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="ct_light_yellow_bg mb-4">
        <div className="d-flex gap-3 justify-content-between align-items-center ct_flex_col_767">
          <div className="d-flex gap-4 ct_flex_1 align-items-center">
            <div className="">
              <ImageWithPreview
                image={businessUserDetail?.profile_image || "user_profile.png"}
                className="ct_img_w_90"
              />
            </div>
            <div className="ct_flex_1">
              <div className="d-flex gap-3 justify-content-between flex-wrap">
                <div>
                  <h4 className="ct_fs_20 ct_fw_600 mb-1">
                    {businessUserDetail.business_name || "#N/A"}
                  </h4>
                  <p className="ct_fs_16 ct_dark_grey_text mb-0">
                    {businessUserDetail.email || "#N/A"}
                  </p>
                  <p className="ct_fs_16 ct_dark_grey_text mb-0">
                    {businessUserDetail.phone || "#N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="ct_flex_1 w-100">
            <ul className="ct_grid_30_auto">
              <li>
                <p className="mb-2 ct_fs_16 ct_text_black">Contact Person:</p>
                <p className="mb-2 ct_text_clr_858A9B">
                  {businessUserDetail?.first_name
                    ? `${businessUserDetail?.first_name} ${businessUserDetail?.last_name}`
                    : "#N/A"}
                </p>
              </li>
              <li>
                <p className="mb-2 ct_fs_16 ct_text_black">Email :</p>
                <p className="mb-2 ct_text_clr_858A9B">
                  {businessUserDetail.email || "#N/A"}
                </p>
              </li>
              <li>
                <p className="mb-2 ct_fs_16 ct_text_black">Country:</p>
                <p className="mb-2 ct_text_clr_858A9B">
                  {businessUserDetail.country || "#N/A"}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h4 className="ct_fs_20 ct_fw_600 mb-4">Users List</h4>
          <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 pb-4">
            <SearchInput
              value={searchFilter}
              onChange={setSearchFilter}
              placeholder="Search by user name"
            />
            <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 ct_w_100_767">
              <div className="form-group ct_w_100_767">
                <SelectDropdown
                  id="statusfilter"
                  defaultOptions=""
                  options={filterOption}
                  selectedValue={selectedValue}
                  onChange={setSelectedValue}
                />
              </div>
            </div>
          </div>
          <UserTable data={filteredData} tableHeading={userTableHeading} />
        </div>
      </div>
    </PanelLayout>
  );
};

export default BusinessDetails;

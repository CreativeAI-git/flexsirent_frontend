import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTableHeaders } from "../../../shared/hooks/useTableHeaders";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../shared/components/loader";
import { getPermissions } from "../../../shared/utils/pip";
import PanelLayout from "../../../shared/layout/PanelLayout";
import SearchInput from "../../../shared/components/form/SearchInput";
import BookingsRequest from "../../components/Tables/BookingsRequest";
import useDebounce from "../../../shared/components/hooks/useDebounce";
import { fetchHostProfile } from "../../../redux/features/host/actions/authAction";
import { fetchHostDashboardData } from "../../../redux/features/host/actions/bookingAction";

const Dashboard = () => {
  const { t } = useTranslation();
  const { hostRecentBookingHeader, hostDashboardTitles } = useTableHeaders();
  const dispatch = useDispatch();
  const permissions = getPermissions() || "[]";
  const user = { name: t("sidebar.dashboard"), role: "host" };
  const [searchFilter, setSearchFilter] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);
  const isSubHost = localStorage.getItem("isSubHost") == "Yes";

  const { isLoading } = useSelector((state) => state.host.auth);
  const { hostRecentBookingData, hostDashboardData } = useSelector(
    (state) => state.host.booking
  );

  const getHostDashboardTitle = (title) => {
    switch (title) {
      case "Total Properties":
        return hostDashboardTitles.total_properties;
      case "Total Bookings":
        return hostDashboardTitles.total_bookings;
      case "Total Revenue":
        return hostDashboardTitles.total_revenue;
      case "Pending Listings":
        return hostDashboardTitles.pending_listings;
      default:
        return title;
    }
  };

  const filteredData = hostRecentBookingData?.filter((item) => {
    const fullName = `${item?.full_name}`;
    const search = debouncedSearch
      ? fullName?.toLowerCase()?.includes(debouncedSearch?.toLowerCase())
      : true;
    return search;
  });

  const isRecentBookingList = !isSubHost
    ? true
    : permissions?.some((perm) => perm?.title == "Bookings");

  useEffect(() => {
    dispatch(fetchHostProfile());
    dispatch(fetchHostDashboardData());
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout user={user}>
      <div className="row">
        {hostDashboardData?.map((item) => (
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4 mb-xl-3" key={item?.title}>
            <div className="ct_dash_card">
              <p className="ct_text_clr_6B707C mb-2 ct_fw_600">
                {getHostDashboardTitle(item?.title)}
              </p>
              <h4 className="ct_fs_28 ct_fw_600 mb-0">{item?.value ?? 0}</h4>
            </div>
          </div>
        ))}
      </div>
      {isRecentBookingList && (
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_575 mb-3">
              <h4 className="ct_fs_18 ct_fw_600 mb-0">{t("dashboard.recent_bookings")}</h4>
              <SearchInput
                value={searchFilter}
                onChange={setSearchFilter}
                placeholder={t("dashboard.search_by_guest")}
              />
            </div>
            <BookingsRequest
              data={filteredData.slice(0, 5)}
              tableHeading={hostRecentBookingHeader}
            />
          </div>
        </div>
      )}
    </PanelLayout>
  );
};

export default Dashboard;

import { webPath } from "../routes";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTableHeaders } from "../../shared/hooks/useTableHeaders";
import Loader from "../../shared/components/loader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import SearchInput from "../../shared/components/form/SearchInput";
import BookingRequests from "../components/Tables/BookingRequests";
import useDebounce from "../../shared/components/hooks/useDebounce";
import { fetchUserDashboardData, fetchUserRecentBookings } from "../../redux/features/user/actions/bookingAction";

const Dashboard = () => {
  const { t } = useTranslation();
  const { userBookingHeader, guestDashboardTitles } = useTableHeaders();
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const user = { name: t("sidebar.dashboard"), role: "guest" };
  const [searchFilter, setSearchFilter] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);

  const { isLoading, bookingHeader, guestDashboardData, userRecentBookingList } = useSelector(
    (state) => state.guest.booking
  );

  const filteredData = userRecentBookingList?.filter((item) => {
    const fullName = `${item?.host_first_name} ${item?.host_last_name}`;
    const search = debouncedSearch
      ? fullName?.toLowerCase()?.includes(debouncedSearch?.toLowerCase())
      : true;
    return search;
  });

  useEffect(() => {
    dispatch(fetchUserRecentBookings());
    dispatch(fetchUserDashboardData());
  }, []);

  const guestDashboardDataTranslated = [
    { title: guestDashboardTitles.total_bookings, value: guestDashboardData?.total_bookings || 0 },
    { title: guestDashboardTitles.approved_bookings, value: guestDashboardData?.approved_bookings || 0 },
    { title: guestDashboardTitles.pending_bookings, value: guestDashboardData?.pending_bookings || 0 },
    { title: guestDashboardTitles.rejected_bookings, value: guestDashboardData?.rejected_bookings || 0 },
  ];

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout user={user}>
      <div className="row">
        {
          (guestDashboardDataTranslated?.length > 0 ? guestDashboardDataTranslated : [])?.map((item) => (
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4 mb-xl-3">
              <div className="ct_dash_card">
                <p className="ct_text_clr_6B707C mb-2 ct_fw_600">{item?.title}</p>
                <h4 className="ct_fs_28 ct_fw_600 mb-0">{item?.value || 0}</h4>
              </div>
            </div>
          ))}
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_575 mb-3">
            <h4 className="ct_fs_18 ct_fw_600 mb-0">{t("dashboard.recent_bookings")}</h4>
            <SearchInput
              value={searchFilter}
              onChange={setSearchFilter}
              placeholder={t("dashboard.search_by_host")}
            />
          </div>
          <BookingRequests data={filteredData} tableHeading={userBookingHeader} />
        </div>
      </div>
    </PanelLayout>
  );
};

export default Dashboard;

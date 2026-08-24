import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../shared/components/loader";
import PanelLayout from "../../../shared/layout/PanelLayout";
import SearchInput from "../../../shared/components/form/SearchInput";
import useDebounce from "../../../shared/components/hooks/useDebounce";
import BookingsRequest from "../../../host/components/Tables/BookingsRequest";
import TodaysCheckoutTable from "../../../host/components/Tables/TodaysCheckoutTable";
import { useTranslation } from "react-i18next";
import { useTableHeaders } from "../../../shared/hooks/useTableHeaders";
import {
  fetchBookings,
  fetchCheckouts,
} from "../../../redux/features/host/actions/bookingAction";
import { hostBusinessPaths } from "../../routes";

const Bookings = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { hostRecentBookingHeader, hostCheckoutHeader } = useTableHeaders();
  const [searchFilter, setSearchFilter] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);
  const user = { name: t("sidebar.bookings"), role: "hostBusiness" };
  const {
    isLoading,
    checkoutList,
    hostRecentBookingData,
  } = useSelector((state) => state.host.booking);

  const filteredData = hostRecentBookingData?.filter((item) => {
    const fullName =
      `${item?.user_first_name || item?.guest_first_name || ""} ${
        item?.user_last_name || item?.guest_last_name || ""
      }`.trim();

    return debouncedSearch
      ? fullName?.toLowerCase()?.includes(debouncedSearch?.toLowerCase())
      : true;
  });

  useEffect(() => {
    dispatch(fetchBookings());
    dispatch(fetchCheckouts());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout user={user}>
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="d-flex align-items-center justify-content-end gap-3 ct_flex_col_575">
            <SearchInput
              value={searchFilter}
              onChange={setSearchFilter}
              placeholder={t("dashboard.search_by_guest")}
            />
          </div>
          <BookingsRequest
            data={filteredData}
            tableHeading={hostRecentBookingHeader}
            detailRoute={hostBusinessPaths.BookingDetail}
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_575 mb-3">
            <h4 className="ct_fs_18 ct_fw_600 mb-0">{t("dashboard.todays_checkout")}</h4>
          </div>
          <TodaysCheckoutTable
            data={checkoutList}
            tableHeading={hostCheckoutHeader}
          />
        </div>
      </div>
    </PanelLayout>
  );
};

export default Bookings;

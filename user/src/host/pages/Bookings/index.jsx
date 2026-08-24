import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useEffect, useState } from "react";
import Loader from "../../../shared/components/loader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../../shared/layout/PanelLayout";
import SearchInput from "../../../shared/components/form/SearchInput";
import BookingsRequest from "../../components/Tables/BookingsRequest";
import useDebounce from "../../../shared/components/hooks/useDebounce";
import { useTranslation } from "react-i18next";
import { useTableHeaders } from "../../../shared/hooks/useTableHeaders";
import {
  fetchBookings,
  fetchCheckouts,
} from "../../../redux/features/host/actions/bookingAction";
import TodaysCheckoutTable from "../../components/Tables/TodaysCheckoutTable";

const Booking = () => {
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { hostRecentBookingHeader, hostCheckoutHeader } = useTableHeaders();
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);
  const user = { name: t("sidebar.bookings"), role: "host" };
  const {
    isLoading,
    checkoutList,
    hostRecentBookingData,
  } = useSelector((state) => state.host.booking);

  const filteredData = hostRecentBookingData?.filter((item) => {
    const fullName = `${item?.user_first_name} ${item?.user_last_name}`;
    const search = debouncedSearch
      ? fullName?.toLowerCase()?.includes(debouncedSearch?.toLowerCase())
      : true;

    return search;
  });

  useEffect(() => {
    dispatch(fetchBookings());
    dispatch(fetchCheckouts());
  }, []);

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

export default Booking;

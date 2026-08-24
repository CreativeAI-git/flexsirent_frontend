import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTableHeaders } from "../../../shared/hooks/useTableHeaders";
import Loader from "../../../shared/components/loader";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../../shared/utils/pip";
import PanelLayout from "../../../shared/layout/PanelLayout";
import BookingRequests from "../../components/Tables/BookingRequests";
import SearchInput from "../../../shared/components/form/SearchInput";
import useDebounce from "../../../shared/components/hooks/useDebounce";
import { fetchUserBookings } from "../../../redux/features/user/actions/bookingAction";

const Bookings = () => {
  const { t } = useTranslation();
  const { userBookingHeader } = useTableHeaders();
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const user = { name: "Bookings", role: "guest" };
  const [searchFilter, setSearchFilter] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);
  const profileData = getProfile("guest") || {};

  const { isLoading, bookingHeader, userBookingList } = useSelector(
    (state) => state.guest.booking
  );

  const filteredData = userBookingList?.filter((item) => {
    const fullName = `${item?.host_first_name} ${item?.host_last_name}`;
    const search = debouncedSearch
      ? fullName?.toLowerCase()?.includes(debouncedSearch?.toLowerCase())
      : true;

    return search;
  });

  useEffect(() => {
    dispatch(fetchUserBookings());
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
              placeholder={t("search.by_host")}
            />
          </div>
          <BookingRequests
            data={filteredData}
            tableHeading={userBookingHeader}
          />
        </div>
      </div>
    </PanelLayout>
  );
};

export default Bookings;

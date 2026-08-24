import { useEffect, useState } from "react";
import PanelLayout from "../../../shared/layout/PanelLayout";
import SearchInput from "../../../shared/components/form/SearchInput";
import BookingRequestsTable from "../../components/pages/bookings/BookingRequestsTable";
import useDebounce from "../../../shared/components/hooks/useDebounce";

const BookingRequests = () => {
  const user = { name: "Booking Requests", role: "hostBusiness" };
  const [searchFilter, setSearchFilter] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);

  return (
    <PanelLayout user={user}>
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_575 mb-3">
            <SearchInput
              value={searchFilter}
              onChange={setSearchFilter}
              placeholder="Search by guest"
            />
          </div>
          <BookingRequestsTable searchFilter={debouncedSearch} />
        </div>
      </div>
    </PanelLayout>
  );
};

export default BookingRequests;

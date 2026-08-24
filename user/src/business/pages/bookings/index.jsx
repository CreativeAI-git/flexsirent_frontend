import { useEffect, useState } from "react";
import Loader from "../../../shared/components/loader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../../shared/layout/PanelLayout";
import BookingTable from "../../components/my boookings/BookingTable";
import SearchInput from "../../../shared/components/form/SearchInput";
import SelectDropdown from "../../../shared/components/form/SelectDropdown";
import { fetchBookings } from "../../../redux/features/business/actions/bookingAction";

const Bookings = () => {
  const dispatch = useDispatch();
  const user = { name: "Bookings", role: "guestBusiness" };
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedValue, setSelectedValue] = useState();
  const [selectedValue1, setSelectedValue1] = useState();
  const { options, options1, isLoading } = useSelector((state) => state.business.booking);

  useEffect(() => {
    dispatch(fetchBookings());
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout user={user}>
      <div className="d-flex align-items-center justify-content-end gap-3 ct_flex_col_575">
        <SearchInput
          value={searchFilter}
          onChange={setSearchFilter}
          placeholder="Search by Property Name"
        />
        {/* <SelectDropdown
          id="statusfilter"
          defaultOptions=""
          options={options}
          selectedValue={selectedValue}
          onChange={setSelectedValue}
        />
        <SelectDropdown
          id="dayfilter"
          defaultOptions=""
          options={options1}
          selectedValue={selectedValue1}
          onChange={setSelectedValue1}
        /> */}
      </div>
      <BookingTable searchFilter={searchFilter} />
    </PanelLayout>
  );
};

export default Bookings;

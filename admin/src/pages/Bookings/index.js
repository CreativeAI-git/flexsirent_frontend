import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../components/form/Loader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import SearchInput from "../../components/form/SearchInput";
import useDebounce from "../../components/hooks/useDebounce";
import BookingTable from "../../components/Table/BookingTable";
import { fetchBookings } from "../../redux/actions/hostAction";
import SelectDropdown from "../../components/form/SelectDropdown";

const Booking = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);
  
  const {
    bookingTableHeading,
    bookingTableData,
    filterBookingOption,
    bookingCount,
    isLoading,
  } = useSelector((state) => state.hostReducers);

  const filteredData =
    bookingTableData?.filter((item) => {
      const propertyName = `${item?.property_title}`;
      const search = debouncedSearch
        ? propertyName?.toLowerCase()?.includes(debouncedSearch?.toLowerCase())
        : true;
      const status = selectedValue ? item?.status_label == selectedValue : true;
      const dateMatch = selectedDate
        ? item?.created_at?.slice(0, 10) === selectedDate
        : true;
      return search && status && dateMatch;
    }) || [];

  useEffect(() => {
    dispatch(fetchBookings());
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout>
      <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_575 pb-4">
        <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_black_text pb-4">
          Booking Overview
        </h4>
      </div>
      <div className="row">
        <div className="col-xxl-3 col-lg-6 col-md-6 mb-4">
          <div className="ct_dash_card">
            <div className="ct_card_title">
              <h6 className="ct_fs_16 mb-2 ct_black_text ct_text_op_07">
                Total Bookings
              </h6>
              <h4 className="mb-0 ct_fs_28 ct_fw_700">
                {bookingCount?.total_bookings || 0}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-lg-6 col-md-6 mb-4">
          <div className="ct_dash_card">
            <div className="ct_card_title">
              <h6 className="ct_fs_16 mb-2 ct_black_text ct_text_op_07">
                Completed
              </h6>
              <h4 className="mb-0 ct_fs_28 ct_fw_700">
                {bookingCount?.completed || 0}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-lg-6 col-md-6 mb-4">
          <div className="ct_dash_card">
            <div className="ct_card_title">
              <h6 className="ct_fs_16 mb-2 ct_black_text ct_text_op_07">
                Upcoming
              </h6>
              <h4 className="mb-0 ct_fs_28 ct_fw_700">
                {bookingCount?.upcoming || 0}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-lg-6 col-md-6 mb-4">
          <div className="ct_dash_card">
            <div className="ct_card_title">
              <h6 className="ct_fs_16 mb-2 ct_black_text ct_text_op_07">
                Cancelled
              </h6>
              <h4 className="mb-0 ct_fs_28 ct_fw_700">
                {bookingCount?.cancelled || 0}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h4 className="ct_fs_20 ct_fw_600 mb-4">List of Bookings</h4>
          <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 pb-4">
            <div className="ct_search ct_w_100_search_767">
              <SearchInput
                value={searchFilter}
                onChange={setSearchFilter}
                placeholder="Search by property name"
              />

              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 ct_w_100_767">
              <div className="form-group ct_w_100_767">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  className="form-control ct_input ct_light_blue_input_border ct_input_h_50"
                />
              </div>
              <div className="form-group ct_w_100_767">
                <SelectDropdown
                  id="statusfilter"
                  defaultOptions=""
                  options={filterBookingOption}
                  selectedValue={selectedValue}
                  onChange={setSelectedValue}
                />
              </div>
            </div>
          </div>

          <BookingTable
            data={filteredData}
            tableHeading={bookingTableHeading}
          />
        </div>
      </div>
    </PanelLayout>
  );
};

export default Booking;

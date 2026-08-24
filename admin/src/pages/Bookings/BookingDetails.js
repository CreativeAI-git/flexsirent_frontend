import { useEffect } from "react";
import { useParams } from "react-router";
import Loader from "../../components/form/Loader";
import SubHeader from "../../shared/layout/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import { fetchBookingDetail } from "../../redux/actions/hostAction";
import { changeStatusColor, curSym, pipViewDate } from "../../utills/pip";
import PropertyOverView from "../../components/pages/Property/PropertyOverView";

const BookingDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { bookingData, isLoading } = useSelector((state) => state.hostReducers);

  useEffect(() => {
    dispatch(fetchBookingDetail(id));
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout>
      <div className="d-flex ct_flex_col_575 align-items-center justify-content-between gap-3 pb-4">
        <SubHeader label="Booking Details"   paddingClass="pb-0"/>
        <span
          className={`${changeStatusColor(
            bookingData?.status_label ?? "",
          )} ct_fw_600`}
        >
          {bookingData?.status_label ?? "#N/A"}
        </span>
      </div>
      <div className="ct_light_orange_bg ct_grid_4">
        <div>
          <h6 className="mb-1 ct_fs_16">Booking ID</h6>
          <p className="mb-0 ct_text_4B5563">#{id}</p>
        </div>
        <div>
          <h6 className="mb-1 ct_fs_16">Booked On</h6>
          <p className="mb-0 ct_text_4B5563">
            {pipViewDate(bookingData?.created_at) || "#N/A"}
          </p>
        </div>
        <div>
          <h6 className="mb-1 ct_fs_16">Amount Paid</h6>
          <p className="mb-0 ct_text_4B5563">
            {curSym}
            {bookingData?.total_price || 0}
          </p>
        </div>
        <div>
          <h6 className="mb-1 ct_fs_16">Check-In Date</h6>
          <p className="mb-0 ct_text_4B5563">
            {pipViewDate(bookingData?.booked_from) || "#N/A"}
          </p>
        </div>
        <div>
          <h6 className="mb-1 ct_fs_16">Check-Out Date</h6>
          <p className="mb-0 ct_text_4B5563">
            {pipViewDate(bookingData?.booked_to) || "#N/A"}
          </p>
        </div>
        <div>
          <h6 className="mb-1 ct_fs_16">Host Name</h6>
          <p className="mb-0 ct_text_4B5563">{`${bookingData?.host_first_name || ""} ${bookingData?.host_last_name || ""}`}</p>
        </div>
      </div>
      <PropertyOverView data={bookingData} />
    </PanelLayout>
  );
};

export default BookingDetails;

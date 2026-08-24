import { useEffect } from "react";
import Loader from "../../components/form/Loader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import BookingTable from "../../components/Table/BookingTable";
import { fetchDashboard } from "../../redux/actions/hostAction";
import { fetchSubAdminPermissions } from "../../redux/actions/subAdminAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {  isLoading } =
    useSelector((state) => state.authReducers);
  const { cardData, bookingTableHeading } = useSelector((state) => state.hostReducers);

  useEffect(() => {
    dispatch(fetchDashboard());
    dispatch(fetchSubAdminPermissions());
  }, []);

  if (isLoading) {
    return <Loader />
  }
  return (
    <PanelLayout>
      <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_black_text pb-4">Dashboard</h4>
      <div className="row">
        {[
          {
            label: "Total Users",
            value: cardData?.total_users || 0,
          },
          {
            label: "Total Properties",
            value: cardData?.total_properties || 0,
          },
          {
            label: "Total Bookings",
            value: cardData?.total_booking || 0,
          },
          {
            label: "Total Host",
            value: cardData?.total_host || 0,
          },
        ]?.map((item) => (
          <div className="col-xxl-3 col-lg-6 col-sm-6 mb-4">
            <div className="ct_dash_card">
              <div className="ct_card_title">
                <h6 className="ct_fs_16 mb-2 ct_black_text ct_text_op_07">
                  {item?.label ?? "#N/A"}
                </h6>
                <h4 className="mb-0 ct_fs_28 ct_fw_700">
                  {item?.value ?? "0"}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Graph Start */}
      <div className="row">
        <div className="col-md-6 mb-4 mb-md-0">
          <div id="activity_chart" className="mx-auto"></div>
        </div>
        <div className="col-md-6 mb-4 mb-md-0">
          <div id="user_registration_chart" className="mx-auto"></div>
        </div>
      </div>
      {/* Graph End */}
      <div className="row">
        <div className="col-md-12">
          <h4 className="ct_fs_20 ct_fw_600 mb-4">Recent Bookings</h4>
          <BookingTable data={cardData?.recent_booking?.slice(0, 5) || []} tableHeading={bookingTableHeading} />

        </div>
      </div>
    </PanelLayout>
  );
};

export default Dashboard;

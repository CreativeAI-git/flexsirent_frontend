import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useParams } from "react-router";
import Loader from "../../shared/components/loader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import BookingTable from "../components/my boookings/BookingTable";
import { fetchBookings, fetchDashboard } from "../../redux/features/business/actions/bookingAction";

const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useLocalizedNavigate();
  const { lang } = useParams();
  const user = { name: "Dashboard", role: "guestBusiness" };
  const { businessDashboard, isLoading } = useSelector(
    (state) => state.business.booking
  );

  useEffect(() => {
    dispatch(fetchDashboard());
    dispatch(fetchBookings());
  }, []);

  if (isLoading) {
    return <Loader />;
  };
  return (
    <PanelLayout user={user}>
      <div className="row">
        {businessDashboard?.length != 0 && businessDashboard?.map((item) => (
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4 mb-xl-3">
            <div className="ct_dash_card">
              <p className="ct_text_clr_6B707C mb-2 ct_fw_600">
                {item?.title ?? ""}
              </p>
              <h4 className="ct_fs_28 ct_fw_600 mb-0">{item?.value ?? 0}</h4>
            </div>
          </div>
        ))}
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_575 mb-3">
            <h4 className="ct_fs_18 ct_fw_600 mb-0">{t("dashboard.recent_bookings")}</h4>
          </div>
          <BookingTable />
        </div>
      </div>
    </PanelLayout>
  );
};

export default Dashboard;

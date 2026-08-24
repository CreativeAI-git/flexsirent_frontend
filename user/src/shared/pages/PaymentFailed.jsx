import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Loader from "../components/loader";
import { useLocation } from "react-router";
import { webPath } from "../../user/routes";
import { businessPath } from "../../business/routes";
import { useDispatch, useSelector } from "react-redux";
import { guestOrBusinessPayFailedAPI } from "../routes/apiURLs";
import { guestOrBusinessPay } from "../../redux/features/business/actions/bookingAction";

const PaymentFailed = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.business.booking);
  const queryParams = new URLSearchParams(location.search);

  const session_id = queryParams.get("session_id");
  const userType = queryParams.get("user_type");

  useEffect(() => {
    dispatch(
      guestOrBusinessPay({
        payload: { session_id },
        url: guestOrBusinessPayFailedAPI,
      })
    );
  }, [session_id]);

  const hadnleNavigate = () => {
    if (userType == 2) {
      window.location.href = businessPath?.Bookings;
    } else {
      window.location.href = webPath?.Bookings;
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div
        className="ct_dashbaord_bg"
        style={{ backgroundColor: "hsl(348.88deg 85.77% 53.14% / 7%)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7 mx-auto">
              <div className="ct_white_bg_1 ct_sucessful_msg_body">
                <img loading="lazy"
                  src="https://app.flexsirent.com/assests/img/False_Icon.png"
                  alt=""
                />
                <h3
                  className="ct_fs_24 text-center ct_fw_700 mb-0"
                  style={{ marginTop: "30PX" }}
                >
                  {t("payment.failed_title")}
                </h3>
                <p className="mt-3">
                  {t("payment.failed_desc")}
                </p>

                <button
                  className="ct_orange_btn mt-3 mx-auto"
                  onClick={hadnleNavigate}
                >
                  {t("payment.back_to_bookings")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentFailed;

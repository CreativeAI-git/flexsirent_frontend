import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "../components/loader";
import { useLocation } from "react-router";
import { webPath } from "../../user/routes";
import { businessPath } from "../../business/routes";
import { useDispatch, useSelector } from "react-redux";
import { guestOrBusinessPaySuccessAPI } from "../routes/apiURLs";
import { guestOrBusinessPay } from "../../redux/features/business/actions/bookingAction";

const PaymentSuccess = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.business.booking);
  const queryParams = new URLSearchParams(location.search);

  const session_id = queryParams.get("session_id");
  const userType = queryParams.get("user_type");

  const [verificationStatus, setVerificationStatus] = useState("verifying"); // verifying, success, failed
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!session_id) {
      setVerificationStatus("failed");
      setErrorMsg("Missing session ID.");
      return;
    }

    setVerificationStatus("verifying");
    dispatch(guestOrBusinessPay({ payload: { session_id }, url: guestOrBusinessPaySuccessAPI }))
      .then((action) => {
        if (action.payload?.success) {
          setVerificationStatus("success");
        } else {
          setVerificationStatus("failed");
          setErrorMsg(action.payload?.message || "Payment verification failed. Please contact support.");
        }
      })
      .catch(() => {
        setVerificationStatus("failed");
        setErrorMsg("An error occurred while verifying the payment.");
      });
  }, [session_id, dispatch]);

  const hadnleNavigate = () => {
    if (userType == 2) {
      window.location.href = businessPath?.Bookings;
    } else {
      window.location.href = webPath?.Bookings;
    }
  };

  if (verificationStatus === "verifying" || isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <Loader />
        <p style={{ marginTop: "20px", fontWeight: "600", fontSize: "16px", color: "#7b7369" }}>
          Verifying your payment, please do not close this window...
        </p>
      </div>
    );
  }

  if (verificationStatus === "failed") {
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
                    style={{ marginTop: "30px", color: "#dc2626" }}
                  >
                    Payment Verification Failed
                  </h3>
                  <p className="mt-3 text-center text-muted">
                    {errorMsg}
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
  }

  return (
    <>
      <div
        className="ct_dashbaord_bg"
        style={{ backgroundColor: "hsl(90.81deg 92.5% 31.37% / 7%)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-7 mx-auto">
              <div className="ct_white_bg_1 ct_sucessful_msg_body">
                <img loading="lazy"
                  src="https://app.flexsirent.com/assests/img/Right_Icon.png"
                  alt=""
                />
                <h3
                  className="ct_fs_24 text-center ct_fw_700 mb-0"
                  style={{ marginTop: "30PX" }}
                >
                  {t("payment.success_title")}
                </h3>

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

export default PaymentSuccess;

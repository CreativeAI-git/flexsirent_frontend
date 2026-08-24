import Eye from "../form/Eye";
import { Formik } from "formik";
import { useState } from "react";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { webPath } from "../../../user/routes";
import ErrorMessage from "../form/ErrorMessage";
import { hostRoutes } from "../../../host/routes";
import { signInSchema } from "../../utils/schema";
import SelectDropdown from "../form/SelectDropdown";
import { useDispatch, useSelector } from "react-redux";
import { businessPath } from "../../../business/routes";
import { hostBusinessPaths } from "../../../host business/routes";
import {
  authSignin,
  fetchUserProfile,
} from "../../../redux/features/user/actions/authAction";
import { fetchHostProfile } from "../../../redux/features/host/actions/authAction";
import { requestForToken } from "../../utils/firebaseUtils";
import HostStripeSetupModal from "./HostStripeSetupModal";

const LoginModal = ({
  type,
  isOpen,
  closeModal,
  onSignupClick,
  onforgotPassClick,
}) => {
  const { options, isLoading } = useSelector((state) => state.guest.auth);
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStripeSetupModalOpen, setIsStripeSetupModalOpen] = useState(false);
  const [stripeLoginData, setStripeLoginData] = useState(null);
  const [isEye, setIsEye] = useState(false);

  const roleRoutes = {
    host: hostRoutes,
    business: businessPath,
    hostBusiness: hostBusinessPaths,
    guest: webPath,
  };

  const routes = roleRoutes[type];

  const getLoginPanel = (responseData) => {
    const accountType = responseData?.account_type;

    if (accountType === "user" || accountType === "guest") {
      return "guest";
    }

    if (accountType === "host") {
      return responseData?.user_type == 3 ? "host" : "host";
    }

    if (accountType === "business" || accountType === "guest_business") {
      return "guestBusiness";
    }

    if (accountType === "host_business") {
      return "hostBusiness";
    }

    if (responseData?.user_type == 1 || responseData?.user_type == 3) {
      return type === "guest" ? "guest" : "host";
    }

    return type === "guest" ? "guestBusiness" : "hostBusiness";
  };

  const dispatchProfileByPanel = (panel) => {
    if (panel === "guest" || panel === "guestBusiness") {
      dispatch(fetchUserProfile());
      return;
    }

    dispatch(fetchHostProfile());
  };

  const getDashboardRoute = (responseData) => {
    const loginPanel = getLoginPanel(responseData);

    if (loginPanel === "guest") {
      return webPath?.Dashboard;
    }

    if (loginPanel === "guestBusiness") {
      return businessPath?.Dashboard;
    }

    if (loginPanel === "host") {
      return hostRoutes?.Dashboard;
    }

    return hostBusinessPaths?.Dashboard;
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSignIn = async (values) => {
    if (isSubmitting || isLoading) {
      return;
    }

    setIsSubmitting(true);
    const fcmToken = await requestForToken();
    const payload = {
      type: type == "guest" ? 1 : 2,
      ...values,
      user_type: selectedValue,
      ...(fcmToken ? { fcm_token: fcmToken } : {}),
    };

    const callback = (response) => {
      setIsSubmitting(false);

      if (!response?.success) {
        return;
      }

      const redirectData = sessionStorage.getItem("postLoginRedirect");
      const loginPanel = getLoginPanel(response?.data);

      if (redirectData) {
        const { path, state } = JSON.parse(redirectData);

        sessionStorage.removeItem("postLoginRedirect");
        dispatchProfileByPanel(loginPanel);
        navigate(path, { state });
        return;
      }

      const isHostOrHostBusiness =
        loginPanel === "host" || loginPanel === "hostBusiness";
      const shouldOpenStripeSetup =
        isHostOrHostBusiness &&
        response?.data?.user_type != 3 &&
        response?.data?.kyc_completed === false;

      // if (shouldOpenStripeSetup) {
      //   dispatch(fetchHostProfile());
      //   closeModal(false);
      //   setStripeLoginData(response?.data || null);
      //   setIsStripeSetupModalOpen(true);
      //   return;
      // }
      dispatchProfileByPanel(loginPanel);
      navigate(getDashboardRoute(response?.data));

    };

    dispatch(
      authSignin({
        payload,
        panel: type,
        callback,
      }),
    );
  };

  const isLoginBusy = isSubmitting || isLoading;

  return (
    <>
      <div
        className={`modal fade modal-xl ct_custom_modal_main ct_login_modal ${
          isOpen ? "show" : ""
        }`}
        id="ct_login_modal"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0 py-0">
              <button
                type="button"
                className="btn-close ct_login_btn_close"
                onClick={() => {
                  closeModal(false);
                }}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-0">
              <div className="ct_login_main">
                <div className="ct_login_left_cnt">
                  <div className="text-center">
                    <img src="/assets/img/logo.svg" alt="Flexsirent" style={{ width: "160px", marginBottom: "30px" }} />
                    <p className="ct_fs_16 ct_fw_500" style={{ color: "#071537", lineHeight: "1.6" }}>
                      Simplify your next move with one click.
                    </p>
                    <span className="ct_fs_24 ct_fw_700 ct_orange_text">Get Started</span>
                  </div>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={signInSchema}
                  enableReinitialize
                  onSubmit={(values) => {
                    handleSignIn(values);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <h2 className="ct_fs_20 ct_fw_600 mb-4">Log In</h2>
                      <div className="form-group mb-4">
                        <label className="mb-2 ct_fw_400">Email</label>
                        <input
                          type="email"
                          placeholder="Email"
                          className="form-control ct_input"
                          id="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.email}
                        />
                        <ErrorMessage
                          errors={errors}
                          touched={touched}
                          fieldName="email"
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label className="mb-2 ct_fw_400">Password</label>
                        <div className="position-relative">
                          <input
                            placeholder="Password"
                            className="form-control ct_input pe-5"
                            type={isEye ? "text" : "password"}
                            id="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.password}
                          />
                          <Eye isEye={isEye} onClick={setIsEye} />
                        </div>
                        <ErrorMessage
                          errors={errors}
                          touched={touched}
                          fieldName="password"
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label className="mb-2 ct_fw_400">
                          Are you a Business
                        </label>
                        <div className="position-relative">
                          <SelectDropdown
                            id="statusfilter"
                            defaultOptions=""
                            options={options}
                            selectedValue={selectedValue}
                            onChange={setSelectedValue}
                          />
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-1"></div>
                        <div>
                          <a
                            href="#"
                            className="ct_orange_text ct_fW_700"
                            onClick={onforgotPassClick}
                          >
                            Forgot Password?
                          </a>
                        </div>
                      </div>
                      <div className="mt-4">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (isLoginBusy) {
                              return;
                            }
                            handleSubmit();
                          }}
                          aria-label="Close"
                          className={`ct_orange_btn w-100 ${
                            isLoginBusy ? "disabled" : ""
                          }`}
                          aria-disabled={isLoginBusy}
                          style={{
                            pointerEvents: isLoginBusy ? "none" : "auto",
                            opacity: isLoginBusy ? 0.7 : 1,
                          }}
                        >
                          {isLoginBusy ? "Logging In..." : "Log In"}
                        </a>
                      </div>
                      <p className="mb-0 mt-2 text-center">
                        Don't Have an Account?{" "}
                        <a
                          href=""
                          className="ct_fw_600 ct_orange_text"
                          onClick={(e) => {
                            e.preventDefault();
                            onSignupClick();
                          }}
                        >
                          Sign Up
                        </a>
                      </p>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HostStripeSetupModal
        isOpen={isStripeSetupModalOpen}
        closeModal={setIsStripeSetupModalOpen}
        loginResponseData={stripeLoginData}
        redirectPath={getDashboardRoute(stripeLoginData)}
      />
    </>
  );
};

export default LoginModal;

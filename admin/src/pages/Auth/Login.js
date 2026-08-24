import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import Eye from "../../components/form/Eye";
import { signInSchema } from "../../utills/schema";
import { pageRoutes } from "../../routes/PageRoutes";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../../redux/actions/authAction";
import ErrorMessage from "../../components/form/ErrorMessage";
import { requestForToken } from "../../shared/utils/firebaseUtils";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEye, setIsEye] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isLoading } = useSelector((state) => state.authReducers);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = async (values) => {
    if (isSubmitting || isLoading) {
      return;
    }

    setIsSubmitting(true);
    const fcmToken = await requestForToken();
    const callback = (response) => {
      setIsSubmitting(false);
      if (response?.success) {
        navigate(pageRoutes?.dashboard);
      }
    };
    dispatch(
      authLogin({
        payload: {
          ...values,
          ...(fcmToken ? { fcm_token: fcmToken } : {}),
        },
        callback,
      })
    );
  };
  const isLoginBusy = isSubmitting || isLoading;
  return (
    <section className="ct_login_bg">
      <div className="container">
        <div className="row">
          <div className="col-xxl-8 col-xl-10 col-lg-10 col-md- mx-auto">
            <div className="ct_login_white_bg ct_mt_60 ct_mb_60">
              <div className="ct_login_left_img">
                <img  loading="lazy" src="assets/img/login_img.jpg" alt="" />
              </div>
              <div className="ct_login_form">
                <div className=" mb-4">
                  <h4 className="ct_fs_24 ct_fw_600">Log In</h4>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={signInSchema}
                  onSubmit={(values, actions) => {
                    handleLogin(values);
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
                    <form className="ct_mt_30">
                      <div className="form-group mb-3">
                        <label
                          for=""
                          className="ct_fw_400 mb-2 ct_text_4B5563 "
                        >
                          Email
                        </label>
                        <div className="position-relative">
                          <input
                            placeholder="Email"
                            className="form-control ct_input ct_border_grey"
                            type="text"
                            id="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.email}
                          />
                        </div>
                        <ErrorMessage
                          errors={errors}
                          touched={touched}
                          fieldName="email"
                        />
                      </div>
                      <div className="form-group mb-2">
                        <label
                          for=""
                          className="ct_fw_400 mb-2 ct_text_4B5563 "
                        >
                          Password
                        </label>
                        <div className="position-relative">
                          <input
                            type={isEye ? "text" : "password"}
                            id="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.password}
                            class="form-control  ct_input ct_border_grey pe-5"
                            placeholder="Password"
                          />
                          <Eye isEye={isEye} className="" onClick={() => setIsEye(!isEye)} />
                        </div>
                        <ErrorMessage
                          errors={errors}
                          touched={touched}
                          fieldName="password"
                        />
                      </div>
                      <div className="text-end">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            navigate(pageRoutes.forgotPassword)
                          }}
                          className=" ct_orange_link "
                        >
                          Forgot Password?
                        </a>
                      </div>
                      <div className="mt-5">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (isLoginBusy) {
                              return;
                            }
                            handleSubmit();
                          }}
                          type="button"
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
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

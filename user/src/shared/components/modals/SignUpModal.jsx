import Eye from "../form/Eye";
import Loader from "../loader";
import { Formik } from "formik";
import { useState } from "react";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import ErrorMessage from "../form/ErrorMessage";
import { signUpSchema } from "../../utils/schema";
import SelectDropdown from "../form/SelectDropdown";
import { useDispatch, useSelector } from "react-redux";
import { authSignup } from "../../../redux/features/user/actions/authAction";
const SignUpModal = ({ type, isOpen, closeModal, signupToLogin }) => {
  const { options, isLoading } = useSelector((state) => state.guest.auth);
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const [isEye, setIsEye] = useState(false);
  const [isEye1, setIsEye1] = useState(false);
  const [selectedValue, setSelectedValue] = useState(1);

  const initialValues = {
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
  };

  const handleSignUp = async (values) => {
    const { confirm_password, ...rest } = values;
// 🧹 Trim all string fields
  const trimmedData = Object.fromEntries(
    Object.entries(rest).map(([key, value]) => [
      key,
      typeof value === "string" ? value.trim() : value,
    ])
  );

  const payload = {
    type: type === "guest" ? 1 : 2,
    user_type: selectedValue, // 1 = normal, 2 = Business
    ...trimmedData,
  };
    const callback = (response) => {
      if (response.success) {
        signupToLogin();
      }
    };
    dispatch(
      authSignup({
        payload: payload,
        callback,
      })
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      className={`modal fade modal-xl ct_custom_modal_main ct_login_modal ${
        isOpen ? "show" : ""
      }`}
      id="ct_signup_modal"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0 py-0">
            <button
              onClick={() => {
                closeModal(false);
              }}
              type="button"
              className="btn-close ct_login_btn_close"
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
                validationSchema={signUpSchema}
                enableReinitialize
                onSubmit={(values, actions) => {
                  handleSignUp(values);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <h2 className="ct_fs_20 ct_fw_600 mb-4">
                      Create an Account
                    </h2>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label for="" className="mb-2 ct_fw_400">
                            First Name
                          </label>
                          <input
                            type="text"
                            placeholder="First Name"
                            className="form-control ct_input"
                            id="first_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values?.first_name}
                          />
                          <ErrorMessage
                            errors={errors}
                            touched={touched}
                            fieldName="first_name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label for="" className="mb-2 ct_fw_400">
                            Last Name
                          </label>
                          <input
                            type="text"
                            placeholder="Last Name"
                            className="form-control ct_input"
                            id="last_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values?.last_name}
                          />
                          <ErrorMessage
                            errors={errors}
                            touched={touched}
                            fieldName="last_name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <label for="" className="mb-2 ct_fw_400">
                        Email
                      </label>
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
                      <label for="" className="mb-2 ct_fw_400">
                        Password
                      </label>
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
                      <label for="" className="mb-2 ct_fw_400">
                        Confirm Password
                      </label>
                      <div className="position-relative">
                        <input
                          placeholder=" Confirm Password"
                          className="form-control ct_input pe-5"
                          type={isEye1 ? "text" : "password"}
                          id="confirm_password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values?.confirm_password}
                        />
                        <Eye isEye={isEye1} onClick={setIsEye1} />
                      </div>
                      <ErrorMessage
                        errors={errors}
                        touched={touched}
                        fieldName="confirm_password"
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label className="mb-2 ct_fw_400">
                        {type === "guest" ? "Are you registering as an Individual or Company?" : "Are you a Business"}
                      </label>
                      <div className="position-relative">
                        <SelectDropdown
                          id="statusfilter"
                          defaultOptions=""
                          options={type === "guest" ? [{ value: 1, label: "Individual" }, { value: 2, label: "Company" }] : options}
                          selectedValue={selectedValue}
                          onChange={setSelectedValue}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSubmit();
                        }}
                        //   data-bs-toggle="modal"
                        //   data-bs-target="#ct_login_modal"
                        className="ct_orange_btn w-100 "
                      >
                        Sign Up
                      </a>
                    </div>
                    <p className="mb-0 mt-2 text-center">
                      Already Have an Account?
                      <a
                        href="#"
                        className="ct_fw_600 ct_orange_text"
                        onClick={signupToLogin}
                      >{" "}
                        Log In
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
  );
};

export default SignUpModal;

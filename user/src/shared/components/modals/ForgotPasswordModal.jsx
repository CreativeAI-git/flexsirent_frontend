import Loader from "../loader";
import { Formik } from "formik";
import ErrorMessage from "../form/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordSchema } from "../../utils/schema";
import { authForgotPassword } from "../../../redux/features/user/actions/authAction";

const ForgotPasswordModal = ({ type, isOpen, closeModal, onLoginClick }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.guest.auth);
  const initialState = {
    email: "",
  };

  const handleForgotPassword = async (values) => {
    const payload = {
      type: type == "guest" ? 1 : 2,
      ...values,
    };
    const callback = (response) => {
      if (response.success) {
        onLoginClick();
      }
    };
    dispatch(authForgotPassword({ payload, callback }));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      className={`modal fade modal-xl ct_custom_modal_main ct_login_modal ${isOpen ? "show" : ""
        }`}
      id="ct_forgot_password_modal"
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
                initialValues={initialState}
                validationSchema={forgotPasswordSchema}
                enableReinitialize
                onSubmit={(values, actions) => {
                  handleForgotPassword(values);
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
                    <h2 className="ct_fs_20 ct_fw_600 mb-2">Forgot Password</h2>
                    <p className="mb-4">
                      Don’t worry, happens to all of us. Enter your email below
                      to recover your password
                    </p>
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
                    <div className="mt-4">
                      <button
                        className="ct_orange_btn w-100"
                        type="button"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                    <p className="mb-0 mt-2 text-center">
                      Already Know Your Password?{" "}
                      <a
                        href="#"
                        className="ct_fw_600 ct_orange_text"
                        onClick={onLoginClick}
                      >
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

export default ForgotPasswordModal;

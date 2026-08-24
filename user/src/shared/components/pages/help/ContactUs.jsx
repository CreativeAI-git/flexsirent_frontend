import { Formik } from "formik";
import { useDispatch } from "react-redux"
import ErrorMessage from "../../form/ErrorMessage";
import { contactUsSchema } from "../../../utils/schema";
import { sendQuery } from "../../../../redux/features/user/actions/authAction";
const ContactUs = () => {
  const dispatch = useDispatch()

  const initialState = {
    name: "",
    email: "",
    message: "",
    accept: false,
  };

  const handleContactUs = (values, actions) => {
    const { accept, ...rest } = values;
    const callback = (res) => {
      if (res?.success) {
        actions.resetForm();
      }
    };
    dispatch(sendQuery({ payload: rest, callback }));
  };

  return (
    <div className="bg-white h-100 p-sm-4 p-3 ct_custom_box_shodow ct_border_radius_20">
      <h2 className="ct_font_poppins ct_fs_20 ct_mb_12 ct_fw_500 ct_dark_blue_text">Submit a Query</h2>
      <div className="">
        <div className="">
          <Formik
            initialValues={initialState}
            validationSchema={contactUsSchema}
            onSubmit={(values, actions) => {
              handleContactUs(values, actions);
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
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <input
                        type="text"
                        placeholder="Name"
                        className="form-control ct_input ct_border_CDD5C8 ct_input_h_50"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values["name"]}
                      />
                      <ErrorMessage
                        errors={errors}
                        touched={touched}
                        fieldName={"name"}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <input
                        type="email"
                        placeholder="Email"
                        className="form-control ct_input ct_border_CDD5C8 ct_input_h_50"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values["email"]}
                      />
                      <ErrorMessage
                        errors={errors}
                        touched={touched}
                        fieldName={"email"}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-4">
                      <textarea
                        placeholder="Message"
                        className="form-control ct_border_CDD5C8 ct_input  h-auto"
                        rows="5"
                        id="message"
                        name="message"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values["message"]}
                      ></textarea>
                      <ErrorMessage
                        errors={errors}
                        touched={touched}
                        fieldName={"message"}
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <div className="form-check ct_custom_green_check ct_flex_shrink_0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="accept"
                      name="accept"
                      checked={values.accept}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <label for="">
                    I agree that my submitted data is being collected and
                    stored.
                  </label>
                </div>
                <ErrorMessage
                  errors={errors}
                  touched={touched}
                  fieldName="accept"
                />
                <div className="mt-4 d-flex justify-content-end">
                  <button
                    className="ct_green_btn_help ct_border_radius_100"
                    type="button"
                    onClick={handleSubmit}

                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>

        {/* comment by sakshi */}
        {/* <div className="col-lg-5 mb-4 mb-lg-0">
          <div className="ct_white_bg">
            <h4 className="ct_fs_24 ct_fw_600 mb-2">Find Us?</h4>
            <ul className="ct_call_to_info">
              <li>
                <img  loading="lazy"
                  src="https://app.flexsirent.com/assets/img/address_icon.svg"
                  alt=""
                  className="ct_flex_shrink_0"
                />
                <p className="mb-0">C/ Martínez Campos 5, Malaga, Spain</p>
              </li>
              <li>
                <img  loading="lazy"
                  src="https://app.flexsirent.com/assets/img/contact_icon.svg"
                  alt=""
                  className="ct_flex_shrink_0"
                />
                <p className="mb-0">+34 951 820 015</p>
              </li>
              <li>
                <img  loading="lazy"
                  src="https://app.flexsirent.com/assets/img/mail_icon.svg"
                  alt=""
                  className="ct_flex_shrink_0"
                />
                <p className="mb-0">support@flexsirent.com</p>
              </li>
            </ul>
          </div>
        </div> */}
        {/* end */}
      </div>
    </div>
  );
};

export default ContactUs;

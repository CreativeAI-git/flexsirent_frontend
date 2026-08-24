import { Modal } from "antd";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import Loader from "../../../shared/components/loader";
import { inquirySchema } from "../../../shared/utils/schema";
import ErrorMessage from "../../../shared/components/form/ErrorMessage";


const SendInquery = ({
  isViewModal,
  setIsViewModal,
  handleSubmit = () => { },
}) => {
  const { inquiryLoading } = useSelector((state) => state.guest.booking);

  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  if (inquiryLoading) {
    return <Loader />;
  }

  return (
    <Modal
      title={`Send Inquiry`}
      open={isViewModal}
      onCancel={() => {
        setIsViewModal(false);
      }}
      centered={true}
      footer={null}
      width={"800px"}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ backgroundColor: "#fff" }}>
          <div className="modal-body pt-3 pb-3">
            <Formik
              initialValues={initialValues}
              validationSchema={inquirySchema}
              onSubmit={(values, actions) => {
                handleSubmit(values, () => {
                  actions.resetForm();
                });
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
                <form className="" onSubmit={handleSubmit}>
                  <div className="form-group mb-2">
                    <label className="mb-2 ct_fw_600">Name</label>
                    <input
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      className="form-control ct_input h-auto"
                      id="name"
                      name="name"
                      placeholder="Enter name"
                    ></input>
                    <ErrorMessage
                      errors={errors}
                      touched={touched}
                      fieldName={"name"}
                    />
                  </div>

                  <div className="form-group mb-2">
                    <label className="mb-2 ct_fw_600">Email</label>
                    <input
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className="form-control ct_input h-auto"
                      id="email"
                      name="email"
                      placeholder="Enter email"
                    ></input>
                    <ErrorMessage
                      errors={errors}
                      touched={touched}
                      fieldName={"email"}
                    />
                  </div>

                  <div className="form-group">
                    <label className="mb-2 ct_fw_600">Message</label>
                    <textarea
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.message}
                      className="form-control ct_input h-auto"
                      rows="4"
                      id="message"
                      name="message"
                      placeholder="Enter message"
                    ></textarea>
                    <ErrorMessage
                      errors={errors}
                      touched={touched}
                      fieldName={"message"}
                    />
                  </div>
                  <div className="mt-4 text-end">
                    <button
                      className="ct_orange_btn ms-auto"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Send
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SendInquery;

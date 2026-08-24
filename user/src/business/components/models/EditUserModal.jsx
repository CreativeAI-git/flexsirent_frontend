import { Modal } from "antd";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { userAddSchema } from "../../../shared/utils/schema";
import ErrorMessage from "../../../shared/components/form/ErrorMessage";
import {
  fetchUsers,
  updateUser,
} from "../../../redux/features/business/actions/managementAction";

const EditUserModal = ({ data, isModal, setIsModal }) => {
  const dispatch = useDispatch();
  const initialValues = {
    email: data?.email || "",
    first_name: data?.first_name || "",
    last_name: data?.last_name || "",
    number_of_bookings: data?.number_of_bookings || "",
  };
  const handleEditUser = async (values) => {
    const callback = (res) => {
      if (res?.success) {
        dispatch(fetchUsers());
        setIsModal(false);
      }
    };

    dispatch(updateUser({ payload: {
      number_of_bookings : values?.number_of_bookings,
      user_id : data?.id
    }, callback }));
  };
  return (
    <Modal
      title={`Edit User Details`}
      open={isModal}
      onCancel={() => {
        setIsModal(false);
      }}
      centered={true}
      footer={null}
      width={"800px"}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body pt-3 pb-5">
            <Formik
              initialValues={initialValues}
              validationSchema={userAddSchema}
              enableReinitialize
              onSubmit={(values, actions) => {
                handleEditUser(values);
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
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-group">
                        <label for="" className="mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="form-control ct_input ct_input_h_50"
                          placeholder="Enter First Name"
                          id="first_name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.first_name}
                          disabled
                        />
                        <ErrorMessage
                          errors={errors}
                          touched={touched}
                          fieldName="first_name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-group">
                        <label for="" className="mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control ct_input ct_input_h_50"
                          placeholder="Enter Last Name"
                          id="last_name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.last_name}
                          disabled
                        />
                        <ErrorMessage
                          errors={errors}
                          touched={touched}
                          fieldName="last_name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-group">
                        <label for="" className="mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control ct_input ct_input_h_50"
                          placeholder="Enter Email "
                          id="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.email}
                          disabled
                        />
                        <ErrorMessage
                          errors={errors}
                          touched={touched}
                          fieldName="email"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-group">
                        <label for="" className="mb-2">
                          Allowed Booking Count (monthly)
                        </label>
                        <input
                          type="text"
                          className="form-control ct_input ct_input_h_50"
                          placeholder="Enter Allowed Booking Count (monthly)"
                          id="number_of_bookings"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.number_of_bookings}
                        />
                        <ErrorMessage
                          errors={errors}
                          touched={touched}
                          fieldName="number_of_bookings"
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" d-flex align-items-center gap-3 justify-content-end">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModal(false);
                      }}
                      className="ct_outline_btn ct_border_radius_10"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="ct_orange_btn ct_border_radius_10"
                      onClick={handleSubmit}
                    >
                      Submit
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

export default EditUserModal;

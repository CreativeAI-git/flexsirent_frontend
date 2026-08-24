import { Modal } from "antd";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import ErrorMessage from "../form/ErrorMessage";
import { pageRoutes } from "../../routes/PageRoutes";
import { acountAddSchema } from "../../utills/schema";
import { addHost, fetchHosts } from "../../redux/actions/hostAction";
import {
  addBusiness,
  addUser,
  fetchBusiness,
  fetchUsers,
} from "../../redux/actions/userAction";
const AccountActionModal = ({ isViewModal, setIsViewModal, title = "" }) => {
  const initialValues = {
    email: "",
    first_name: "",
    last_name: "",
  };
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const handleAddAcount = async (values) => {
    const callback = (res) => {
      if (res?.success) {
        setIsViewModal(false);
        if (pathname == pageRoutes?.hostManagement) dispatch(fetchHosts());
        if (pathname == pageRoutes?.userManagement) dispatch(fetchUsers());
        if (pathname == pageRoutes?.businessManagement) dispatch(fetchBusiness());
      }
    };

    if (pathname == pageRoutes?.hostManagement)
      dispatch(addHost({ payload: values, callback }));
    if (pathname == pageRoutes?.userManagement)
      dispatch(addUser({ payload: values, callback }));
    if (pathname == pageRoutes?.businessManagement)
      dispatch(addBusiness({ payload: values, callback }));
  };

  return (
    <Modal
      title={title}
      visible={isViewModal}
      onCancel={() => {
        setIsViewModal(false);
      }}
      centered={true}
      footer={null}
      width={"800px"}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content py-4" style={{ backgroundColor: "#fff" }}>
          <Formik
            initialValues={initialValues}
            validationSchema={acountAddSchema}
            enableReinitialize
            onSubmit={(values, actions) => {
              handleAddAcount(values);
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
                <div className="modal-body">
                  <div className="form-group mb-4">
                    <label className="mb-2 ct_fw_600">First Name</label>
                    <input
                      type="text"
                      className="form-control ct_input ct_input_border_1 ct_input_h_50"
                      placeholder="First Name"
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
                  <div className="form-group mb-4">
                    <label className="mb-2 ct_fw_600">Last Name</label>
                    <input
                      type="text"
                      className="form-control ct_input ct_input_border_1 ct_input_h_50"
                      placeholder="Last Name"
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
                  <div className="form-group mb-4">
                    <label className="mb-2 ct_fw_600">Email</label>
                    <input
                      type="email"
                      className="form-control ct_input ct_input_border_1 ct_input_h_50"
                      placeholder="Email"
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
                </div>
                <div className="modal-footer border-0 justify-content-center">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="ct_orange_btn"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Modal>
  );
};

export default AccountActionModal;

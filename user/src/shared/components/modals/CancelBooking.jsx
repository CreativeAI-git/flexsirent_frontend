import { Modal } from "antd";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { rejectReasonSchema } from "../../utils/schema";
import ErrorMessage from "../form/ErrorMessage";
import { canceledBooking } from "../../../redux/features/user/actions/bookingAction";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useLocation } from "react-router";
import { webPath } from "../../../user/routes";
import Loader from "../loader";

const CancelBooking = ({ isModal, setIsModal, booking_id }) => {
  const { subLoading } = useSelector((state) => state?.guest?.booking);
  const dispatch = useDispatch();
  const navigate = useLocalizedNavigate();
  const { pathname } = useLocation();
  const initialState = { cancel_reason: "" };

  const handleAddCategory = (values, resetForm) => {
    const callback = (response) => {
      if (response.success) navigate(-1);
      resetForm();
      setIsModal(false);
    };
    dispatch(
      canceledBooking({
        payload: {
          cancel_reason: values?.cancel_reason?.trim(),
          booking_id,
        },
        callback,
      })
    );
  };

  if (subLoading) {
    return <Loader />;
  }
  return (
    <Modal
      title="Cancellation Reason"
      open={isModal}
      onCancel={() => {
        setIsModal(false);
      }}
      centered={true}
      footer={null}
    >
      {/* <h4 className="mb-4 ct_fw_600 text-center ct_fs_24 mt-4">Rejection Reason</h4> */}
      <Formik
        initialValues={initialState}
        validationSchema={rejectReasonSchema}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          handleAddCategory(values, resetForm);
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
            <div className="form-group">
              <label className="mb-2 ct_fw_400">Reason</label>
              <textarea
                type="text"
                className="form-control ct_input "
                placeholder="Enter reason"
                id="cancel_reason"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.cancel_reason}
              />
              <ErrorMessage
                errors={errors}
                touched={touched}
                fieldName="cancel_reason"
              />
            </div>
            <div className="text-center mt-4">
              <button
                type="submit"
                className="ct_orange_btn w-100"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default CancelBooking;

import { Formik } from "formik";
import { useEffect } from "react";
import Loader from "../../components/form/Loader";
import ErrorMessage from "../../components/form/ErrorMessage";
import SubHeader from "../../shared/layout/SubHeader";
import PanelLayout from "../../shared/layout/PanelLayout";
import { useDispatch, useSelector } from "react-redux";
import { cancellationPolicySettingsSchema } from "../../utills/schema";
import {
  getCancellationPolicySettings,
  updateCancellationPolicySettings,
} from "../../redux/actions/authAction";
import { message } from "antd";
import toast from "react-hot-toast";

const policyRows = [
  {
    key: "thirty_days",
    title: "30 Days Before Check-in",
    helper: "Charge percentage when the guest cancels 30 days before the booking starts.",
  },
  {
    key: "ten_days",
    title: "10 Days Before Check-in",
    helper: "Charge percentage when the guest cancels 10 days before the booking starts.",
  },
  {
    key: "seven_days",
    title: "7 Days Before Check-in",
    helper: "Charge percentage when the guest cancels 7 days before the booking starts.",
  },
  {
    key: "same_day",
    title: "Same Day Cancellation",
    helper: "Charge percentage when the guest cancels on the booking start date.",
  },
];

const CancellationPolicyManagement = () => {
  const dispatch = useDispatch();
  const { isLoading, cancellationPolicySettings } = useSelector(
    (state) => state.authReducers
  );

  useEffect(() => {
    dispatch(getCancellationPolicySettings());
  }, [dispatch]);

  const initialValues = {
    thirty_days: cancellationPolicySettings?.thirty_days?.toString?.() || "",
    ten_days: cancellationPolicySettings?.ten_days?.toString?.() || "",
    seven_days: cancellationPolicySettings?.seven_days?.toString?.() || "",
    same_day: cancellationPolicySettings?.same_day?.toString?.() || "",
  };

  const handleSubmitValues = (values) => {
    const allEmpty = Object.values(values).every(
  (val) => val === "" || val === null || val === undefined
);

if (allEmpty) {
  toast.error("Please fill at least one field");
  return;
}

const isSame = Object.keys(values).every(
    (key) => Number(values[key]) === Number(initialValues[key])
  );

  if (isSame) {
    toast.error("No changes detected");
    return;
  }


    dispatch(
      updateCancellationPolicySettings({
        payload: {
          thirty_days: Number(values.thirty_days),
          ten_days: Number(values.ten_days),
          seven_days: Number(values.seven_days),
          same_day: Number(values.same_day),
        },
        callback: () => {},
      })
    );
  };

  // const isInitialLoading =
  //   isLoading &&
  //   !cancellationPolicySettings?.thirty_days &&
  //   !cancellationPolicySettings?.ten_days &&
  //   !cancellationPolicySettings?.seven_days &&
  //   !cancellationPolicySettings?.same_day;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout>
      <SubHeader label="Cancellation Policy Management" />
      <div className="ct_white_bg">
        <div className="ct_px_30_new ">
          <div className="mb-4">
            <h4 className="ct_fs_20 ct_fw_600 mb-2">Booking Cancellation Charges</h4>
            <p className="mb-0 ct_text_op_7">
              Admin can directly update the cancellation percentage for each booking.
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={cancellationPolicySettingsSchema}
            onSubmit={handleSubmitValues}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {policyRows.map((item) => (
                    <div className="col-lg-6 mb-4" key={item.key}>
                      <div
                        className="form-group  h-100"
                        style={{
                          background: "#FFF9F5",
                          border: "1px solid #F2D3BF",
                          borderRadius: "16px",
                          padding: "18px",
                        }}
                      >
                        <label className="ct_fw_600 mb-2 d-block">{item.title}</label>
                        <p className="ct_text_op_7 mb-3">{item.helper}</p>
                        <div className="position-relative">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            onWheel={(e) => e.target.blur()}
                            className="form-control ct_input ct_border_op_10 pe-5"
                            placeholder="Enter percentage"
                            name={item.key}
                            value={values[item.key]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <span
                            className="ct_fw_600"
                            style={{
                              position: "absolute",
                              top: "50%",
                              right: "18px",
                              transform: "translateY(-50%)",
                            }}
                          >
                            %
                          </span>
                        </div>
                        <ErrorMessage
                          errors={errors}
                          touched={touched}
                          fieldName={item.key}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="ct_orange_btn ct_border_radius_10 ct_h_40 ms-auto"
                >
                  Update
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </PanelLayout>
  );
};

export default CancellationPolicyManagement;

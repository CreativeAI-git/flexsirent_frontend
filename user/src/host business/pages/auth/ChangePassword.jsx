import { Formik } from "formik";
import { useState } from "react";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { hostBusinessPaths } from "../../routes";
import Eye from "../../../shared/components/form/Eye";
import Loader from "../../../shared/components/loader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../../shared/layout/PanelLayout";
import { changePasswordSchema } from "../../../shared/utils/schema";
import ErrorMessage from "../../../shared/components/form/ErrorMessage";
import { changeHostPassword } from "../../../redux/features/host/actions/authAction";

const ChangePassword = () => {
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const [isEye, setIsEye] = useState(false);
  const [isEye1, setIsEye1] = useState(false);
  const [isEye2, setIsEye2] = useState(false);
  const user = { name: "Change Password", role: "hostBusiness" };
  const { isLoading } = useSelector((state) => state.host.auth);

  const initialValues = {
    new_password: "",
    current_password: "",
    confirm_password: "",
  };

  const handleChangePassword = (values) => {
    const callback = (response) => {
      if (response.success) {
        navigate(hostBusinessPaths?.MyProfile);
      }
    };
    const data = {
      new_password: values?.new_password,
      current_password: values?.current_password,
    };
    dispatch(changeHostPassword({ payload: data, callback }));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout user={user}>
      <div className="row">
        <Formik
          initialValues={initialValues}
          validationSchema={changePasswordSchema}
          onSubmit={(values, actions) => {
            handleChangePassword(values);
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
            <form className="">
              <div className="ct_light_blue_outline ct_p_30 shadow-none h-auto">
                <div className="">
                  <form className="">
                    <div className=" row">
                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label className="ct_fw_500 mb-2">
                            Current Password
                          </label>
                          <div className="position-relative">
                            <input
                              placeholder="Current password"
                              className="form-control ct_input"
                              type={isEye ? "text" : "password"}
                              id="current_password"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values?.current_password}
                            />
                            <Eye isEye={isEye} onClick={setIsEye} />
                          </div>
                          <ErrorMessage
                            errors={errors}
                            touched={touched}
                            fieldName="current_password"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label className="ct_fw_500 mb-2">
                            {" "}
                            New Password
                          </label>
                          <div className="position-relative">
                            <input
                              placeholder="New password"
                              className="form-control ct_input"
                              type={isEye1 ? "text" : "password"}
                              id="new_password"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values?.new_password}
                            />
                            <Eye isEye={isEye1} onClick={setIsEye1} />
                          </div>
                          <ErrorMessage
                            errors={errors}
                            touched={touched}
                            fieldName="new_password"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-4">
                          <label className="ct_fw_500 mb-2">
                            Confirm Password
                          </label>
                          <div className="position-relative">
                            <input
                              placeholder="Confirm password"
                              className="form-control ct_input"
                              type={isEye2 ? "text" : "password"}
                              id="confirm_password"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values?.confirm_password}
                            />
                            <Eye isEye={isEye2} onClick={setIsEye2} />
                          </div>
                          <ErrorMessage
                            errors={errors}
                            touched={touched}
                            fieldName="confirm_password"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="ct_dark_blue_btn ms-auto ct_border_radius_10 ct_h_40"
                      >
                        Change Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </PanelLayout>
  );
};

export default ChangePassword;

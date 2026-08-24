import { Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { webPath } from "../../routes";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import Eye from "../../../shared/components/form/Eye";
import Loader from "../../../shared/components/loader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../../shared/layout/PanelLayout";
import { getChangePasswordSchema } from "../../../shared/utils/schema";
import ErrorMessage from "../../../shared/components/form/ErrorMessage";
import { changeUserPassword } from "../../../redux/features/user/actions/authAction";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useLocalizedNavigate();
  const [isEye, setIsEye] = useState(false);
  const [isEye1, setIsEye1] = useState(false);
  const [isEye2, setIsEye2] = useState(false);
  const { t } = useTranslation();

  const user = { name: t("profile.changePassword"), role: "guest" };
  const { isLoading } = useSelector((state) => state.guest.auth);


  const initialValues = {
    new_password: "",
    current_password: "",
    confirm_password: "",
  };

  const handleChangePassword = (values) => {
    const callback = (response) => {
      if (response.success) {
        navigate(webPath?.MyProfile);
      }
    };
    const data = {
      current_password: values?.current_password,
      new_password: values?.new_password,
    };
    dispatch(changeUserPassword({ payload: data, callback }));
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout user={user}>
      <div className="row">
        <Formik
          initialValues={initialValues}
          validationSchema={getChangePasswordSchema(t)}
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
              <div className=" row">
                <div className="col-md-12">
                  <div className="form-group mb-4">
                    <label for="" className="ct_fw_500 mb-2">
                      {t("profile.currentPassword")}
                    </label>
                    <div className="position-relative">
                      <input
                        placeholder={t("profile.enterCurrentPassword")}
                        className="form-control ct_input pe-5"
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
                    <label for="" className="ct_fw_500 mb-2">
                      {" "}
                      {t("profile.newPassword")}
                    </label>
                    <div className="position-relative">
                      <input
                        placeholder={t("profile.enterNewPassword")}
                        className="form-control ct_input pe-5"
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
                    <label for="" className="ct_fw_500 mb-2">
                      {t("profile.confirmPassword")}
                    </label>
                    <div className="position-relative">
                      <input
                        placeholder={t("profile.enterConfirmPassword")}
                        className="form-control ct_input pe-5"
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
                  className="ct_dark_blue_btn ms-auto ct_border_radius_10 ct_h_40"
                  onClick={handleSubmit}
                >
                  {t("profile.changePassword")}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </PanelLayout>
  );
};

export default ChangePassword;

import { Formik } from "formik";
import { useEffect } from "react";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader";
import PanelLayout from "../../layout/PanelLayout";
import { addSubHostSchema } from "../../utils/schema";
import ErrorMessage from "../../components/form/ErrorMessage";
import {
  createSubHost,
  fetchHostPermissions,
  updateSubHost,
} from "../../../redux/features/host/actions/authAction";

import PhoneInput from "react-phone-number-input";

const SubHostFormPage = ({ mode = "add", panelRole, routes }) => {
  const isEdit = mode === "edit";
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const data = useLocation()?.state?.data || {};
  const user = {
    name: isEdit ? "Edit Sub Host Details" : "Add Sub Host",
    role: panelRole,
  };
  const { isLoading, permissionList } = useSelector((state) => state.host.auth);
  const filteredPermissionList = (permissionList || []).filter(
    (perm) => perm.title !== "Dashboard"
  );
  const initialValues = {
    first_name: data?.first_name || "",
    host_id: data?.host_id || "",
    last_name: data?.last_name || "",
    email: data?.email || "",
    mobile: data?.phone || "",
    permission:
      data?.permission
        ?.filter((item) => item?.type !== 1)
        .map((item) => item?.type) || [],
  };

  useEffect(() => {
    dispatch(fetchHostPermissions());
  }, [dispatch]);

  const handleSubmitForm = (values) => {
    const callback = (res) => {
      if (res?.success) {
        navigate(routes.SubHostManagement);
      }
    };

    const payload = {
      ...values,
      permission: [...values?.permission, 1],
    };

    if (isEdit) {
      dispatch(updateSubHost({ payload, callback }));
      return;
    }

    dispatch(createSubHost({ payload, callback }));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout user={user}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={addSubHostSchema}
        onSubmit={(values) => {
          handleSubmitForm(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          setFieldTouched,
        }) => {
          const togglePermission = (type) => {
            if (values.permission.includes(type)) {
              setFieldValue(
                "permission",
                values.permission.filter((item) => item !== type)
              );
              return;
            }

            setFieldValue("permission", [...values.permission, type]);
          };

          const toggleAll = (checked) => {
            if (checked) {
              setFieldValue(
                "permission",
                filteredPermissionList.map((item) => item.type)
              );
              return;
            }

            setFieldValue("permission", []);
          };

          const isAllSelected =
            values.permission.length === filteredPermissionList.length;

          return (
            <form onSubmit={handleSubmit}>
              <div className="ct_light_blue_outline py-4">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label className="mb-2 ct_fw_500">First Name</label>
                      <input
                        type="text"
                        className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
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
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label className="mb-2 ct_fw_500">Last Name</label>
                      <input
                        type="text"
                        className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
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
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label className="mb-2 ct_fw_500">Email</label>
                      <input
                        type="email"
                        readOnly={isEdit}
                        className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
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
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label className="mb-2 ct_fw_500">Phone Number</label>
                      <PhoneInput
                        international
                        defaultCountry="ES"
                        className="ct_phone_input"
                        placeholder="Phone Number"
                        value={values?.mobile ? String(values.mobile) : ""}
                        onChange={(val) => {
                          setFieldTouched("mobile", true);
                          setFieldValue("mobile", val || "", true);
                        }}
                      />
                      <ErrorMessage
                        errors={errors}
                        touched={touched}
                        fieldName="mobile"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-2">
                      <label className="mb-2 ct_fw_500">Permissions</label>
                      <div className="d-flex align-items-center ">
                        <label className="ct_checkbox-container">
                          <input
                            className="ct_custom-checkbox"
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={(e) => toggleAll(e.target.checked)}
                          />
                          <span className="ct_checkmark"></span>
                        </label>
                        <p className="mb-0 ct_line_h_27">
                          {isEdit ? "All Modules" : "All"}
                        </p>
                      </div>
                    </div>

                    {filteredPermissionList?.map((perm) => (
                      <div
                        key={perm.type}
                        className="d-flex align-items-center mb-2"
                      >
                        <label className="ct_checkbox-container">
                          <input
                            type="checkbox"
                            className="ct_custom-checkbox"
                            checked={values.permission.includes(perm.type)}
                            onChange={() => togglePermission(perm.type)}
                          />
                          <span className="ct_checkmark"></span>
                        </label>
                        <p className="mb-0 ct_line_h_27">{perm.title}</p>
                      </div>
                    ))}

                    <ErrorMessage
                      errors={errors}
                      touched={touched}
                      fieldName="permission"
                    />
                  </div>
                  <div className="mt-4">
                    <button className="ct_orange_btn ms-auto" type="submit">
                      {isEdit ? "Update" : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </PanelLayout>
  );
};

export default SubHostFormPage;

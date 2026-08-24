import { Formik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Loader from "../../components/form/Loader";
import { pageRoutes } from "../../routes/PageRoutes";
import SubHeader from "../../shared/layout/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import { addSubAdminSchema } from "../../utills/schema";
import PanelLayout from "../../shared/layout/PanelLayout";
import ErrorMessage from "../../components/form/ErrorMessage";
import {
  createSubAdmin,
  fetchSubAdminPermissions,
} from "../../redux/actions/subAdminAction";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const AddSubAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, permissionList } = useSelector(
    (state) => state.subAdminReducers,
  );
  const initialValues = {
    full_name: "",
    email: "",
    mobile: "",
    permission: [],
  };

  useEffect(() => {
    dispatch(fetchSubAdminPermissions());
  }, []);

  const handleAddSubAdmin = (values) => {
    const callback = (res) => {
      if (res?.success) {
        navigate(pageRoutes?.subAdmin);
      }
    };

    dispatch(createSubAdmin({ payload: values, callback }));
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout>
      <SubHeader label="Add Sub Admin" />
      <div class="ct_white_bg h-auto">
        <div class="ct_px_30_new pt-4">
          <Formik
            initialValues={initialValues}
            validationSchema={addSubAdminSchema}
            onSubmit={(values, actions) => {
              handleAddSubAdmin(values);
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
              setFieldTouched,
              
            }) => {
              const togglePermission = (type) => {
                if (values.permission.includes(type)) {
                  setFieldValue(
                    "permission",
                    values.permission.filter((t) => t !== type),
                  );
                } else {
                  setFieldValue("permission", [...values.permission, type]);
                }
              };

              const toggleAll = (checked) => {
                if (checked) {
                  setFieldValue(
                    "permission",
                    permissionList.map((p) => p.permission_id),
                  );
                } else {
                  setFieldValue("permission", []);
                }
              };

              const isAllSelected =
                values?.permission?.length === permissionList?.length;

              return (
                <form>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group mb-4">
                        <label for="" class="ct_fw_600 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          class="form-control ct_input ct_border_op_10"
                          placeholder="Full Name"
                          id="full_name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values?.full_name}
                        />
                        <ErrorMessage
                          errors={errors}
                          touched={touched}
                          fieldName="full_name"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group mb-4">
                        <label for="" class="ct_fw_600 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          class="form-control ct_input ct_border_op_10"
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
                    <div class="col-md-6">
                      <div class="form-group mb-4 ">
                        <label for="" class="ct_fw_600 mb-2">
                          Mobile Number
                        </label>
                        

                        <PhoneInput
                          international
                          defaultCountry="ES"     
                          class="form-control ct_input ct_border_op_10"
                          placeholder="Mobile Number"
                          value={values.mobile}
                          onChange={(val) => {
                            setFieldTouched("mobile", true);
                            setFieldValue("mobile", val, true);
                          }}
                        />
                        <ErrorMessage
                          errors={errors}
                          touched={touched}
                          fieldName="mobile"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group mb-2">
                      <label for="" class="mb-2 ct_fw_500">
                        Permissions
                      </label>
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
                        <p className="mb-0 ct_line_h_27">All</p>
                      </div>
                    </div>

                    {/* Individual permissions */}
                    <div className="ct_para_scroll ct_custom_scroll">
                      {permissionList?.map((perm) => (
                        <div
                          key={perm.type}
                          className="d-flex align-items-center  mb-2"
                        >
                          <label className="ct_checkbox-container">
                            <input
                              type="checkbox"
                              className="ct_custom-checkbox"
                              checked={values?.permission?.includes(
                                perm.permission_id,
                              )}
                              onChange={() =>
                                togglePermission(perm.permission_id)
                              }
                            />
                            <span className="ct_checkmark"></span>
                          </label>
                          <p className="mb-0 ct_line_h_27">{perm.title}</p>
                        </div>
                      ))}
                    </div>

                    <ErrorMessage
                      errors={errors}
                      touched={touched}
                      fieldName="permission"
                    />
                  </div>
                  <div class="mt-4">
                    <button
                      class="ct_orange_btn ms-auto"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </PanelLayout>
  );
};

export default AddSubAdmin;

import { Formik } from "formik";
import { useState } from "react";
import { hostBusinessPaths } from "../../routes";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../shared/components/loader";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useLocation } from "react-router";
import PanelLayout from "../../../shared/layout/PanelLayout";
import ErrorMessage from "../../../shared/components/form/ErrorMessage";
import { updateHostBusinessProfileSchema } from "../../../shared/utils/schema";
import { updateHostProfileData } from "../../../redux/features/host/actions/authAction";
import ImageWithPreview from "../../../shared/components/image preview/imageWithPreview";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

const EditProfile = () => {
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [userImage, setUserImage] = useState();
  const user = { name: "Edit Profile", role: "hostBusiness" };
  const { isLoading } = useSelector((state) => state.host.auth);

  const initialValues = {
    first_name: state?.data?.first_name ?? "",
    last_name: state?.data?.last_name ?? "",

    email: state?.data?.email ?? "",
    phone: state?.data?.phone ?? "",
  };

  const handleEditMyProfile = (values) => {
    const callback = (response) => {
      if (response.success) {
        navigate(hostBusinessPaths?.MyProfile);
      }
    };
    const formdata = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formdata.append(
        key,
        typeof value === "string" ? value.trim() : (value ?? ""),
      );
    });
    if (userImage) {
      formdata.append("file", userImage ?? "");
    }
    dispatch(updateHostProfileData({ payload: formdata, callback }));
  };

  const handleImageChange = (event) => {
    setUserImage(event?.target?.files[0]);
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout user={user}>
      <div className="row">
        <div className="col-md-12">
          <Formik
            initialValues={initialValues}
            validationSchema={updateHostBusinessProfileSchema}
            onSubmit={(values, actions) => {
              handleEditMyProfile(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldTouched,
              setFieldValue,
            }) => (
              <form className="">
                <div className="ct_light_blue_outline h-auto p-4 mb-4 shadow-none">
                  <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767">
                    <div className="d-flex align-items-center gap-4">
                      <div className="ct_upload_user_profile_img">
                        <ImageWithPreview
                          image={
                            userImage
                              ? URL.createObjectURL(userImage)
                              : state?.data?.profile_image
                                ? state?.data?.profile_image
                                : "https://app.flexsirent.com/user_profile.png"
                          }
                        />
                      </div>
                      <div>
                        <h4 className="ct_fs_18 ct_fw_700 mb-1">
                          {" "}
                          {state?.data?.first_name ?? ""}
                        </h4>
                        <p className="mb-0 ct_text_op_05 ct_fs_14">Host Business</p>
                      </div>
                    </div>
                    <label for="ct_profile_upload" className="ct_w_100_575">
                      <input
                        type="file"
                        className="d-none"
                        accept="image/*"
                        id="ct_profile_upload"
                        onChange={handleImageChange}
                      />
                      <p className="mb-0 ct_outline_btn ct_dark_blue_outline_btn ct_outline_btn_svg gap-2 ct_w_100_575 ">
                        Change photo
                        <svg
                          width="19"
                          height="16"
                          viewBox="0 0 19 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.33089 0.380842C6.45011 0.176459 6.66892 0.0507812 6.90554 0.0507812H12.0947C12.3313 0.0507812 12.5501 0.176459 12.6693 0.380842L13.8738 2.44576H15.4875C16.9572 2.44576 18.1486 3.63717 18.1486 5.10685V13.2897C18.1486 14.7594 16.9572 15.9508 15.4875 15.9508H3.51265C2.04297 15.9508 0.851562 14.7594 0.851562 13.2897V5.10685C0.851562 3.63717 2.04297 2.44576 3.51265 2.44576H5.12635L6.33089 0.380842ZM7.28765 1.38133L6.08311 3.44624C5.96389 3.65063 5.74508 3.7763 5.50847 3.7763H3.51265C2.77781 3.7763 2.18211 4.37201 2.18211 5.10685V13.2897C2.18211 14.0245 2.77781 14.6202 3.51265 14.6202H15.4875C16.2224 14.6202 16.8181 14.0245 16.8181 13.2897V5.10685C16.8181 4.37201 16.2224 3.7763 15.4875 3.7763H13.4917C13.2551 3.7763 13.0363 3.65063 12.9171 3.44624L11.7125 1.38133H7.28765ZM9.5001 6.37086C8.21413 6.37086 7.17165 7.41335 7.17165 8.69932C7.17165 9.98528 8.21413 11.0278 9.5001 11.0278C10.7861 11.0278 11.8285 9.98528 11.8285 8.69932C11.8285 7.41335 10.7861 6.37086 9.5001 6.37086ZM5.8411 8.69932C5.8411 6.67851 7.47929 5.04032 9.5001 5.04032C11.5209 5.04032 13.1591 6.67851 13.1591 8.69932C13.1591 10.7201 11.5209 12.3583 9.5001 12.3583C7.47929 12.3583 5.8411 10.7201 5.8411 8.69932Z"
                            fill="#4B5563"
                          />
                        </svg>
                      </p>
                    </label>
                  </div>
                </div>
                <div className="ct_light_blue_outline ct_p_30 shadow-none h-auto">
                  <div className="">
                    <h4 className="ct_fs_22 ct_fw_600 mb-4">Edit Profile</h4>
                    <div className=" row">
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label for="" className="ct_fw_500 mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            className="form-control ct_input ct_input_h_50"
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
                          <label for="" className="ct_fw_500 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="form-control ct_input ct_input_h_50"
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
                          <label for="" className="ct_fw_500 mb-2 ">
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control ct_input ct_input_h_50 "
                            placeholder="Email "
                            value={values?.email}
                            readOnly
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
                          <label for="" className="ct_fw_500 mb-2 ">
                            Phone Number
                          </label>

                          <PhoneInput
                            flags={flags}
                            international
                            defaultCountry="ES"
                            className="ct_phone_input"
                            placeholder="Phone Number"
                            value={values.phone}
                            onChange={(val) => {
                              setFieldTouched("phone", true);
                              setFieldValue("phone", val || "", true);
                            }}
                          />
                          <ErrorMessage
                            errors={errors}
                            touched={touched}
                            fieldName="phone"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="ct_dark_blue_btn ms-auto ct_border_radius_10 ct_h_40"
                  >
                    Update
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </PanelLayout>
  );
};

export default EditProfile;

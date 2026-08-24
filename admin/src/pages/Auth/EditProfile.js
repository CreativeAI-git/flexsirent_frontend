import { Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { pageRoutes } from "../../routes/PageRoutes";
import SubHeader from "../../shared/layout/SubHeader";
import { useLocation, useNavigate } from "react-router";
import PanelLayout from "../../shared/layout/PanelLayout";
import { updateProfileSchema } from "../../utills/schema";
import ErrorMessage from "../../components/form/ErrorMessage";
import { updateAdminProfile } from "../../redux/actions/authAction";
import ImageWithPreview from "../../components/image preview/imageWithPreview";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [userImage, setUserImage] = useState();

  const initialValues = {
    full_name: state?.data?.full_name ?? "",
    email: state?.data?.email ?? "",
  };

  const handleEditMyProfile = (values) => {
    const callback = (response) => {
      if (response.success) {
        navigate(pageRoutes.myProfile);
      }
    };
    const formdata = new FormData();
    formdata.append(
      "full_name",
      typeof values?.full_name === "string"
        ? values?.full_name?.trim()
        : values?.full_name ?? ""
    );
    // formdata.append("email", values?.email ?? "");
    if (userImage) {
      formdata.append("file", userImage ?? "");
    }
    dispatch(updateAdminProfile({ payload: formdata, callback }));
  };

  const handleImageChange = (event) => {
    setUserImage(event?.target?.files[0]);
  };

  return (
    <PanelLayout>
      <div className="row">
        <div className="col-md-12">
          <SubHeader label="Edit Profile" />
          <div className="ct_white_bg">
            <div className="ct_px_30_new pt-4">
              <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767">
                <div className="d-flex align-items-center gap-4 mx-auto">
                  <div className="ct_upload_user_profile_img">
                    <ImageWithPreview
                      image={
                        userImage
                          ? URL.createObjectURL(userImage)
                          : state?.data?.profile_image
                          ? state?.data?.profile_image
                          : "user_profile.png"
                      }
                    />
                    <label
                      for="ct_upload_user_profile2"
                      className="position-relative d-block"
                    >
                      <input
                        type="file"
                        className="d-none"
                        accept="image/*"
                        id="ct_upload_user_profile2"
                        onChange={handleImageChange}
                      />
                      <div className="ct_authore_banner_upload_icon_12">
                        <i className="fa-solid fa-pencil"></i>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={updateProfileSchema}
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
                  setFieldValue,
                }) => (
                  <form className="mt-5">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label className="ct_fw_600 mb-2">Full Name</label>
                          <input
                            type="text"
                            className="form-control ct_input ct_border_op_10"
                            placeholder="Full Name"
                            id="full_name"
                            value={values?.full_name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            errors={errors}
                            touched={touched}
                            fieldName="full_name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label className="ct_fw_600 mb-2">Email</label>
                          <input
                            type="email"
                            className="form-control ct_input ct_border_op_10"
                            disabled
                            readOnly
                            placeholder="Email"
                            value={values?.email}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ct_orange_btn ct_border_radius_10 ct_h_40 ms-auto"
                      onClick={handleSubmit}
                    >
                      Save Changes
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
};

export default EditProfile;

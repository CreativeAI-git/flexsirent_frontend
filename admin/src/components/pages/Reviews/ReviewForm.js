import { Formik } from "formik";
import { useState } from "react";
import Loader from "../../form/Loader";
import React, { useEffect } from "react";
import ErrorMessage from "../../form/ErrorMessage";
import { Rating } from "react-simple-star-rating";
import { useDispatch, useSelector } from "react-redux";
import { addRatingSchema } from "../../../utills/schema";
import ImageWithPreview from "../../image preview/imageWithPreview";
import { fetchPropertyForReview } from "../../../redux/actions/serviceFeeAction";
const ReviewForm = ({ initialValues, onSubmit, isEdit = false }) => {
  const dispatch = useDispatch();
  const [userImage, setUserImage] = useState();

  const { isLoading, propertyOptions } = useSelector(
    (state) => state?.serviceFeeReducers,
  );

  const handleImageChange = (event) => {
    setUserImage(event?.target?.files[0]);
  };

  if (isLoading) return <Loader />;
  return (
    <div class="row">
      <div class="col-md-12">
        <div class="">
          <div class="ct_px_30_new pt-4">
            <Formik
              initialValues={initialValues}
              validationSchema={addRatingSchema}
              enableReinitialize
              onSubmit={onSubmit}
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
                <form
                  onSubmit={handleSubmit}
                  className="ct_border_grey border ct_border_radius_10 ct_shadow_custom p-4"
                >
                  <div class="row">
                    <div className="text-center mb-4">
                      <div className="d-flex align-items-center gap-4 mx-auto justify-content-center">
                        <div className="ct_upload_user_profile_img ">
                          <ImageWithPreview
                            image={
                              values?.file
                                ? URL.createObjectURL(values.file)
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
                              onChange={(event) => {
                                setFieldValue(
                                  "file",
                                  event.currentTarget.files[0],
                                );
                              }}
                            />
                            <div className="ct_authore_banner_upload_icon_12">
                              <i className="fa-solid fa-pencil"></i>
                            </div>
                          </label>
                        </div>
                      </div>
                      <ErrorMessage
                        errors={errors}
                        touched={touched}
                        fieldName={"file"}
                      />
                    </div>
                    <div class="col-md-6">
                      <div class="form-group mb-4">
                        <label for="" class="ct_fw_600 mb-2">
                          User's First Name
                        </label>
                        <input
                          type="text"
                          class="form-control ct_input ct_border_op_10"
                          placeholder="Enter user's first name"
                          name="first_name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values["first_name"]}
                        />
                        <ErrorMessage
                          errors={errors}
                          touched={touched}
                          fieldName={"first_name"}
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group mb-4">
                        <label for="" class="ct_fw_600 mb-2">
                          User's Last Name
                        </label>
                        <input
                          type="text"
                          class="form-control ct_input ct_border_op_10"
                          placeholder="Enter user's last name"
                          name="last_name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values["last_name"]}
                        />
                        <ErrorMessage
                          errors={errors}
                          touched={touched}
                          fieldName={"last_name"}
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group mb-4">
                        <label for="" class="ct_fw_600 mb-2">
                          Property Name
                        </label>
                        <select
                          name="property_id"
                          className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_border_radius_10"
                          value={values.property_id}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="">Select Property</option>
                          {propertyOptions?.map((obj) => (
                            <option
                              key={obj.property_id}
                              value={obj.property_id}
                            >
                              {obj.property_title}
                            </option>
                          ))}
                        </select>
                        <ErrorMessage
                          errors={errors}
                          touched={touched}
                          fieldName={"property_id"}
                        />
                      </div>
                    </div>

                    <div class="col-md-6 mb-4">
                      <div class="form-group ">
                        <label for="" class="ct_fw_600 mb-2 d-block">
                          Rating
                        </label>

                        <Rating
                          initialValue={values.rating}
                          allowFraction
                          onClick={(rate) => {
                            handleChange({
                              target: { name: "rating", value: rate },
                            });
                          }}
                          onBlur={handleBlur}
                          name="rating"
                        />
                      </div>
                      <ErrorMessage
                        errors={errors}
                        touched={touched}
                        fieldName={"rating"}
                      />
                    </div>

                    <div class="col-md-12">
                      <div class="form-group mb-4">
                        <label for="" class="ct_fw_600 mb-2">
                          Review
                        </label>
                        <textarea
                          class="form-control ct_input ct_border_op_10 h-auto"
                          rows="7"
                          placeholder="Tell Us What You Liked...Or Didn’t"
                          name="review"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values["review"]}
                        ></textarea>
                        <ErrorMessage
                          errors={errors}
                          touched={touched}
                          fieldName={"review"}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-center gap-3 justify-content-end ct_flex_col_575">
                    <button
                      type="submit"
                      class="ct_orange_btn px-5 ct_w_100_575"
                    >
                      {isEdit ? "Update" : "Save"}
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;

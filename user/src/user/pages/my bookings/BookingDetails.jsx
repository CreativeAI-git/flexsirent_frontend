import { Formik } from "formik";
import { useEffect, useState } from "react";
import { webPath } from "../../routes";
import { Rating } from "react-simple-star-rating";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../shared/components/loader";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useLocation } from "react-router";
import PanelLayout from "../../../shared/layout/PanelLayout";
import { addRatingSchema } from "../../../shared/utils/schema";
import SendReportModal from "../../components/modals/SendReportModal";
import ErrorMessage from "../../../shared/components/form/ErrorMessage";
import CancelBooking from "../../../shared/components/modals/CancelBooking";
import PropertyDetailsCard from "../../../shared/components/cards/PropertyDetailsCard";
import ImageWithPreview from "../../../shared/components/image preview/imageWithPreview";
import {
  addRating,
  reportTheProperty,
  fetchSingleBooking,
  uploadBookingDocuments,
} from "../../../redux/features/user/actions/bookingAction";
import {
  curSym,
  getProfile,
  pipViewDate,
  pipViewMonthYear,
} from "../../../shared/utils/pip";
import { useTranslation } from "react-i18next";

const BookingDetails = () => {
  const dispatch = useDispatch();
  const navigate = useLocalizedNavigate();
  const { t } = useTranslation();
  const profile = getProfile("guest");
  const [isModal, setIsModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const { reportLoading, bookingDetails, isLoading, uploadLoading } = useSelector((state) => state.guest.booking);
  const data = useLocation()?.state?.data || {};

  const currentBooking = (bookingDetails?.booking_id == data?.booking_id) ? bookingDetails : data;

  useEffect(() => {
    if (data?.booking_id) {
      dispatch(fetchSingleBooking({ payload: data?.booking_id }));
    }
  }, [data?.booking_id]);

  const handleUploadDocs = () => {
    if (selectedFiles.length === 0) return;

    const formdata = new FormData();
    selectedFiles.forEach((file) => {
      formdata.append("file", file);
    });

    const callback = (res) => {
      if (res?.success) {
        setSelectedFiles([]);
        dispatch(fetchSingleBooking({ payload: data?.booking_id }));
      }
    };

    dispatch(
      uploadBookingDocuments({
        booking_id: data?.booking_id,
        payload: formdata,
        callback,
      })
    );
  };

  const user = { name: t("sidebar.bookings"), role: "guest" };
  const [isViewModal, setIsViewModal] = useState(false);
  const userReview =
    currentBooking?.reviews?.find((item) => item?.user_id == profile?.id) || {};
  const initialValues = {
    rating: userReview?.rating || "",
    review: userReview?.review || "",
  };
  const handleAddRating = (values) => {
    const callback = (res) => {
      if (res?.success) {
        navigate(-1);
      }
    };

    dispatch(
      addRating({
        payload: { booking_id: currentBooking?.booking_id, ...values },
        callback,
      }),
    );
  };
  const handleSendReport = (values, resetFields) => {
    const callback = (res) => {
      if (res?.success) {
        setIsViewModal(false);
        resetFields();
      }
    };

    dispatch(
      reportTheProperty({
        payload: { property_id: currentBooking?.property_id, ...values },
        callback,
      }),
    );
  };

  if (isLoading || reportLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout user={user}>
      <div className="col-md-12">
        {currentBooking?.is_canceled == "No" &&
          currentBooking?.booking_status != 2 &&
          currentBooking?.booked_to &&
          new Date(currentBooking.booked_to) > new Date() && (
            <div className="mb-4 text-end">
              <a
                onClick={() => {
                  setIsModal(true);
                }}
                className="ct_border_radius_10 ct_h_40 ct_orange_btn ct_fit_content ms-auto  ct_fw_600 text-center"
              >
                {t("form.cancel_booking")}
              </a>
            </div>
          )}

        {(currentBooking?.cancel_reason || currentBooking?.cancellation_reason || currentBooking?.rejection_reason) &&
          <div className="mb-3 cancellatin-box d-flex align-items- gap-3">
            <div>
              <i className="fa-solid fa-circle-xmark fs-3 text-danger mt-2"></i>
            </div>
            <div>
              <h5 className="ct_fs_18 ct_fw_700 mb-0">{t("table.cancellation_reason")}</h5>
              <p className="mb-0">{currentBooking?.cancel_reason || currentBooking?.cancellation_reason || currentBooking?.rejection_reason || "#N/A"}</p>
            </div>
          </div>
        }

        <CancelBooking
          isModal={isModal}
          setIsModal={setIsModal}
          booking_id={currentBooking?.booking_id}
        />
        <div className="ct_dash_light_blue_bg ct_py_24_px_48  pe-0 ">
          <div className="d-flex align-items-center justify-content-between mb-4 ct_pe_40 ct_flex_col_575">
            <h4 className="ct_fs_20 ct_fw_600 ">{t("table.host_information")}</h4>

            <div className="d-flex gap-3 align-items-center">
              <div className="">
                <button
                  className="ct_orange_btn"
                  type="button"
                  onClick={() => {
                    setIsViewModal(true);
                  }}
                >
                  {t("form.report")}
                </button>
              </div>
              <p className=" mb-0 ct_checking_badge">
                {currentBooking?.host_owner_type == 1
                  ? t("table.individual_owner")
                  : t("table.property_manager") || "#N/A"}
              </p>
            </div>
          </div>

          <div className="d-flex align-items-center  gap-3 ct_pe_40">
            <div className="ct_upload_user_profile_img">
              <ImageWithPreview
                image={
                  currentBooking?.host_image || "https://app.flexsirent.com/user_profile.png"
                }
              />
            </div>
            <div className="d-flex align-items-center justify-content-between ct_flex_1 ct_flex_col_575 gap-2">
              <div>
                <h4 className="ct_fs_18 ct_fw_700 mb-1">{`${currentBooking?.host_first_name} ${currentBooking?.host_last_name}`}</h4>
                <p className="mb-0 ct_text_op_05 ct_fs_14">
                  {currentBooking?.host_email || "#N/A"}
                </p>
              </div>
              <div className="">
                <p className="ct_text_clr_4B5563 mb-1">{t("table.member_since")}</p>
                <p className="ct_text_clr_4B5563 mb-0">
                  {pipViewMonthYear(currentBooking?.host_created_at)}
                </p>
              </div>
            </div>
          </div>
          <div className="ct_mt_40">
            <h4 className="ct_fs_20 ct_fw_600 mb-3">{t("table.about")}</h4>
            <p className="mb-0 ct_para_scroll ct_custom_scroll ct_pe_40">
              {currentBooking?.host_about || "#N/A"}
            </p>
          </div>
        </div>
        <PropertyDetailsCard
          data={currentBooking}
          navigateURL={webPath.PropertyData}
        />

        {currentBooking?.doc_status === "REQUESTED" && (
          <div className="ct_dash_light_blue_bg ct_py_24_px_48 ct_mt_40">
            <h4 className="ct_fs_20 ct_fw_600 mb-3">Host Requested Documents</h4>
            <p className="ct_text_clr_4B5563 mb-4">
              The host has requested the following documents: <strong>{currentBooking?.requested_doc}</strong>
            </p>

            <div className="form-group mb-4">
              <label className="mb-2 ct_fw_600">Select Files to Upload</label>
              <input
                type="file"
                multiple
                accept="image/*,application/pdf"
                className="form-control ct_input "
                onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
              />
            </div>

            {selectedFiles.length > 0 && (
              <div className="mb-4">
                <h6 className="ct_fs_14 ct_fw_600 mb-2">Selected Files:</h6>
                <ul className="list-group">
                  {selectedFiles.map((file, idx) => (
                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center" style={{ background: "#fff", border: "1px solid #e5e7eb" }}>
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="button"
              className="ct_orange_btn"
              disabled={selectedFiles.length === 0 || uploadLoading}
              onClick={handleUploadDocs}
            >
              {uploadLoading ? "Uploading..." : "Submit Documents"}
            </button>
          </div>
        )}

        {currentBooking?.doc_status === "UPLOADED" && (
          <div className="ct_dash_light_blue_bg ct_py_24_px_48 ct_mt_40">
            <div className="d-flex align-items-center gap-2 mb-3">
              <i className="fa-regular fa-circle-check fs-4 text-success"></i>
              <h4 className="ct_fs_18 ct_fw_600 text-success mb-0">Documents Submitted Successfully</h4>
            </div>
            <p className="mb-3 text-muted">The host will review your uploaded documents shortly.</p>

            {currentBooking?.userDocument?.length > 0 && (
              <div>
                <h5 className="ct_fs_16 ct_fw_600 mb-2">Your Uploaded Files:</h5>
                <ul className="list-unstyled d-flex flex-wrap gap-3">
                  {currentBooking.userDocument.map((doc, idx) => (
                    <li
                      key={idx}
                      className="p-3 rounded d-flex align-items-center gap-2"
                      style={{ background: "#fff", border: "1px solid #e5e7eb" }}
                    >
                      <i className="fa-regular fa-file-lines fs-4 text-primary"></i>
                      <div>
                        <p className="mb-1 ct_fs_14 ct_fw_500 text-truncate" style={{ maxWidth: "200px" }}>
                          {doc.file ? doc.file.split("/").pop() : `Document_${idx + 1}`}
                        </p>
                        <a
                          href={doc.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ct_orange_btn"
                          style={{
                            height: "auto",
                            lineHeight: "normal",
                            padding: "6px 16px",
                            fontSize: "12px",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          View / Download
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {currentBooking?.booking_type == "Completed" && (
          <div className="ct_dash_light_blue_bg ct_py_24_px_48 ct_mt_40">
            <h4 className="ct_fs_20 ct_fw_600">{t("table.rate_your_experience")}</h4>
            <Formik
              initialValues={initialValues}
              validationSchema={addRatingSchema}
              onSubmit={(values, actions) => {
                handleAddRating(values);
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
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="form-group mt-4">
                    <label for="" className="mb-2 ct_fw_600">
                      {t("table.rating")}
                    </label>
                    <div>
                      {userReview?.user_id === profile?.id ? (
                        <Rating
                          initialValue={values.rating}
                          allowFraction
                          readonly
                          name="rating"
                        />
                      ) : (
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
                      )}
                    </div>
                    <ErrorMessage
                      errors={errors}
                      touched={touched}
                      fieldName={"rating"}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label for="" className="mb-2 ct_fw_600">
                      {t("table.comment")}
                    </label>
                    <textarea
                      className="form-control ct_input h-auto ct_input_grey"
                      placeholder={t("form.placeholder_review")}
                      rows="6"
                      name="review"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values["review"]}
                      readOnly={userReview?.user_id === profile?.id}
                    ></textarea>
                    <ErrorMessage
                      errors={errors}
                      touched={touched}
                      fieldName={"review"}
                    />
                  </div>
                  {userReview?.user_id != profile?.id && (
                    <div className="mt-4">
                      <button
                        className="ct_orange_btn"
                        onClick={handleSubmit}
                        type="button"
                      >
                        {t("form.submit")}
                      </button>
                    </div>
                  )}
                </form>
              )}
            </Formik>
          </div>
        )}
        <div className="ct_dash_light_blue_bg ct_py_24_px_48 ct_mt_40 ">
          <h4 className="ct_fs_20 ct_fw_600 mb-0 ">{t("table.additional_details")}</h4>

          <ul className="ct_mt_40 ct_grid_dash_2">
            <li>
              <p className="d-flex align-items-center gap-2 mb-1">{t("table.full_name")}</p>
              <p className="ct_text_clr_4B5563 mb-0">
                {currentBooking?.full_name || "#N/A"}
              </p>
            </li>
            <li>
              <p className="d-flex align-items-center gap-2 mb-1">{t("table.email")}</p>
              <p className="ct_text_clr_4B5563 mb-0">{currentBooking?.email || "#N/A"}</p>
            </li>
            <li>
              <p className="d-flex align-items-center gap-2 mb-1">
                {t("table.phone_number")}
              </p>
              <p className="ct_text_clr_4B5563 mb-0">
                {currentBooking?.phone_number || "#N/A"}
              </p>
            </li>
            <li>
              <p className="d-flex align-items-center gap-2 mb-1">
                {t("table.nationality")}
              </p>
              <p className="ct_text_clr_4B5563 mb-0">
                {currentBooking?.nationality || "#N/A"}
              </p>
            </li>
            <li>
              <p className="d-flex align-items-center gap-2 mb-1">
                {t("table.purpose_of_stay")}
              </p>
              <p className="ct_text_clr_4B5563 mb-0">
                {currentBooking?.purpose_of_stay || "#N/A"}
              </p>
            </li>
            <li>
              <p className="d-flex align-items-center gap-2 mb-1">{t("table.guest")}</p>
              <p className="ct_text_clr_4B5563 mb-0">{currentBooking?.guest || "#N/A"}</p>
            </li>
            <li>
              <p className="d-flex align-items-center gap-2 mb-1">
                {t("table.booked_from")}
              </p>
              <p className="ct_text_clr_4B5563 mb-0">
                {pipViewDate(currentBooking?.booked_from) || "#N/A"}
              </p>
            </li>
            <li>
              <p className="d-flex align-items-center gap-2 mb-1">{t("table.booked_to")}</p>
              <p className="ct_text_clr_4B5563 mb-0">
                {pipViewDate(currentBooking?.booked_to) || "#N/A"}
              </p>
            </li>

            <li>
              <p className="d-flex align-items-center gap-2 mb-1">
                {t("table.total_price")}
              </p>
              <p className="ct_text_clr_4B5563 mb-0">
                {curSym}
                {currentBooking?.total_price || "#N/A"}
              </p>
            </li>
          </ul>
        </div>
      </div>

      <SendReportModal
        isViewModal={isViewModal}
        setIsViewModal={setIsViewModal}
        handleSubmit={handleSendReport}
      />
    </PanelLayout>
  );
};

export default BookingDetails;

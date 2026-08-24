import { Formik } from "formik";
import { businessPath } from "../../routes";
import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import Loader from "../../../shared/components/loader";
import { useDispatch, useSelector } from "react-redux";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useLocation } from "react-router";
import PanelLayout from "../../../shared/layout/PanelLayout";
import { addRatingSchema } from "../../../shared/utils/schema";
import { StatusDefinitions } from "../../../shared/utils/data";
import NoRecord from "../../../shared/components/other/NoRecord";
import StatusCol from "../../../shared/components/table/StatusCol";
import TableHeader from "../../../shared/components/table/tableHeader";
import ErrorMessage from "../../../shared/components/form/ErrorMessage";
import CancelBooking from "../../../shared/components/modals/CancelBooking";
import SendReportModal from "../../../user/components/modals/SendReportModal";
import ReactPagination from "../../../shared/components/table/ReactPagination";
import PaginationDropdown from "../../../shared/components/table/PaginationDropdown";
import PropertyDetailsCard from "../../../shared/components/cards/PropertyDetailsCard";
import ImageWithPreview from "../../../shared/components/image preview/imageWithPreview";
import { fetchBookinDetailgById } from "../../../redux/features/business/actions/bookingAction";
import {
  curSym,
  getProfile,
  pipViewDate,
  pipViewMonth,
} from "../../../shared/utils/pip";
import {
  addRating,
  reportTheProperty,
} from "../../../redux/features/user/actions/bookingAction";

const BookingDetails = () => {
  const dispatch = useDispatch();
  const navigate = useLocalizedNavigate();
  const [isModal, setIsModal] = useState(false);

  const booking_id = useLocation()?.state?.booking_id || "";
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [isViewModal, setIsViewModal] = useState(false);
  const user = { name: "Booking Details", role: "guestBusiness" };
  const profile = getProfile("guestBusiness");
  const { isLoading, paymentDetailsHeader, bookingDetail, paymentDetailsList } =
    useSelector((state) => state.business.booking);
    const { reportLoading } = useSelector((state) => state.guest.booking);

  const userReview =
    bookingDetail?.reviews?.find((item) => item?.user_id == profile?.id) || {};
  const initialValues = {
    rating: userReview?.rating || "",
    review: userReview?.review || "",
  };

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  const paginatedList = bookingDetail?.paymentArray?.slice(
    currentPage * listPerPages,
    (currentPage + 1) * listPerPages,
  );

  useEffect(() => {
    dispatch(fetchBookinDetailgById({ payload: booking_id }));
  }, []);

  const handleSendReport = (values, resetFields) => {
    const callback = (res) => {
      if (res?.success) {
        setIsViewModal(false);
        resetFields();
      }
    };

    dispatch(
      reportTheProperty({
        payload: { property_id: bookingDetail?.property_id, ...values },
        callback,
      }),
    );
  };

  const handleAddRating = (values) => {
    const callback = (res) => {
      if (res?.success) {
       dispatch(fetchBookinDetailgById({ payload: booking_id }));
      }
    };

    dispatch(
      addRating({
        payload: { booking_id: bookingDetail?.booking_id, ...values },
        callback,
      }),
    );
  };

  if (isLoading|| reportLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout user={user}>
      <div className="row mt-5">
        <div className="col-md-12">
          {bookingDetail?.is_canceled == "No" &&
            bookingDetail?.booking_status == 1 &&
            bookingDetail?.booked_to &&
            new Date(bookingDetail.booked_to) > new Date() && (
              <div className="mb-4 text-end">
                <a
                  onClick={() => {
                    setIsModal(true);
                  }}
                  className="ct_border_radius_10 ct_h_40 ct_orange_btn ct_fit_content ms-auto  ct_fw_600 text-center"
                >
                  Cancel Booking
                </a>
              </div>
            )}

          <CancelBooking
            isModal={isModal}
            setIsModal={setIsModal}
            booking_id={bookingDetail?.booking_id}
          />
          <div className="ct_dash_light_blue_bg ct_py_24_px_48 ">
            <div className="d-flex align-items-center justify-content-between  gap-3 ct_flex_col_575">
              <div>
                <h4 className="ct_fs_20 ct_fw_600 mb-3">Guest Information</h4>
                <div className="d-flex align-items-center gap-2">
                  <ImageWithPreview
                    image={
                      bookingDetail?.user_image ||
                      "https://app.flexsirent.com/user_profile.png"
                    }
                  />

                  <div>
                    <p className="mb-0 ct_text_clr_4B5563">
                      {" "}
                      {bookingDetail?.user_first_name
                        ? `${bookingDetail?.user_first_name} ${bookingDetail?.user_last_name}`
                        : "#N/A"}
                    </p>
                    <p className="ct_fs_14 mb-0 ct_text_clr_4B5563">
                      {bookingDetail?.user_email || "#N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                {/* <!-- add class  ct_completed_badge for compated -->
                                            <!-- add class  ct_cancle_badge for compated --> */}
                <span
                  className={`ct_fw_600 ${
                    StatusDefinitions?.booking[bookingDetail?.booking_status]
                      ?.color
                  }`}
                >
                  {StatusDefinitions?.booking[bookingDetail?.booking_status]
                    ?.value ?? "#N/A"}
                </span>

                {/* <p className=" mb-0 ct_paid_badge ct_border_radius_10">Upcoming</p> */}
                <div className="mt-3">
                  <p className="ct_text_clr_4B5563 ct_fs_14 mb-0">Member Since</p>
                  <p className="ct_text_clr_4B5563 ct_fs_14 mb-0">
                    {pipViewDate(bookingDetail?.user_created_at) || "#N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="ct_dash_light_blue_bg ct_py_24_px_48 mt-4 ">
            <div className="d-flex align-items-center justify-content-between  gap-3 ct_flex_col_575">
              <div className="w-100 ">
                <div className="d-flex justify-content-between flex-wrap gap-3 align-items-center mb-3">
                  <h4 className="ct_fs_20 ct_fw_600 mb-0">Host Information</h4>
                  <button
                    className="ct_orange_btn"
                    type="button"
                    onClick={() => {
                      setIsViewModal(true);
                    }}
                  >
                    Report
                  </button>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <ImageWithPreview
                    image={
                      bookingDetail?.host_image ||
                      "https://app.flexsirent.com/user_profile.png"
                    }
                  />
                  <div>
                    <p className="mb-0 ct_text_clr_4B5563">
                      {bookingDetail?.host_first_name
                        ? `${bookingDetail?.host_first_name} ${bookingDetail?.host_lost_name}`
                        : "#N/A"}
                    </p>
                    <p className="ct_fs_14 mb-0 ct_text_clr_4B5563">
                      {bookingDetail?.host_email || "#N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PropertyDetailsCard
            navigateURL={businessPath.BusinessPropertyDetails}
            data={bookingDetail}
          />
          {bookingDetail?.user_id == profile?.id &&
            bookingDetail?.booking_type == "Completed" && (
              <div className="ct_dash_light_blue_bg ct_py_24_px_48 ct_mt_40">
                <h4 className="ct_fs_20 ct_fw_600">Rate Your Experience</h4>
                <Formik
                  initialValues={initialValues}
                  validationSchema={addRatingSchema}
                  enableReinitialize
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
                          Rating
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
                          Comment
                        </label>
                        <textarea
                          className="form-control ct_input h-auto ct_input_grey"
                          placeholder="Tell Us What You Liked...Or Didn’t"
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
                            Submit
                          </button>
                        </div>
                      )}
                    </form>
                  )}
                </Formik>
              </div>
            )}
          <div className="row ct_mt_40">
            <div className="col-md-12">
              <div className="mb-4 d-flex align-items-center justify-content-between gap-3 ct_flex_col_575">
                <h4 className="ct_fs_20 ct_fw_600 mb-0">Payment Details</h4>
              </div>
              <div className="table-responsive ct_custom_table">
                <table className="table ">
                  <TableHeader data={paymentDetailsHeader?.slice(0, -1)} />
                  {paginatedList?.length > 0 && (
                    <tbody>
                      {paginatedList?.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{pipViewMonth(item?.created_at) || "#N/A"}</td>
                          <td>
                            {curSym}
                            {item?.total_amount || 0}
                          </td>
                          <td>{pipViewDate(item?.created_at) || "#N/A"}</td>
                          {/* <td>
                            <span className="ct_upcoming_clr">
                              {item?.payment_status || "#N/A"}
                            </span>
                          </td> */}
                          <td>
                            <StatusCol
                              status={item?.payment_status}
                              type="payTans"
                            />
                          </td>
                          <td className="text-end">
                            {item?.payment_method || "#N/A"}
                          </td>
                          {/* <td>
                            <div className="d-flex align-items-center gap-3 justify-content-end">
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsViewModal(true);
                                }}
                                className="text-dark"
                              >
                                <i className="fa-regular fa-eye"></i>
                              </a>
                            </div>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
                {paginatedList?.length <= 0 && <NoRecord />}
              </div>
              {paginatedList?.length != 0 && (
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div>
                    <PaginationDropdown
                      onChange={(val) => {
                        setListPerPages(val);
                        setCurrentPage(0);
                      }}
                    />
                  </div>
                  <div>
                    <ReactPagination
                      pageCount={Math.ceil(
                        bookingDetail?.paymentArray?.length / listPerPages,
                      )}
                      onPageChange={handlePageClick}
                      currentPage={currentPage}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <PaymentDetails
        isViewModal={isViewModal}
        setIsViewModal={setIsViewModal}
      /> */}

      <SendReportModal
        isViewModal={isViewModal}
        setIsViewModal={setIsViewModal}
        handleSubmit={handleSendReport}
      />
    </PanelLayout>
  );
};

export default BookingDetails;

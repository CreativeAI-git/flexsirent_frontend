import { hostRoutes } from "../../routes";
import { useEffect, useState } from "react";
import Loader from "../../../shared/components/loader";
import { useDispatch, useSelector } from "react-redux";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useLocation } from "react-router";
import {
  curSym,
  pipViewDate,
  pipViewMonthYear,
} from "../../../shared/utils/pip";
import PanelLayout from "../../../shared/layout/PanelLayout";
import TableHeader from "../../../shared/components/table/tableHeader";
import PaymentDetailsModal from "../../components/modals/PaymentDetailsModal";
import PropertyDetailsCard from "../../../shared/components/cards/PropertyDetailsCard";
import BookingRejectReason from "../../../shared/components/modals/BookingRejectReason";
import ImageWithPreview from "../../../shared/components/image preview/imageWithPreview";
import {
  fetchBookingById,
  updateBookingStatus,
} from "../../../redux/features/host/actions/bookingAction";
import StatusCol from "../../../shared/components/table/StatusCol";
import NoRecord from "../../../shared/components/other/NoRecord";
import ReactPagination from "../../../shared/components/table/ReactPagination";
import PaginationDropdown from "../../../shared/components/table/PaginationDropdown";
import RequestDocModal from "../../components/modals/RequestDocModal";
import { t } from "i18next";

const BookingDetails = () => {
  const dispatch = useDispatch();
  const navigate = useLocalizedNavigate();
  const [paymentData, setPaymentData] = useState("");
  const [isViewModal, setIsViewModal] = useState(false);
  const user = { name: "Bookings Details", role: "host" };
  const [isViewModal1, setIsViewModal1] = useState(false);
  const [isRequestDocModal, setIsRequestDocModal] = useState(false);
  const booking_id = useLocation()?.state?.booking_id || "";
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);

  const { paymentDetailsHeader, bookingDetails, isLoading } = useSelector(
    (state) => state.host.booking
  );

  const paginatedList = bookingDetails?.paymentArray?.slice(
    currentPage * listPerPages,
    (currentPage + 1) * listPerPages
  );

  const handlePageClick = (pageData) => {
    setCurrentPage(pageData?.selected);
  };

  useEffect(() => {
    dispatch(fetchBookingById({ payload: booking_id }));
  }, []);

  const hanldeUpdateStatus = (finalData) => {
    const callback = (res) => {
      if (res?.success) {
        setIsViewModal1(false);
        dispatch(fetchBookingById({ payload: booking_id }));
      }
    };
    dispatch(
      updateBookingStatus({
        payload: finalData,
        callback,
      })
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout user={user}>
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="ct_dash_light_blue_bg ct_py_24_px_48 ">
            <div className="d-flex align-items-center justify-content-between  gap-3 ct_flex_col_575">
              <div>
                <h4 className="ct_fs_20 ct_fw_600 mb-3">Guest Information</h4>
                <div className="d-flex align-items-center gap-2">
                  <ImageWithPreview
                    image={bookingDetails?.user_image}
                    className="ct_img_60"
                  />

                  <div>
                    <p className="mb-0 ct_text_clr_4B5563">
                      {`${bookingDetails?.user_first_name} ${bookingDetails?.user_last_name}` || "#N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p
                  className={`mb-0 ${bookingDetails?.booking_status == 2
                    ? "ct_cancle_badge"
                    : bookingDetails?.booking_status == 1
                      ? "ct_completed_badge"
                      : "ct_checking_badge"
                    }`}
                >
                  {bookingDetails?.booking_status == 2
                    ? "Rejected"
                    : bookingDetails?.booking_status == 1
                      ? "Approved"
                      : "Pending"}
                </p>
                <div className="mt-3">
                  <p className="ct_text_clr_4B5563 ct_fs_14 mb-0">
                    Member Since
                  </p>
                  <p className="ct_text_clr_4B5563 ct_fs_14 mb-0">
                    {pipViewDate(bookingDetails?.user_created_at) || "#N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {(bookingDetails?.cancellation_reason || bookingDetails?.cancel_reason || bookingDetails?.rejection_reason) && (
            <div className="mb-2 mt-4 cancellatin-box d-flex align-items-center gap-3">
              <div>
                <i className="fa-solid fa-circle-xmark fs-3 text-danger mt-2"></i>
              </div>
              <div>
                <h5 className="ct_fs_18 ct_fw_700 mb-0">{t("table.cancellation_reason")}</h5>
                <p className="mb-0">{bookingDetails?.cancellation_reason || bookingDetails?.cancel_reason || bookingDetails?.rejection_reason || "#N/A"}</p>
              </div>
            </div>
          )}
          <PropertyDetailsCard
            label="Property Details"
            data={bookingDetails}
            navigateURL={hostRoutes.ListingDetails}
          />

          {bookingDetails?.doc_status !== "NOT REQUESTED" && (
            <div className="ct_dash_light_blue_bg ct_py_24_px_48 mt-4">
              <h4 className="ct_fs_20 ct_fw_600 mb-3">Requested Documents</h4>
              <p className="mb-2 ct_text_clr_4B5563">
                <strong>Status:</strong>{" "}
                <span className={`badge ${bookingDetails?.doc_status === "UPLOADED" ? "bg-success" : "bg-warning"}`}>
                  {bookingDetails?.doc_status}
                </span>
              </p>
              <p className="mb-3 ct_text_clr_4B5563">
                <strong>Requested Docs:</strong> {bookingDetails?.requested_doc || "#N/A"}
              </p>

              {bookingDetails?.doc_status === "UPLOADED" && bookingDetails?.userDocument?.length > 0 && (
                <div>
                  <h5 className="ct_fs_16 ct_fw_600 mb-2">Uploaded Files:</h5>
                  <ul className="list-unstyled d-flex flex-wrap gap-3">
                    {bookingDetails?.userDocument?.map((doc, idx) => (
                      <li key={idx} className="ct_light_blue_outline p-3 rounded d-flex align-items-center gap-2" style={{ background: "#fff", border: "1px solid #e5e7eb" }}>
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

          {bookingDetails?.booking_status == 0 && (
            <div className="d-flex align-items-center justify-content-end gap-3 mt-4">
              {bookingDetails?.doc_status === "NOT REQUESTED" && (
                <button
                  className="ct_orange_btn"
                  onClick={() => {
                    setIsRequestDocModal(true);
                  }}
                >
                  Request Documents
                </button>
              )}
              <button
                className="ct_approve_green_btn ct_orange_btn"
                onClick={() => {
                  hanldeUpdateStatus({
                    booking_id,
                    booking_status: 1,
                  });
                }}
              >
                Approve
              </button>
              <button
                className="ct_reject_red_btn ct_orange_btn"
                onClick={() => {
                  setIsViewModal1(true);
                }}
              >
                Reject
              </button>
            </div>
          )}
          <div className="row mt-4">
            <div className="col-md-12">
              <h4 className="ct_fs_24 ct_fw_600 mb-4">Payment Details</h4>
              <div className="table-responsive mt-4 ct_custom_table">
                <table className="table ">
                  <TableHeader data={paymentDetailsHeader} />
                  <tbody>
                    {paginatedList?.map((item, i) => (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{pipViewMonthYear(item?.created_at)}</td>
                        <td>
                          {curSym}
                          {item?.total_amount}
                        </td>
                        <td>{pipViewDate(item?.created_at) || "#N/A"}</td>
                        {/* <td>
                        <span className="ct_upcoming_clr">Paid</span>
                      </td> */}
                        <td>
                          <StatusCol
                            status={item?.payment_status}
                            type="payments"
                          />
                        </td>
                        <td>{item?.payment_method || "#N/A"}</td>
                        <td>
                          <div className="d-flex align-items-center gap-3 justify-content-end">
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setPaymentData(item);
                                setIsViewModal(true);
                              }}
                              className="text-dark"
                            >
                              <i className="fa-regular fa-eye"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
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
                        bookingDetails?.paymentArray?.length / listPerPages
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

      {/* Modal */}
      <BookingRejectReason
        isViewModal={isViewModal1}
        setIsViewModal={setIsViewModal1}
        onClick={(reason) => {
          hanldeUpdateStatus({
            booking_id,
            cancellation_reason: reason,
            booking_status: 2,
          });
        }}
      />

      <PaymentDetailsModal
        isViewModal={isViewModal}
        data={paymentData}
        bookingData={bookingDetails}
        setIsViewModal={setIsViewModal}
      />

      <RequestDocModal
        booking_id={booking_id}
        isViewModal={isRequestDocModal}
        setIsViewModal={setIsRequestDocModal}
        handleSubmit={() => {
          dispatch(fetchBookingById({ payload: booking_id }));
        }}
      />
    </PanelLayout>
  );
};

export default BookingDetails;

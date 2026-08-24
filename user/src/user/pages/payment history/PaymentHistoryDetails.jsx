import { webPath } from "../../routes";
import { useEffect, useState } from "react";
import Loader from "../../../shared/components/loader";
import { useDispatch, useSelector } from "react-redux";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useLocation } from "react-router";
import PanelLayout from "../../../shared/layout/PanelLayout";
import { StatusDefinitions } from "../../../shared/utils/data";
import NoRecord from "../../../shared/components/other/NoRecord";
import TableHeader from "../../../shared/components/table/tableHeader";
import { generateInvoice } from "../../../shared/utils/generateInvoice";
import { curSym, pipFromTo, pipViewDate } from "../../../shared/utils/pip";
import ReactPagination from "../../../shared/components/table/ReactPagination";
import PaginationDropdown from "../../../shared/components/table/PaginationDropdown";
import ImageWithPreview from "../../../shared/components/image preview/imageWithPreview";
import { fetchPayHistoryDetails } from "../../../redux/features/user/actions/inboxAction";
import { useTranslation } from "react-i18next";
import { useTableHeaders } from "../../../shared/hooks/useTableHeaders";

const PaymentHistoryDetails = () => {
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { paymentHisDetailTableHeader } = useTableHeaders();
  const booking_id = useLocation()?.state?.booking_id || "";
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const {
    payHisDetailList,
    isLoading,
    payHisData,
  } = useSelector((state) => state.guest.inbox);

  const user = { name: t("sidebar.payment_history"), role: "guest" };

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  const paginatedList = payHisData?.payment_details
    ?.slice(currentPage * listPerPages, (currentPage + 1) * listPerPages);

  const totalCompletedAmount = payHisData?.payment_details
    ?.filter((item) => item.payment_status === "COMPLETED")
    .reduce((sum, item) => sum + (item.total_amount || 0), 0);

  useEffect(() => {
    dispatch(fetchPayHistoryDetails(booking_id));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout user={user}>
      <div className="row ">
        <div className="col-md-12">
          {payHisData?.is_canceled != "No" && (
            <div className="ct_light_orange_alert mb-4">
              <svg
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_601_7119"
                  style={{ maskType: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="2"
                  width="20"
                  height="20"
                >
                  <path d="M0 2H20V22H0V2Z" fill="white"></path>
                </mask>
                <g mask="url(#mask0_601_7119)">
                  <mask
                    id="mask1_601_7119"
                    style={{ maskType: "luminance" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="2"
                    width="20"
                    height="20"
                  >
                    <path d="M0 2H20V22H0V2Z" fill="white"></path>
                  </mask>
                  <g mask="url(#mask1_601_7119)">
                    <path
                      d="M10 4.1875C5.69219 4.1875 2.1875 7.69219 2.1875 12C2.1875 16.3078 5.69219 19.8125 10 19.8125C14.3078 19.8125 17.8125 16.3078 17.8125 12C17.8125 7.69219 14.3078 4.1875 10 4.1875ZM10 7.39062C10.2805 7.39062 10.5198 7.48978 10.7182 7.68809C10.9165 7.88641 11.0156 8.12579 11.0156 8.40625C11.0156 8.68671 10.9165 8.92609 10.7182 9.1244C10.5198 9.32272 10.2805 9.42187 10 9.42188C9.71954 9.42187 9.48016 9.32272 9.28184 9.1244C9.08353 8.92609 8.98437 8.68671 8.98438 8.40625C8.98438 8.12579 9.08353 7.88641 9.28184 7.68809C9.48016 7.48978 9.71954 7.39062 10 7.39062ZM11.875 16.2187H8.4375C8.26491 16.2187 8.1176 16.1577 7.99556 16.0357C7.87352 15.9137 7.8125 15.7663 7.8125 15.5937C7.8125 15.4212 7.87352 15.2738 7.99556 15.1518C8.1176 15.0298 8.26491 14.9687 8.4375 14.9687H9.53125V11.5312H8.90625C8.73366 11.5312 8.58635 11.4702 8.46431 11.3482C8.34227 11.2262 8.28125 11.0788 8.28125 10.9062C8.28125 10.7337 8.34227 10.5863 8.46431 10.4643C8.58635 10.3423 8.73366 10.2812 8.90625 10.2812H10.1562C10.3288 10.2812 10.4762 10.3423 10.5982 10.4643C10.7202 10.5863 10.7812 10.7337 10.7812 10.9062V14.9687H11.875C12.0476 14.9687 12.1949 15.0298 12.3169 15.1518C12.439 15.2738 12.5 15.4212 12.5 15.5937C12.5 15.7663 12.439 15.9137 12.3169 16.0357C12.1949 16.1577 12.0476 16.2187 11.875 16.2187Z"
                      fill="#FF5A3C"
                    ></path>
                  </g>
                </g>
              </svg>
              <div>
                <h5 className="ct_fs_18 ct_fw_700 mb-2">{t("table.cancellation_reason")}</h5>
                <p className="mb-0">{payHisData?.cancel_reason || payHisData?.cancellation_reason || payHisData?.rejection_reason || "#N/A"}</p>
              </div>
            </div>
          )}
        </div>
        <div className=" text-end ">
          <a
            onClick={(e) => {
              e.preventDefault();
              generateInvoice(payHisData);
            }}
            className="ct_border_radius_10 ct_h_40 ct_orange_btn ct_fit_content ms-auto  ct_fw_600 text-center"
          >
            <i className="fa-regular fa-file-lines me-2"></i> {t("table.download_invoice")}
          </a>
        </div>

        <div className="col-lg-8 mt-4">
          <div className="ct_dash_light_blue_bg p-4 mt-4 h-100">
            <div className="d-flex align-items-center justify-content-between mb-4 ct_flex_col_575 gap-2">
              <h4 className="ct_fs_20 ct_fw_600 ">{t("table.property_details")}</h4>
              <p
                className={`mb-0 ct_border_radius_10 ${StatusDefinitions?.propertyBookingStatus[
                  payHisData?.is_canceled == "No"
                    ? payHisData?.current_status
                    : "Cancelled"
                ]?.color
                  }`}
              >
                {
                  StatusDefinitions?.propertyBookingStatus[
                    payHisData?.is_canceled == "No"
                      ? payHisData?.current_status
                      : "Cancelled"
                  ]?.value
                }
              </p>
            </div>
            <div className="row align-items-center">
              <div className="col-md-4 mb-4 mb-md-0">
                <div className="ct_flex_shrink_0">
                  <ImageWithPreview
                    image={
                      payHisData?.propertyImage?.length > 0 &&
                      payHisData?.propertyImage[0]?.image
                    }
                    className="ct_img_h_232 ct_border_radius_10 ct_flex_shrink_0"
                  />
                </div>
              </div>
              <div className="col-md-8 mb-4 mb-md-0">
                <h4 className="ct_fs_18 ct_fw_600 mb-2">
                  {payHisData?.property_title || "#N/A"}
                </h4>
                <p className="ct_text_clr_4B5563 mb-1">
                  <img loading="lazy"
                    src="https://app.flexsirent.com/assets/img/dashbaord-images/ep_location.svg"
                    alt=""
                    className="me-1"
                  />
                  <span>{payHisData?.address || "#N/A"}</span>
                </p>
                <p className="ct_text_clr_4B5563 mt-0">
                  <img loading="lazy"
                    src="https://app.flexsirent.com/assets/img/ei_user.svg"
                    alt=""
                    className="me-1"
                  />
                  <span>
                    {t("table.host")}:{" "}
                    {`${payHisData?.host_first_name} ${payHisData?.host_last_name}` ||
                      "#N/A"}
                  </span>
                </p>

                <div className="mt-md-auto mt-4">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault(e);
                      navigate(webPath?.PropertyData, {
                        state: { data: payHisData },
                      });
                    }}
                    className="ct_view_dtl_black_link"
                  >
                    {t("table.view_details")} <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mt-4">
          <div className="ct_dash_light_blue_bg p-4  mt-4 h-100">
            <h4 className="ct_fs_20 ct_fw_600 ">{t("table.payment_details")}</h4>
            <ul>
              <li className="d-flex align-items-center justify-content-between pt-3">
                <p className="ct_fs_16 ct_fw_600 mb-0">{t("table.security_deposit")}:</p>
                <p className="ct_fs_16 mb-0 ct_white_nowrap">
                  {curSym}
                  {payHisData?.security_deposit}
                </p>
              </li>
              <li className="d-flex align-items-center justify-content-between pt-3">
                <p className="ct_fs_16 ct_fw_600 mb-0">{t("table.monthly_rent")}:</p>
                <p className="ct_fs_16 mb-0 ct_white_nowrap">
                  {curSym}
                  {payHisData?.monthly_rent}
                </p>
              </li>
              <li className="d-flex align-items-center justify-content-between pt-3">
                <p className="ct_fs_16 ct_fw_600 mb-0">{t("table.discount")}:</p>
                <p className="ct_fs_16 mb-0 ct_white_nowrap text-success">
                  -
                  {curSym}
                  555
                </p>
              </li>
              <li className="d-flex align-items-center justify-content-between pt-3">
                <p className="ct_fs_16 ct_fw_600 mb-0">{t("table.total_amount")}:</p>
                <p className="ct_fs_16 mb-0 ct_white_nowrap">
                  {curSym}
                  {totalCompletedAmount || 0}{" "}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row ct_mt_30 pt-4">
        <div className="col-md-12 mt-4">
          <div className="pb-4 mb-4 ct_border_btm_grey">
            <div className="d-flex align-items-center justify-content-between gap-3 mb-3 ct_flex_col_575">
              <h4 className="ct_fs_20 ct_fw_600 mb-0">{t("table.transaction_details")}</h4>
              <div className="d-flex align-items-center justify-content-end gap-3 ct_flex_col_575">
              </div>
            </div>

            <div className="mt-4">
              <div className="table-responsive mt-3 ct_custom_table">
                <table className="table ">
                  <TableHeader data={paymentHisDetailTableHeader} />
                  {paginatedList?.length > 0 && (
                    <tbody>
                      {paginatedList?.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {pipFromTo(item?.start_date, item?.end_date) ||
                              "#N/A"}
                          </td>
                          <td>
                            {curSym}
                            {item?.total_amount || "0"}
                          </td>
                          <td>{pipViewDate(item?.created_at) || "#N/A"}</td>
                          <td>{item?.payment_method || "#N/A"}</td>
                          <td className="text-end">
                            <span
                              className={
                                StatusDefinitions?.payTans[item?.payment_status]
                                  ?.color
                              }
                            >
                              {
                                StatusDefinitions?.payTans[item?.payment_status]
                                  ?.value
                              }
                            </span>
                          </td>
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
                        payHisData?.payment_details?.length / listPerPages
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

      {/* <!-- business Modal S --> */}
      <div
        className="modal fade modal-lg"
        id="ct_payment_detail"
        tabindex="-1"
        aria-labelledby="ct_payment_detailLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close ct_login_btn_close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body pt-3">
              <div className="ct_pb_27 ct_border_btm_grey">
                <div className="d-flex align-items-center justify-content-between gap-2">
                  <h4 className="ct_fs_20 ct_fw_600 mb-0">Monthly Rent Payment</h4>
                  <span className="ct_paid_badge">Paid</span>
                </div>
                <p className="mb-0 ct_text_clr_4B5563 mt-2">
                  Rent for April 2025 was successfully paid
                </p>
              </div>
              <div className="ct_pt_30 ct_pb_27 ct_border_btm_grey">
                <div className="ct_grid_dash_2">
                  <div>
                    <h6 className="ct_fs_16 mb-1">Transaction ID</h6>
                    <p className="ct_fs_16 mb-0 ct_text_clr_4B5563">
                      #TXN23489APR25
                    </p>
                  </div>
                  <div>
                    <h6 className="ct_fs_16 mb-10">Date Paid</h6>
                    <p className="ct_fs_16 mb-0 ct_text_clr_4B5563">21 May 2025</p>
                  </div>
                  <div>
                    <h6 className="ct_fs_16 mb-1">Payment Method</h6>
                    <p className="ct_fs_16 mb-0 ct_text_clr_4B5563">
                      Visa **** 3421
                    </p>
                  </div>
                  <div>
                    <h6 className="ct_fs_16 mb-1">Amount Paid</h6>
                    <p className="ct_fs_16 mb-0 ct_text_clr_4B5563">€29</p>
                  </div>
                </div>
              </div>
              <div className="ct_pt_30 ct_pb_27 ">
                <div className="d-flex align-items-center gap-3 ct_flex_col_575 gap-2 justify-content-between">
                  <div>
                    <h6 className="mb-0 ct_fs_16">Property Details</h6>
                    <h6 className="mt-3 ct_fs_16">Modern 2BHK in Downtown</h6>
                    <div className="mt-3">
                      <p className="ct_text_clr_4B5563 mb-0">
                        123 Liberty Street, NY
                      </p>
                      <p className="ct_text_clr_4B5563 mb-0">
                        Guest: Sarah Johnson
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
};

export default PaymentHistoryDetails;

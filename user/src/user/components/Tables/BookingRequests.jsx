import { useState } from "react";
import { webPath } from "../../routes";
import { useDispatch } from "react-redux";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import NoRecord from "../../../shared/components/other/NoRecord";
import StatusCol from "../../../shared/components/table/StatusCol";
import { getProfile, pipViewDate } from "../../../shared/utils/pip";
import TableHeader from "../../../shared/components/table/tableHeader";
import ReactPagination from "../../../shared/components/table/ReactPagination";
import PaginationDropdown from "../../../shared/components/table/PaginationDropdown";
import { payForBooking } from "../../../redux/features/user/actions/bookingAction";

const BookingRequests = ({ data = [], tableHeading = [] }) => {
  const dispatch = useDispatch();
  const navigate = useLocalizedNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const profileData = getProfile("guest") || {};

  const paginatedList = data?.slice(
    currentPage * listPerPages,
    (currentPage + 1) * listPerPages
  );

  const handlePageClick = (pageData) => {
    setCurrentPage(pageData?.selected);
  };
  const hanldePay = (booking_id) => {
    const callback = (res) => {
      if (res?.success) {
        window.location.href = res?.data;
      }
    };
    dispatch(payForBooking({ payload: { booking_id }, callback }));
  };
  return (
    <>
      <div className="table-responsive mt-3 ct_custom_table">
        <table className="table ">
          <TableHeader data={tableHeading} />
          <tbody>
            {paginatedList?.map((item, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>
                  {" "}
                  <span className="ct_overlay_text">
                    {item?.property_title ?? "#N/A"}
                  </span>
                </td>
                <td>
                  {`${item?.host_first_name} ${item?.host_last_name}` || "#N/A"}
                </td>
                <td>{pipViewDate(item?.created_at) ?? "#N/A"}</td>
                <td>
                  <StatusCol status={item?.booking_status} type="booking" />
                </td>
                {!profileData?.added_by ? (
                  <td>
                    {item?.payment_status == 0 && item?.booking_status == 1 ? (
                      <button
                        className="ct_pay_btn"
                        onClick={() => hanldePay(item?.booking_id)}
                      >
                        Pay
                      </button>
                    ) : item?.payment_status == 0 ? (
                      <button className="ct_pay_btn" disabled>
                        Pay
                      </button>
                    ) : (
                      <StatusCol
                        status={item?.payment_status}
                        type="bookedPayments"
                      />
                    )}
                  </td>
                ) : (
                  <td>
                    <StatusCol
                      status={item?.payment_status}
                      type="guestBusinessGuesbookedPayments"
                    />
                  </td>
                )}
                <td>
                  <div className="d-flex align-items-center gap-3 justify-content-end">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(webPath?.BookingDetails, {
                          state: { data: item },
                        });
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
              pageCount={Math.ceil(data?.length / listPerPages)}
              onPageChange={handlePageClick}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BookingRequests;

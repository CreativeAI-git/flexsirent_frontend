import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { businessPath } from "../../routes";
import { curSym } from "../../../shared/utils/pip";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useLocation, useParams } from "react-router";
import { StatusDefinitions } from "../../../shared/utils/data";
import NoRecord from "../../../shared/components/other/NoRecord";
import TableHeader from "../../../shared/components/table/tableHeader";
import ReactPagination from "../../../shared/components/table/ReactPagination";
import PaginationDropdown from "../../../shared/components/table/PaginationDropdown";
import StatusCol from "../../../shared/components/table/StatusCol";
import {
  fetchBookings,
  payForBooking,
} from "../../../redux/features/business/actions/bookingAction";

const BookingTable = ({ searchFilter = "" }) => {
  const dispatch = useDispatch();
  const navigate = useLocalizedNavigate();
  const { lang } = useParams();
  const { pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);

  const { bookingList, recentBookingHeader } = useSelector(
    (state) => state.business.booking
  );

  const paginatedList = bookingList
    ?.filter((item) => {
      const search = item?.property_title
        ?.toLowerCase()
        ?.includes(searchFilter?.toLowerCase());
      return search;
    })
    ?.slice(currentPage * listPerPages, (currentPage + 1) * listPerPages);

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  const hanldePay = (booking_id) => {
    const callback = (res) => {
      if (res?.success) {
        window.location.href = res?.data
      }
    };
    dispatch(payForBooking({ payload: { booking_id }, callback }));
  };

  function tableBody() {
    return paginatedList?.map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          {item?.host_first_name
            ? `${item?.host_first_name} ${item?.host_lost_name}`
            : "#N/A"}
        </td>
        <td>
          {item?.user_first_name
            ? `${item?.user_first_name} ${item?.user_last_name}`
            : "#N/A"}
        </td>
        <td>{item?.property_title ?? "#N/A"}</td>
        <td>
          {" "}
          {item?.owner_type == "1" ? "Individual Owner" : "Property Manager"}
        </td>
        <td>
          {curSym}
          {item?.monthly_rent ?? "#N/A"}
        </td>

        <td>
          <StatusCol status={item?.booking_status} type="booking" />
          {/* <span
            className={`ct_fw_600 ${
              StatusDefinitions?.booking[item?.booking_status]?.color
            }`}
          >
            {StatusDefinitions?.booking[item?.booking_status]?.value ?? "#N/A"}
          </span> */}
        </td>
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
            <StatusCol status={item?.payment_status} type="bookedPayments" />
          )}
        </td>
        <td>
          <div className="d-flex align-items-center gap-3 justify-content-end">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate(`${lang}${businessPath.BookingDetails}`, {
                  state: { booking_id: item?.booking_id },
                });
              }}
              className="text-dark"
            >
              <i className="fa-regular fa-eye"></i>
            </a>
          </div>
        </td>
      </tr>
    ));
  }
  return (
    <div className="mt-4">
      <div className="table-responsive  ct_custom_table">
        <table className="table ">
          <TableHeader data={recentBookingHeader} />
          <tbody>
            {pathname.includes(businessPath?.Dashboard)
              ? tableBody()?.slice(0, 5)
              : tableBody()}
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
              pageCount={Math.ceil(bookingList?.length / listPerPages)}
              onPageChange={handlePageClick}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingTable;

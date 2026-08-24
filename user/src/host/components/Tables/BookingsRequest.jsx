import { useState } from "react";
import { hostRoutes } from "../../routes";
import { useSelector } from "react-redux";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { pipViewDate } from "../../../shared/utils/pip";
import NoRecord from "../../../shared/components/other/NoRecord";
import StatusCol from "../../../shared/components/table/StatusCol";
import TableHeader from "../../../shared/components/table/tableHeader";
import ReactPagination from "../../../shared/components/table/ReactPagination";
import PaginationDropdown from "../../../shared/components/table/PaginationDropdown";

const BookingsRequest = ({
  data = [],
  tableHeading = [],
  detailRoute = hostRoutes?.BookingDetails,
}) => {
  const navigate = useLocalizedNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const { hostRecentBookingHeader } = useSelector(
    (state) => state.host.booking
  );
  const paginatedList = data?.slice(
    currentPage * listPerPages,
    (currentPage + 1) * listPerPages
  );

  const handlePageClick = (pageData) => {
    setCurrentPage(pageData?.selected);
  };

  return (
    <>
      <div className="table-responsive mt-3 ct_custom_table">
        <table className="table ">
          <TableHeader data={hostRecentBookingHeader} />
          <tbody>
            {paginatedList?.map((item, i) => (
              <tr>
                <td>{i + 1}</td>
                <td><span className="ct_overlay_text">{item?.property_title ?? "#N/A"}</span></td>
                <td>{(`${item?.user_first_name || item?.guest_first_name || ""} ${item?.user_last_name || item?.guest_last_name || ""}`)?.trim() || "#N/A"}</td>
                <td>{pipViewDate(item?.created_at) ?? "#N/A"}</td>
                <td>
                  <StatusCol status={item?.booking_status} type="booking" />
                </td>
                <td>
                  <div className="d-flex align-items-center gap-3 justify-content-end">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(detailRoute, {
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

export default BookingsRequest;

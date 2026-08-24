import { useState } from "react";
import { pageRoutes } from "../../routes/PageRoutes";
import { useLocation, useNavigate } from "react-router";
import NoRecord from "../../shared/components/others/NoRecord";
import TableHeader from "../../shared/components/Table/TableHeader";
import ReactPagination from "../../shared/components/Table/ReactPagination";
import { changeStatusColor, checkStatus, pipViewDate } from "../../utills/pip";
import PaginationDropdown from "../../shared/components/Table/PaginationDropdown";

const BookingTable = ({ data = [], tableHeading = [] }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);

  const paginatedList = data?.slice(
    currentPage * listPerPages,
    (currentPage + 1) * listPerPages,
  );

  const handlePageClick = (pageData) => {
    setCurrentPage(pageData?.selected);
  };

  return (
    <>
      <div className="table-responsive ct_custom_table">
        <table className="table">
          <TableHeader data={tableHeading} />
          <tbody>
            {paginatedList?.map((item, i) => (
              <tr className={checkStatus(item?.status_label ?? "")}>
                <td>{i + 1}</td>
                <td>
                  {`${item?.user_first_name} ${item?.user_last_name}` ?? "#N/A"}
                </td>
                <td>
                  <span className="ct_overlay_text">
                    {`${item?.host_first_name} ${item?.host_last_name}` ??
                      "#N/A"}
                  </span>
                </td>
                <td>{item?.property_title ?? "#N/A"}</td>
                <td>{pipViewDate(item?.created_at) ?? "#N/A"}</td>
                <td>
                  <span
                    className={`${changeStatusColor(
                      item?.status_label ?? "",
                    )} ct_fw_600`}
                  >
                    {item?.status_label ?? "#N/A"}
                  </span>
                </td>
                <td>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                    navigate(`/booking-details/${item?.booking_id}`);
                    }}
                    className="ct_text_39A1FF"
                  >
                    <i className="fa-solid fa-eye fs-5"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {paginatedList?.length <= 0 && <NoRecord />}
      </div>

      {data?.length > 0 && pathname != pageRoutes?.dashboard && (
        <div className="d-flex ct_flex_col_575 gap-3 justify-content-between align-items-center mt-4">
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
              pageCount={Math.ceil(data.length / listPerPages)}
              onPageChange={handlePageClick}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BookingTable;

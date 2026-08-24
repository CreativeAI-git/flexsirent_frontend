import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { pipViewDate } from "../../../shared/utils/pip";
import NoRecord from "../../../shared/components/other/NoRecord";
import TableHeader from "../../../shared/components/table/tableHeader";
import ReactPagination from "../../../shared/components/table/ReactPagination";
import PaginationDropdown from "../../../shared/components/table/PaginationDropdown";
import {
  fetchCheckouts,
  makeCheckout,
} from "../../../redux/features/host/actions/bookingAction";

const TodaysCheckoutTable = ({ data = [], tableHeading = [] }) => {
  const dispatch = useDispatch();
  const navigate = useLocalizedNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);

  const paginatedList = data?.slice(
    currentPage * listPerPages,
    (currentPage + 1) * listPerPages
  );

  const handlePageClick = (pageData) => {
    setCurrentPage(pageData?.selected);
  };

  const handleStatus = (id) => {
    const callback = (res) => {
      if (res?.success) {
        dispatch(fetchCheckouts());
      }
    };
    dispatch(makeCheckout({ payload: id, callback }));
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
                <td>{item?.full_name || "#N/A"}</td>
                <td>{pipViewDate(item?.created_at) ?? "#N/A"}</td>
                <td>{pipViewDate(item?.booked_to) ?? "#N/A"}</td>
                <td>
                  <button
                    className={`ct_outline_btn ms-auto mt-3 ct_remove_btn_hover ${
                      item?.check_out_status == 1 ? "ct_active_checkout" : ""
                    }`}
                    disabled={item?.check_out_status == 1}
                    onClick={() => handleStatus(item?.booking_id)}
                  >
                    {item?.check_out_status == 1 ? "Checked-Out" : "Check-Out"}
                  </button>
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

export default TodaysCheckoutTable;

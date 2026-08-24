import { useState } from "react";
import StatusCol from "./StatusCol";
import { useDispatch } from "react-redux";
import { pageRoutes } from "../../routes/PageRoutes";
import { useLocation, useNavigate } from "react-router";
import NoRecord from "../../shared/components/others/NoRecord";
import TableHeader from "../../shared/components/Table/TableHeader";
import { curSym, pipViewDate, StatusDefinitions } from "../../utills/pip";
import ReactPagination from "../../shared/components/Table/ReactPagination";
import PaginationDropdown from "../../shared/components/Table/PaginationDropdown";

const BookedPropertyTable = ({ data = [], tableHeading = [] }) => {
  const dispatch = useDispatch();
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
              <tr className={StatusDefinitions?.booking?.[item?.status]?.table}>
                <td>{i + 1}</td>
                <td>
                  <span className="ct_overlay_text">
                    {item?.property_title ?? "#N/A"}
                  </span>
                </td>
                <td>{pipViewDate(item?.created_at) ?? "#N/A"}</td>
                <td>
                  {curSym}
                  {item?.monthly_rent ?? "#N/A"}
                </td>
                <StatusCol status={item?.status} type={"booking"} />

                <td>
                  <div className="d-flex align-items-center gap-3">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/booking-details/${item?.booking_id}`);
                      }}
                      className="ct_text_39A1FF"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {paginatedList?.length <= 0 && <NoRecord />}
      </div>

      {data?.length > 0 && (
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

export default BookedPropertyTable;

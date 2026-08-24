import TableHeader from "./tableHeader";
import NoRecord from "../other/NoRecord";
import { useEffect, useState } from "react";
import ReactPagination from "./ReactPagination";
import PaginationDropdown from "./PaginationDropdown";
import { getSubstring, pipViewDate } from "../../utils/pip";

const InquiryTable = ({ data = [], tableHeading = [], onView = () => {} }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);

  const paginatedList = data?.slice(
    currentPage * listPerPages,
    (currentPage + 1) * listPerPages,
  );

  const pageCount = Math.ceil((data?.length || 0) / listPerPages);

  useEffect(() => {
    if (currentPage > 0 && currentPage >= pageCount) {
      setCurrentPage(0);
    }
  }, [data, listPerPages, pageCount, currentPage]);

  return (
    <>
      <div className="table-responsive ct_custom_table mt-4">
        <table className="table">
          <TableHeader data={tableHeading} />
          <tbody>
            {paginatedList?.map((item, i) => (
              <tr key={i}>
                <td>{currentPage * listPerPages + i + 1}</td>
                <td>{item?.user_name || "#N/A"}</td>
                <td>{item?.email || "#N/A"}</td>
                <td>{item?.property_title || "#N/A"}</td>
                <td>{getSubstring(item?.message, 30) || "#N/A"}</td>
                <td>{pipViewDate(item?.created_at) || "#N/A"}</td>
                <td className="text-end">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onView(item);
                    }}
                    className="ct_text_39A1FF"
                  >
                    <i className="fa-solid fa-eye"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data?.length <= 0 && <NoRecord />}

      {paginatedList?.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div>
            <PaginationDropdown
              onChange={(val) => {
                setListPerPages(Number(val));
                setCurrentPage(0);
              }}
            />
          </div>
          <div>
            <ReactPagination
              pageCount={pageCount}
              onPageChange={(val) => setCurrentPage(val?.selected)}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default InquiryTable;

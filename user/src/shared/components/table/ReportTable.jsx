import { useState } from "react";
import TableHeader from "./tableHeader";
import NoRecord from "../other/NoRecord";
import ReportModal from "../modals/ReportModal";
import ReactPagination from "./ReactPagination";
import PaginationDropdown from "./PaginationDropdown";
import { getSubstring, pipViewDate } from "../../utils/pip";

const ReportTable = ({ data = [], tableHeading = [], isReportedBy = true }) => {
  const [detail, setDetail] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [isViewModal, setIsViewModal] = useState(false);
  
  const paginatedList = data?.slice(
    currentPage * listPerPages,
    (currentPage + 1) * listPerPages,
  );

  const handlePageClick = (pageData) => {
    setCurrentPage(pageData?.selected);
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

                <td>{item?.property_title ?? "#N/A"}</td>
                {isReportedBy && (
                  <td>
                    {`${item?.user_first_name} ${item?.user_last_name}` ??
                      "#N/A"}
                  </td>
                )}
                <td>
                 <span className="ct_overlay_text"> {item?.report_title ?? "#N/A"}</span>
                  </td>
                <td>{getSubstring(item?.description) ?? "#N/A"}</td>
                <td>{pipViewDate(item?.created_at) ?? "#N/A"}</td>
                <td>
                  <div className="d-flex align-items-end gap-3 justify-content-end">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setDetail(item);
                        setIsViewModal(true);
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

      <ReportModal
        isReportedBy={isReportedBy}
        data={detail}
        isViewModal={isViewModal}
        setIsViewModal={setIsViewModal}
      />
    </>
  );
};

export default ReportTable;

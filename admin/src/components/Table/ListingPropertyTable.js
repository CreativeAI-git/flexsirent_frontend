import { useState } from "react";
import { useNavigate } from "react-router";
import { pipViewDate } from "../../utills/pip";
import { pageRoutes } from "../../routes/PageRoutes";
import NoRecord from "../../shared/components/others/NoRecord";
import TableHeader from "../../shared/components/Table/TableHeader";
import ReactPagination from "../../shared/components/Table/ReactPagination";
import PaginationDropdown from "../../shared/components/Table/PaginationDropdown";

const ListingPropertyTable = ({ data = [], tableHeading = [] }) => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const paginatedList = data?.slice(
    currentPage * listPerPages,
    (currentPage + 1) * listPerPages
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
              <tr key={i}>
                <td>{i + 1}</td>

                <td>
                  {item?.host_first_name
                    ? `${item?.host_first_name} ${item?.host_lost_name}`
                    : "#N/A"}
                </td>
                <td>{item?.post_code ?? "#N/A"}</td>
                <td>{item?.address ?? "#N/A"}</td>
                <td>{pipViewDate(item?.created_at) ?? "#N/A"}</td>

                <td>
                  <div className="d-flex align-items-center  gap-3">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(pageRoutes.editListingDetail, {
                          state: { data: item },
                        });
                      }}
                      className=" ct_orange_btn"
                    >
                      <i className="fa-solid fa-plus me-2"></i>Add
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

export default ListingPropertyTable;

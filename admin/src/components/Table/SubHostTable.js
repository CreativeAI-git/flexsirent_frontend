import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import NoRecord from "../../shared/components/others/NoRecord";
import TableHeader from "../../shared/components/Table/TableHeader";
import ReactPagination from "../../shared/components/Table/ReactPagination";
import PaginationDropdown from "../../shared/components/Table/PaginationDropdown";
import {
  fetchHostBusinessSubHosts,
  hostStatusUpdate,
} from "../../redux/actions/hostAction";

const SubHostTable = ({ data = [], tableHeading = [] }) => {
  const dispatch = useDispatch();
  const host_id = useLocation()?.state?.host_id || "";

  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const paginatedList = data?.slice(
    currentPage * listPerPages,
    (currentPage + 1) * listPerPages
  );

  const handlePageClick = (pageData) => {
    setCurrentPage(pageData?.selected);
  };

  const handleStatusUpdate = (item) => {
    const callback = (res) => {
      if (res?.success) {
        dispatch(fetchHostBusinessSubHosts({ payload: host_id }));
      }
    };

    dispatch(
      hostStatusUpdate({
        payload: {
          host_id: item?.host_id,
        },
        callback,
      })
    );
  };

  return (
    <>
      <div className="table-responsive ct_custom_table">
        <table className="table">
          <TableHeader data={tableHeading} />
          <tbody>
            {paginatedList?.map((item, i) => (
              <tr key={i}>
                <td>{i + 1 + currentPage * listPerPages}</td>
                <td>{item?.first_name || "#N/A"}</td>
                <td>{item?.last_name || "#N/A"}</td>
                <td>{item?.email ?? "#N/A"}</td>
                <td>{item?.phone ?? "#N/A"}</td>
                <td>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={item?.is_active}
                      onChange={() => handleStatusUpdate(item)}
                    />
                    <div className="toggle-switch-background">
                      <div className="toggle-switch-handle"></div>
                    </div>
                  </label>
                </td>

                {/* <td>
                  <div className="d-flex align-items-center gap-3">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(pageRoutes.propertyDetails, {
                          state: { data: item },
                        });
                      }}
                      className="ct_text_39A1FF"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </a>
                  </div>
                </td> */}
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

export default SubHostTable;

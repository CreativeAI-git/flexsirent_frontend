import { useState } from "react";
import { useDispatch } from "react-redux";
import { pageRoutes } from "../../routes/PageRoutes";
import { useLocation, useNavigate } from "react-router";
import NoRecord from "../../shared/components/others/NoRecord";
import TableHeader from "../../shared/components/Table/TableHeader";
import ReactPagination from "../../shared/components/Table/ReactPagination";
import { changeStatusColor, checkStatus, pipViewDate } from "../../utills/pip";
import PaginationDropdown from "../../shared/components/Table/PaginationDropdown";
import {
  fetchUsers,
  fetchBusinessUsers,
  businessStatusUpdate,
} from "../../redux/actions/userAction";

const UserTable = ({ data = [], tableHeading = [] }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user_id = useLocation()?.state?.id || "";
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
        if (pathname == pageRoutes?.businessDetails)
          dispatch(fetchBusinessUsers({ payload: { user_id } }));
        if (pathname == pageRoutes?.userManagement) {
          dispatch(fetchUsers());
        }
      }
    };

    dispatch(
      businessStatusUpdate({
        payload: {
          user_id: item?.id,
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
              <tr className={checkStatus(item?.is_active ?? "")}>
                <td>{i + 1}</td>
                <td>
                  <span className="ct_overlay_text">
                    {item?.first_name
                      ? `${item?.first_name} ${item?.last_name}`
                      : "#N/A"}
                  </span>
                </td>
                <td>{item?.email ?? "#N/A"}</td>
                <td>{item?.total_bookings ?? 0}</td>
                <td>{pipViewDate(item?.created_at) ?? "#N/A"}</td>
                <td>
                  <span
                    className={`${changeStatusColor(
                      item?.is_active ?? ""
                    )} ct_fw_600`}
                  >
                    {item?.is_active ? "Active" : "Blocked"}
                  </span>
                </td>
                <td>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={!item?.is_active}
                      onChange={() => handleStatusUpdate(item)}
                    />
                    <div className="toggle-switch-background">
                      <div className="toggle-switch-handle"></div>
                    </div>
                  </label>
                </td>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(pageRoutes.userDetails, {
                          state: { id: item?.id },
                        });
                      }}
                      className="ct_text_39A1FF"
                    >
                      <i className="fa-solid fa-eye fs-5"></i>
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

export default UserTable;

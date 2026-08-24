import { useState } from "react";
import { useDispatch } from "react-redux";
import { pipViewDate } from "../../utills/pip";
import { pageRoutes } from "../../routes/PageRoutes";
import { useLocation, useNavigate } from "react-router";
import NoRecord from "../../shared/components/others/NoRecord";
import TableHeader from "../../shared/components/Table/TableHeader";
import ReactPagination from "../../shared/components/Table/ReactPagination";
import PaginationDropdown from "../../shared/components/Table/PaginationDropdown";
import {
  fetchProperties,
  fetchHostProperties,
  propetyStatusUpdate,
} from "../../redux/actions/hostAction";

const PropertyTable = ({ data = [], tableHeading = [] }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
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

  const handleStatusUpdate = (item, updateStatus) => {
    const callback = (res) => {
      if (res?.success) {
        if (pathname == pageRoutes?.propertyManagement)
          dispatch(fetchProperties());
        if (pathname == pageRoutes?.hostDetails)
          dispatch(fetchHostProperties({ payload: { host_id } }));
      }
    };
    const data = {
      property_id: item?.property_id,
      status: updateStatus,
    };
    dispatch(propetyStatusUpdate({ payload: data, callback }));
  };

  return (
    <>
      <div className="table-responsive ct_custom_table">
        <table className="table">
          <TableHeader data={tableHeading} />
          <tbody>
            {paginatedList?.map((item, i) => (
              <tr key={item?.property_id || i}>
                <td>{i + 1 + currentPage * listPerPages}</td>
                <td>
                  <span className="ct_overlay_text">
                    {item?.property_title ?? "#N/A"}
                  </span>
                </td>
                <td>{item?.category_name ?? "#N/A"}</td>
                <td>
                  {item?.host_first_name
                    ? `${item?.host_first_name} ${item?.host_lost_name}`
                    : "#N/A"}
                </td>
                <td>{item?.property_booked_count ?? 0}</td>
                <td>{pipViewDate(item?.created_at) ?? "#N/A"}</td>
                <td>
                  <select
                    value={item?.status}
                    onChange={(e) => {
                      handleStatusUpdate(item, e.target.value);
                    }}
                    className="form-control ct_input ct_transparent_select ct_w_fit_content h-auto"
                    disabled={item?.status == 1 || item?.status == 2}
                  >
                    <option value="1">Approved</option>
                    <option value="0">Pending</option>
                    <option value="2">Rejected</option>
                  </select>
                </td>
                <td>
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

export default PropertyTable;

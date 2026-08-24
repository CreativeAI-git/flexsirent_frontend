import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pipViewDate } from "../../../shared/utils/pip";

import Loader from "../../../shared/components/loader";
import PanelLayout from "../../../shared/layout/PanelLayout";
import AddUserModal from "../../components/models/AddUserModal";
import NoRecord from "../../../shared/components/other/NoRecord";
import SearchInput from "../../../shared/components/form/SearchInput";
import TableHeader from "../../../shared/components/table/tableHeader";
import ReactPagination from "../../../shared/components/table/ReactPagination";
import PaginationDropdown from "../../../shared/components/table/PaginationDropdown";
import {
  fetchUsers,
  updateUserBlockStatus,
} from "../../../redux/features/business/actions/managementAction";
import EditUserModal from "../../components/models/EditUserModal";

const UserManagement = () => {
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const [activeUser,setActiveUser] = useState()
  const [isModal, setIsModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");
  const user = { name: "User Management", role: "guestBusiness" };
  const { isLoading, tableHeader, managementList } = useSelector(
    (state) => state.business.management
  );

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  const paginatedList = managementList
    ?.filter((item) => {
      const fullName = `${item?.first_name} ${item?.last_name}`;
      const search = searchFilter
        ? fullName?.toLowerCase()?.includes(searchFilter?.toLowerCase())
        : true;
      return search;
    })
    ?.slice(currentPage * listPerPages, (currentPage + 1) * listPerPages);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleStatusUpdate = (user_id) => {
    const callback = (res) => {
      if (res?.success) {
        dispatch(fetchUsers());
      }
    };
    dispatch(updateUserBlockStatus({ payload: { user_id }, callback }));
  };
  
  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout user={user}>
      <div className="d-flex align-items-center justify-content-end gap-3 ct_flex_col_575">
        <SearchInput
          value={searchFilter}
          onChange={setSearchFilter}
          placeholder="Search by first or last name"
        />

        <div className="ct_w_100_575">
          <button
            className="ct_orange_btn ct_w_100_575"
            onClick={() => {
              setIsModal(true);
            }}
          >
            + Add User
          </button>
        </div>
      </div>
      <div className="row ct_mt_40">
        <div className="col-md-12">
          <div className="table-responsive ct_custom_table">
            <table className="table ">
              <TableHeader data={tableHeader} />
              {paginatedList?.length > 0 && (
                <tbody>
                  {paginatedList?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.first_name || "#N/A"}</td>
                      <td>{item?.last_name || "#N/A"}</td>
                      <td>{item?.email || "#N/A"}</td>
                      <td>{item?.number_of_bookings || 0}</td>
                      <td>{pipViewDate(item?.created_at) || "#N/A"}</td>

                      <td>
                        <div className="">
                          <label className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={item?.is_blocked}
                              onChange={() => {
                                handleStatusUpdate(item?.id);
                              }}
                            />
                            <div className="toggle-switch-background">
                              <div className="toggle-switch-handle"></div>
                            </div>
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-3 justify-content-end">
                          <a
                            className="text-dark"
                            onClick={() => {
                              setActiveUser(item);
                              setIsEditModal(true);
                            }}
                          >
                            <i className="fa-regular fa-edit"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
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
                  pageCount={Math.ceil(managementList?.length / listPerPages)}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <!-- All Modal S --> */}
      <AddUserModal isModal={isModal} setIsModal={setIsModal} />
      <EditUserModal
        data={activeUser}
        isModal={isEditModal}
        setIsModal={setIsEditModal}
      />
    </PanelLayout>
  );
};

export default UserManagement;

import { useState } from "react";
import PanelLayout from "../../../shared/layout/PanelLayout";
import NoRecord from "../../../shared/components/other/NoRecord";
import StatusCol from "../../../shared/components/table/StatusCol";
import SearchInput from "../../../shared/components/form/SearchInput";
import useDebounce from "../../../shared/components/hooks/useDebounce";
import TableHeader from "../../../shared/components/table/tableHeader";
import EditSubUser from "../../components/pages/sub user access/EditSubUser";
import ReactPagination from "../../../shared/components/table/ReactPagination";
import PaginationDropdown from "../../../shared/components/table/PaginationDropdown";
import DeleteModal from "../../../host/components/modals/DeleteModal";
import AddSubUser from "../../components/pages/sub user access/AddSubUser";

const SubUserAccess = () => {
  const user = { name: "Sub User Access", role: "hostBusiness" };
  const [isViewModal, setIsViewModal] = useState(false);

  const [searchFilter, setSearchFilter] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);
  const payoutHeaders = [
    "S.No.",
    "Sub User",
    "Email",
    "Access Level",
    "Status",
    "Actions",
  ];
  const payoutList = [
    {
      sub_user_name: "Robert Decosta",
      email: "robert@mailinator.com",
      level: "Reservation Management",
      status: "Active",
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);

  const paginatedList = payoutList
    ?.filter((item) => {
      const search = item?.sub_user_name
        ?.toLowerCase()
        ?.includes(debouncedSearch?.toLowerCase());
      return search;
    })
    ?.slice(currentPage * listPerPages, (currentPage + 1) * listPerPages);

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  return (
    <PanelLayout user={user}>
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_575 mb-3">
            <SearchInput
              value={searchFilter}
              onChange={setSearchFilter}
              placeholder="Search by sub user"
            />
            <div>
              <button
                className="ct_orange_btn"
                data-bs-toggle="modal"
                data-bs-target="#ct_invite_subuser"
              >
                + Add Sub User
              </button>
            </div>
          </div>

          <div className="table-responsive  ct_custom_table">
            <table className="table ">
              <TableHeader data={payoutHeaders} />
              <tbody>
                {paginatedList?.length > 0 &&
                  paginatedList?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.sub_user_name}</td>
                      <td>{item?.email}</td>
                      <td>{item?.level}</td>

                      <td>
                        <StatusCol status={item?.status} type="userAccess" />
                      </td>
                      <td className="text-end">
                        <div className="d-flex align-items-center gap-3 justify-content-end">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                            className="text-dark"
                            data-bs-toggle="modal"
                            data-bs-target="#ct_edit_invite_subuser"
                          >
                            <i className="fa-solid fa-pencil"></i>
                          </a>

                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsViewModal(true);
                            }}
                            className="text-dark"
                          >
                            <i className="fa-solid fa-trash-can"></i>
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
                  pageCount={Math.ceil(payoutList?.length / listPerPages)}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <EditSubUser />

      {/* Add Modal */}
      <AddSubUser />

      {/* Delete  */}
      <DeleteModal
        isViewModal={isViewModal}
        setIsViewModal={setIsViewModal}
        heading="Delete Sub User"
        body="Are you sure you want to delete this sub user?"
      />
    </PanelLayout>
  );
};

export default SubUserAccess;

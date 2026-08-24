import { useState } from "react";
import { hostRoutes } from "../../routes";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import PanelLayout from "../../../shared/layout/PanelLayout";
import NoRecord from "../../../shared/components/other/NoRecord";
import SearchInput from "../../../shared/components/form/SearchInput";
import TableHeader from "../../../shared/components/table/tableHeader";
import SelectDropdown from "../../../shared/components/form/SelectDropdown";
import ReactPagination from "../../../shared/components/table/ReactPagination";
import PaginationDropdown from "../../../shared/components/table/PaginationDropdown";

const ReservationRequest = () => {
  const navigate = useLocalizedNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const user = { name: "Reservation Requests", role: "host" };

  const options = [
    { value: "Approved", label: "Approved" },
    { value: "Pending", label: "Pending" },
    { value: "Reject", label: "Reject" },
  ];
  const list = [
    {
      guest: "Robert Decosta",
      dates: "Jul 15–18",
      requestChange:
        "Change Dates: Jul 16–19 Add 1 Guest Extra Fee: ₹500 (Cleaning)",
      status: "Approved",
    },
  ];

  const revervationHeader = [
    "S.No.",
    "Guest Name",
    "Dates",
    "Requested Changes",
    "Status",
    "Action",
  ];

  const paginatedList = list
    ?.filter((item) => {
      const search = item?.guest
        ?.toLowerCase()
        ?.includes(searchFilter?.toLowerCase());
      return search;
    })
    ?.slice(currentPage * listPerPages, (currentPage + 1) * listPerPages);

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  return (
    <PanelLayout user={user}>
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="d-flex align-items-center justify-content-end gap-3 ct_flex_col_575">
            <SearchInput
              value={searchFilter}
              onChange={setSearchFilter}
              placeholder="Search by guest"
            />
            <SelectDropdown
              id="statusfilter"
              defaultOptions=""
              selectedValue={selectedValue}
              onChange={setSelectedValue}
              placeholder="Status"
              options={options}
            />
          </div>
          <div className="table-responsive mt-3 ct_custom_table">
            <table className="table ">
              <TableHeader data={revervationHeader} />
              <tbody>
                {paginatedList?.map((item, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{item?.guest ?? "#N/A"}</td>
                    <td>{item?.dates ?? "#N/A"}</td>
                    <td>
                      <span className="ct_overlay_text">
                        {item?.requestChange ?? "#N/A"}
                      </span>
                    </td>
                    <td>
                      <select className="ct_select_transparent ">
                        <option value="">Approved</option>
                        <option value="">Pending</option>
                        <option value="">Rejected</option>
                      </select>
                    </td>

                    <td>
                      <div className="d-flex align-items-center gap-3 justify-content-end">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(hostRoutes?.ReservationRequestDetails);
                          }}
                          className="text-dark"
                        >
                          <i className="fa-regular fa-eye"></i>
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
                  pageCount={Math.ceil(list?.length / listPerPages)}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </PanelLayout>
  );
};

export default ReservationRequest;

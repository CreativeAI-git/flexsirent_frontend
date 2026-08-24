import { useState } from "react";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { businessPath } from "../../routes";
import { curSym } from "../../../shared/utils/pip";
import PanelLayout from "../../../shared/layout/PanelLayout";
import NoRecord from "../../../shared/components/other/NoRecord";
import SearchInput from "../../../shared/components/form/SearchInput";
import TableHeader from "../../../shared/components/table/tableHeader";
import ReactPagination from "../../../shared/components/table/ReactPagination";
import PaginationDropdown from "../../../shared/components/table/PaginationDropdown";

const Contracts = () => {
  const navigate = useLocalizedNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");
  const contractsHeader = [
    "S.No.",
    "Title",
    "Client",
    "Country",
    "Total VAT",
    "Created On",
    "Status",
    "Action",
  ];
  const contractsList = [
    {
      title: "Vendor Agreement",
      client: "John Doe",
      country: "India",
      vat: "18,000",
      date: "08 May 2025",
      status: "Active",
    },
  ];

  const user = { name: "Contracts", role: "guestBusiness" };

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  const paginatedList = contractsList
    ?.filter((item) => {
      const search = item?.client
        ?.toLowerCase()
        ?.includes(searchFilter?.toLowerCase());
      return search;
    })
    ?.slice(currentPage * listPerPages, (currentPage + 1) * listPerPages);

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <PanelLayout user={user}>
      <div className="d-flex align-items-center justify-content-end gap-3 ct_flex_col_575">
        <SearchInput
          value={searchFilter}
          onChange={setSearchFilter}
          placeholder="Search by client"
        />
      </div>
      <div className="row ct_mt_40">
        <div className="col-md-12">
          <div className="table-responsive ct_custom_table">
            <table className="table ">
              <TableHeader data={contractsHeader} />
              {paginatedList?.length > 0 && (
                <tbody>
                  {paginatedList?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.title || "#N/A"}</td>
                      <td>{item?.client || "#N/A"}</td>
                      <td>{item?.country || "#N/A"}</td>
                      <td>
                        {curSym}
                        {item?.vat || 0}
                      </td>
                      <td>{item?.date || "#N/A"}</td>
                      <td>
                        <span className="ct_upcoming_clr">
                          {item?.status || "#N/A"}
                        </span>
                      </td>

                      <td>
                        <div className="d-flex align-items-center gap-3 justify-content-end">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(businessPath.ContractDetail);
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
                  pageCount={Math.ceil(contractsList?.length / listPerPages)}
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

export default Contracts;

import { useState } from "react";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { hostBusinessPaths } from "../../routes";
import { curSym } from "../../../shared/utils/pip";
import PanelLayout from "../../../shared/layout/PanelLayout";
import NoRecord from "../../../shared/components/other/NoRecord";
import SearchInput from "../../../shared/components/form/SearchInput";
import DeleteModal from "../../../host/components/modals/DeleteModal";
import TableHeader from "../../../shared/components/table/tableHeader";
import useDebounce from "../../../shared/components/hooks/useDebounce";
import ReactPagination from "../../../shared/components/table/ReactPagination";
import PaginationDropdown from "../../../shared/components/table/PaginationDropdown";

const PricingAvailability = () => {
  const navigate = useLocalizedNavigate();
  const user = { name: "Pricing & Availability", role: "hostBusiness" };
  const [isViewModal, setIsViewModal] = useState(false);

  const [searchFilter, setSearchFilter] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);
  const payoutHeaders = [
    "S.No.",
    "Date Range",
    "Base Price",
    "Availability",
    "Min Stay",
    "Max Stay",
    "Actions",
  ];
  const payoutList = [
    {
      range: "01–10 August 2025",
      price: "2500",
      available: "Available",
      min: "3",
      max: "10",
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);

  const paginatedList = payoutList
    ?.filter((item) => {
      const search = item?.price
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
              placeholder="Search by base price"
            />
            <div>
              <button
                className="ct_orange_btn"
                onClick={() => {
                  navigate(hostBusinessPaths.AddNewPricing);
                }}
              >
                + Add New Pricing
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
                      <td>{item?.range}</td>
                      <td>
                        {curSym}
                        {item?.price}
                      </td>
                      <td>{item?.available}</td>
                      <td>{item?.min}</td>
                      <td>{item?.max}</td>
                      <td className="text-end">
                        <div className="d-flex align-items-center gap-3 justify-content-end">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(hostBusinessPaths?.EditNewPricing)
                            }}
                            className="text-dark"
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

export default PricingAvailability;

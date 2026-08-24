import { useState } from "react";
import { hostBusinessPaths } from "../../../routes";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useLocation } from "react-router";
import NoRecord from "../../../../shared/components/other/NoRecord";
import StatusCol from "../../../../shared/components/table/StatusCol";
import TableHeader from "../../../../shared/components/table/tableHeader";
import ReactPagination from "../../../../shared/components/table/ReactPagination";
import PaginationDropdown from "../../../../shared/components/table/PaginationDropdown";

const BookingRequestsTable = ({ searchFilter = "" }) => {
  const bookingRequestHeaders = [
    "S.No.",
    "Guest",
    "Property Type",
    "Date",
    "Status",
    "Action",
  ];
  const requestlist = [
    {
      guest: "Robert Decosta",
      email: "robert@mailinator.com",
      property_type: "Home",
      date: "20 August, 2024",
      status: "Checked-In",
    },
  ];
  const navigate = useLocalizedNavigate();
  const { pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);

  const paginatedList = requestlist
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

  function tableBody() {
    return paginatedList?.map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item?.guest}</td>
        <td>{item?.property_type}</td>
        <td>{item?.date}</td>
        <td>
          <StatusCol status={item?.status} type="bookingStatus" />
        </td>
        <td className="text-end">
          <div className="d-flex align-items-center gap-3 justify-content-end">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate(hostBusinessPaths.BookingDetail);
              }}
              className="text-dark"
            >
              <i className="fa-regular fa-eye"></i>
            </a>
          </div>
        </td>
      </tr>
    ));
  }

  return (
    <>
      <div className="table-responsive  ct_custom_table">
        <table className="table ">
          <TableHeader data={bookingRequestHeaders} />
          <tbody>
            {pathname.includes(hostBusinessPaths?.Dashboard)
              ? tableBody()?.slice(0, 5)
              : tableBody()}
          </tbody>
        </table>
        {paginatedList?.length <= 0 && <NoRecord />}
      </div>

      {!pathname.includes(hostBusinessPaths?.Dashboard) && paginatedList?.length != 0 && (
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
              pageCount={Math.ceil(requestlist?.length / listPerPages)}
              onPageChange={handlePageClick}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BookingRequestsTable;

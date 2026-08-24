import { useState } from "react";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { curSym } from "../../../shared/utils/pip";
import PanelLayout from "../../../shared/layout/PanelLayout";
import NoRecord from "../../../shared/components/other/NoRecord";
import ActivityChart from "../../components/chart/ActivityChart";
import StatCards from "../../../shared/components/cards/StatCards";
import StatusCol from "../../../shared/components/table/StatusCol";
import SearchInput from "../../../shared/components/form/SearchInput";
import useDebounce from "../../../shared/components/hooks/useDebounce";
import TableHeader from "../../../shared/components/table/tableHeader";
import ReactPagination from "../../../shared/components/table/ReactPagination";
import PaginationDropdown from "../../../shared/components/table/PaginationDropdown";

const PayoutReports = () => {
  const user = { name: "Payout Reports", role: "hostBusiness" };
  const data = [
    {
      label: "Total Earnings",
      value: 91500,
      isSym: true,
    },
    {
      label: "Active Properties",
      value: 12,
    },
    {
      label: "Next Payout",
      value: 15250,
      isSym: true,
    },
    {
      label: "Payout Report",
      value: 15,
    },
  ];
  const [searchFilter, setSearchFilter] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);
  const payoutHeaders = [
    "S.No.",
    "Guest",
    "Property Name",
    "Date",
    "Amount",
    "Status",
  ];
  const payoutList = [
    {
      guest: "John D.",
      property_title: "Mountain Lodge",
      date: "20 August, 2024",
      amt: "2,800",
      status: "Paid",
    },
    {
      guest: "John D.",
      property_title: "Mountain Lodge",
      date: "20 August, 2024",
      amt: "2,800",
      status: "Pending",
    },
  ];
  const navigate = useLocalizedNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);

  const paginatedList = payoutList
    ?.filter((item) => {
      const search = item?.guest
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
      <StatCards data={data} />
      <div className="row mt-4">
        <div className="col-md-12">
          <ActivityChart />
          <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_575 mb-3">
            <h4 className="ct_fs_18 ct_fw_600 mb-0">Recent Transactions</h4>
            <SearchInput
              value={searchFilter}
              onChange={setSearchFilter}
              placeholder="Search by guest"
            />
          </div>

          <div className="table-responsive  ct_custom_table">
            <table className="table ">
              <TableHeader data={payoutHeaders} />
              <tbody>
                {paginatedList?.length > 0 &&
                  paginatedList?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.guest}</td>
                      <td>{item?.property_title}</td>
                      <td>{item?.date}</td>
                      <td>
                        {curSym}
                        {item?.amt}
                      </td>
                      <td className="text-end">
                        <StatusCol status={item?.status} type="bookingStatus" />
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
    </PanelLayout>
  );
};

export default PayoutReports;

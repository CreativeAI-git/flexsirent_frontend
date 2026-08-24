import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { businessPath } from "../../routes";
import { curSym, pipViewDate } from "../../../shared/utils/pip";
import Loader from "../../../shared/components/loader";
import PanelLayout from "../../../shared/layout/PanelLayout";
import NoRecord from "../../../shared/components/other/NoRecord";
import SearchInput from "../../../shared/components/form/SearchInput";
import TableHeader from "../../../shared/components/table/tableHeader";
import SelectDropdown from "../../../shared/components/form/SelectDropdown";
import ReactPagination from "../../../shared/components/table/ReactPagination";
import PaginationDropdown from "../../../shared/components/table/PaginationDropdown";
import { fetchPayments } from "../../../redux/features/business/actions/bookingAction";

const Payments = () => {
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedValue, setSelectedValue] = useState();
  const [selectedValue1, setSelectedValue1] = useState();
  const { isLoading, paymentsHeader, paymentsList, statusOpt, dayOpt } =
    useSelector((state) => state.business.booking);

  const user = { name: "Payments", role: "guestBusiness" };

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  const paginatedList = paymentsList
    ?.filter((item) => {
      const fullName = `${item?.host_first_name} ${item?.host_lost_name}`
      const search = fullName
        ?.toLowerCase()
        ?.includes(searchFilter?.toLowerCase());
      return search;
    })
    ?.slice(currentPage * listPerPages, (currentPage + 1) * listPerPages);

  useEffect(() => {
    dispatch(fetchPayments());
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout user={user}>
      <div className="d-flex align-items-center justify-content-end gap-3 ct_flex_col_575">
        <SearchInput
          value={searchFilter}
          onChange={setSearchFilter}
          placeholder="Search by host"
        />
        {/* <SelectDropdown
          id="statusfilter"
          defaultOptions=""
          options={statusOpt}
          selectedValue={selectedValue}
          onChange={setSelectedValue}
        />
        <SelectDropdown
          id="dayfilter"
          defaultOptions=""
          options={dayOpt}
          selectedValue={selectedValue1}
          onChange={setSelectedValue1}
        /> */}
      </div>
      <div className="row ct_mt_40">
        <div className="col-md-12">
          <div className="table-responsive ct_custom_table">
            <table className="table ">
              <TableHeader data={paymentsHeader} />
              {paginatedList?.length > 0 && (
                <tbody>
                  {paginatedList?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{`${item?.host_first_name} ${item?.host_lost_name}` || "#N/A"}</td>
                      <td>{`${item?.user_first_name} ${item?.user_last_name}` || "#N/A"}</td>
                      <td>
                        {curSym}
                        {item?.total_price || 0}
                      </td>
                      <td>{item?.payment_method || "#N/A"}</td>
                      <td>{pipViewDate(item?.created_at) || "#N/A"}</td>
                      <td>
                        <span className="ct_upcoming_clr">
                          {"Paid" || "#N/A"}
                        </span>
                      </td>

                      <td>
                        <div className="d-flex align-items-center gap-3 justify-content-end">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(businessPath.Invoices,{state:{data:item}});
                            }}
                            style={{ textDecoration: "underline" }}
                          >
                            View invoice
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
                  pageCount={Math.ceil(paymentsList?.length / listPerPages)}
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

export default Payments;

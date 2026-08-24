import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getSubstring, pipViewDate } from "../../utills/pip";
import Loader from "../../components/form/Loader";
import { pageRoutes } from "../../routes/PageRoutes";
import SubHeader from "../../shared/layout/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import SearchInput from "../../components/form/SearchInput";
import useDebounce from "../../components/hooks/useDebounce";
import ReportModal from "../../components/modal/ReportModal";
import NoRecord from "../../shared/components/others/NoRecord";
import TableHeader from "../../shared/components/Table/TableHeader";
import { fetchReports } from "../../redux/actions/serviceFeeAction";
import ReactPagination from "../../shared/components/Table/ReactPagination";
import PaginationDropdown from "../../shared/components/Table/PaginationDropdown";

const ReportManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchFilter, setSearchFilter] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);
  const { reportHeader, reportList, isLoading } = useSelector(
    (state) => state?.serviceFeeReducers,
  );

  const [data,setData] = useState()
  const [isViewModal, setIsViewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);

  const paginatedList = reportList
    ?.filter((item) => {
      const search = debouncedSearch
        ? item?.property_title
            ?.toLowerCase()
            ?.includes(debouncedSearch?.toLowerCase())
        : true;
      return search;
    })
    ?.slice(currentPage * listPerPages, (currentPage + 1) * listPerPages);

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  useEffect(() => {
    dispatch(fetchReports());
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout>
      <SubHeader label="Report Management" />

      <div class="d-flex align-items-center justify-content-end gap-3 ct_flex_col_767 pb-4">
        <SearchInput
          value={searchFilter}
          onChange={setSearchFilter}
          placeholder="Search by property title"
        />
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive ct_custom_table">
            <table className="table">
              <TableHeader data={reportHeader} />
              <tbody>
                {paginatedList?.map((item, i) => (
                  <tr>
                    <td>{i + 1}</td>

                    <td>{item?.property_title ?? "#N/A"}</td>
                    <td>
                      {`${item?.first_name} ${item?.last_name}` ?? "#N/A"}
                    </td>
                    <td>
                      <span className="ct_overlay_text">
                        {item?.report_title ?? "#N/A"}
                      </span>
                    </td>
                    <td>{getSubstring(item?.description) ?? "#N/A"}</td>
                    <td>{pipViewDate(item?.created_at) ?? "#N/A"}</td>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setData(item)
                            setIsViewModal(true)
                            // navigate(pageRoutes.reportDetail);
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
          {paginatedList?.length != 0 && (
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
                  pageCount={Math.ceil(reportList?.length / listPerPages)}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <ReportModal
        data={data}
        isViewModal={isViewModal}
        setIsViewModal={setIsViewModal}
      />
    </PanelLayout>
  );
};

export default ReportManagement;

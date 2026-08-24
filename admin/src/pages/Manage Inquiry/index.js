import { useEffect, useState } from "react";
import Loader from "../../components/form/Loader";
import { useDispatch, useSelector } from "react-redux";
import SubHeader from "../../shared/layout/SubHeader";
import PanelLayout from "../../shared/layout/PanelLayout";
import SearchInput from "../../components/form/SearchInput";
import useDebounce from "../../components/hooks/useDebounce";
import { getSubstring, pipViewDate } from "../../utills/pip";
import NoRecord from "../../shared/components/others/NoRecord";
import TableHeader from "../../shared/components/Table/TableHeader";
import { fetchInquiries } from "../../redux/actions/serviceFeeAction";
import ViewInquiryModal from "../../components/modal/ViewInquiryModal";
import ReactPagination from "../../shared/components/Table/ReactPagination";
import PaginationDropdown from "../../shared/components/Table/PaginationDropdown";

const ManageInquiry = () => {
  const dispatch = useDispatch();
  const [searchFilter, setSearchFilter] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);
  const [isDetailModal, setIsDetailModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState({});
  const { isLoading, inquiryHeader, inquiryList } = useSelector(
    (state) => state?.serviceFeeReducers,
  );

  const getPropertyTitle = (item = {}) => {
    return (
      item?.property_title || item?.property_name || item?.property || "#N/A"
    );
  };


  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);

  const filteredList =
    inquiryList?.filter((item) => {
      const searchText =
        `${item?.user_name} ${getPropertyTitle(item)} ${item?.email || ""}`.toLowerCase();
      return debouncedSearch
        ? searchText.includes(debouncedSearch?.toLowerCase())
        : true;
    }) || [];

  const paginatedList = filteredList?.slice(
    currentPage * listPerPages,
    (currentPage + 1) * listPerPages,
  );

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  useEffect(() => {
    dispatch(fetchInquiries());
  }, []);

  if (isLoading) return <Loader />;

  return (
    <PanelLayout>
      <SubHeader label="Manage Inquiry" />

      <div class="d-flex align-items-center justify-content-end gap-3 ct_flex_col_767 pb-4">
        <SearchInput
          value={searchFilter}
          onChange={setSearchFilter}
          placeholder="Search by user name, email, property title"
        />
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive ct_custom_table">
            <table className="table">
              <TableHeader data={inquiryHeader} />
              <tbody>
                {paginatedList?.map((item, i) => (
                  <tr >
                    <td>{currentPage * listPerPages + i + 1}</td>

                    <td>{item?.user_name || "#N/A"}</td>
                    <td>{item?.email || "#N/A"}</td>
                    <td>{item?.property_title || "#N/A"}</td>
                    <td>{getSubstring(item?.message) || "#N/A"}</td>
                    <td>{pipViewDate(item?.created_at) || "#N/A"}</td>
                  
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedInquiry(item);
                            setIsDetailModal(true);
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
                  pageCount={Math.ceil(filteredList?.length / listPerPages)}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <ViewInquiryModal
        isViewModal={isDetailModal}
        setIsViewModal={setIsDetailModal}
        data={selectedInquiry}
      />
    </PanelLayout>
  );
};

export default ManageInquiry;

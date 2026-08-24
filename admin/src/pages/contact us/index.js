import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { pipViewDate } from "../../utills/pip";
import Loader from "../../components/form/Loader";
import { pageRoutes } from "../../routes/PageRoutes";
import { useSelector, useDispatch } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import SearchInput from "../../components/form/SearchInput";
import useDebounce from "../../components/hooks/useDebounce";
import NoRecord from "../../shared/components/others/NoRecord";
import { fetchContactUs } from "../../redux/actions/hostAction";
import TableHeader from "../../shared/components/Table/TableHeader";
import ReactPagination from "../../shared/components/Table/ReactPagination";
import PaginationDropdown from "../../shared/components/Table/PaginationDropdown";
const ContactUs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { contactHeaders, queryList, isLoading } = useSelector(
    (state) => state.hostReducers
  );

  const [searchFilter, setSearchFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);

  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);

  const paginatedList = queryList?.filter((item) => {
    const search = item?.name
      ?.toLowerCase()
      ?.includes(debouncedSearch?.toLowerCase());
    const status = selectedValue ? item?.status == selectedValue : true;
    const dateMatch = selectedDate
      ? item?.created_at?.slice(0, 10) === selectedDate
      : true;
    return search && status && dateMatch;
  })?.slice(
    currentPage * listPerPages,
    (currentPage + 1) * listPerPages
  );

  const handlePageClick = (pageData) => {
    setCurrentPage(pageData?.selected);
  };

  useEffect(() => {
    dispatch(fetchContactUs());
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout>
      <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_575 pb-4">
        <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_black_text">Contact Us</h4>
      </div>
      <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 pb-4">
        <SearchInput
          value={searchFilter}
          onChange={setSearchFilter}
          placeholder="Search by name"
        />
        <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 ct_w_100_767">
          <div className="form-group ct_w_100_767">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]} 
              className="form-control ct_input ct_light_blue_input_border ct_input_h_50"
            />
          </div>

        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive ct_custom_table">
            <table className="table">
              <TableHeader data={contactHeaders} />
              <tbody>
                {paginatedList?.map((item, i) => (
                  <tr key={item?.property_id || i}>
                    <td>{i + 1 + currentPage * listPerPages}</td>
                    <td>
                      <span className="ct_overlay_text">
                        {item?.name || "#N/A"}
                      </span>
                    </td>
                    <td>
                      <span className="ct_overlay_text">
                        {item?.email || "#N/A"}
                      </span>
                    </td>
                    <td>
                      <span className="ct_overlay_text">
                        {item?.message || "#N/A"}
                      </span>
                    </td>
                    <td>{pipViewDate(item?.created_at) || "#N/A"}</td>

                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(pageRoutes.contactUsDetails, {
                              state: { data: item },
                            });
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

          {queryList?.length > 0 && (
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
                  pageCount={Math.ceil(queryList.length / listPerPages)}
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

export default ContactUs;

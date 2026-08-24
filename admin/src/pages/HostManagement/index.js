import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { pageRoutes } from "../../routes/PageRoutes";
import { useSelector, useDispatch } from "react-redux";
import { checkStatus, pipViewDate } from "../../utills/pip";
import { fetchHosts, hostStatusUpdate } from "../../redux/actions/hostAction";

import Loader from "../../components/form/Loader";
import PanelLayout from "../../shared/layout/PanelLayout";
import SearchInput from "../../components/form/SearchInput";
import useDebounce from "../../components/hooks/useDebounce";
import NoRecord from "../../shared/components/others/NoRecord";
import SelectDropdown from "../../components/form/SelectDropdown";
import TableHeader from "../../shared/components/Table/TableHeader";
import AccountActionModal from "../../components/modal/AccountActionModal";
import ReactPagination from "../../shared/components/Table/ReactPagination";
import PaginationDropdown from "../../shared/components/Table/PaginationDropdown";

const HostManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);

  const [isSubmit, setIsSubmit] = useState(false)
  const [isViewModal, setIsViewModal] = useState(false);

  const { hostTableHeading, hostList, filterOption, isLoading } = useSelector(
    (state) => state.hostReducers
  );

  const paginatedList = hostList
    ?.filter((item) => {
      const fullName = `${item?.first_name} ${item?.last_name}`;
      const search = fullName
        ?.toLowerCase()
        ?.includes(debouncedSearch?.toLowerCase());
      const status = selectedValue ? item?.is_active == selectedValue : true;
      const dateMatch = selectedDate
        ? item?.created_at?.slice(0, 10) === selectedDate
        : true;
      return search && status && dateMatch;
    })
    ?.slice(currentPage * listPerPages, (currentPage + 1) * listPerPages);

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  useEffect(() => {
    dispatch(fetchHosts());
  }, []);

  const handleStatusUpdate = (item) => {
    setIsSubmit(true)
    const callback = (res) => {
      setIsSubmit(false)
      if (res?.success) {
        dispatch(fetchHosts());
      }
    };

    dispatch(
      hostStatusUpdate({
        payload: {
          host_id: item?.host_id,
        },
        callback,
      })
    );
  };

  if (isLoading) {
    return <Loader />
  }
  return (
    <PanelLayout>
      <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_575 pb-4">
        <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_black_text">
          Host Management
        </h4>
        <div className="ct_w_100_575">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsViewModal(true);
            }}
            className="ct_orange_btn"
          >
            + Add Host
          </a>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 pb-4">
        <SearchInput
          value={searchFilter}
          onChange={setSearchFilter}
          placeholder="Search by host name"
        />
        <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 ct_w_100_767">
          <div className="form-group ct_w_100_767">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="form-control ct_input ct_light_blue_input_border ct_input_h_50"
            />
          </div>
          <div className="form-group ct_w_100_767">
            <SelectDropdown
              id="statusfilter"
              defaultOptions=""
              options={filterOption}
              selectedValue={selectedValue}
              onChange={setSelectedValue}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive ct_custom_table">
            <table className="table">
              <TableHeader data={hostTableHeading} />
              <tbody>
                {paginatedList?.map((item, i) => (
                  <tr className={checkStatus(item?.status ?? "")}>
                    <td>{i + 1}</td>
                    <td>
                      {item?.first_name
                        ? `${item?.first_name} ${item?.last_name}`
                        : "#N/A"}
                    </td>
                    <td>
                      <span className="ct_overlay_text">
                        {item?.email || "#N/A"}
                      </span>
                    </td>
                    <td>{item?.approved_property_count || 0}</td>
                    <td>{pipViewDate(item?.created_at) ?? "#N/A"}</td>
                    <td>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          disabled={isSubmit}
                          checked={item?.is_active}
                          onChange={() => handleStatusUpdate(item)}
                        />
                        <div className="toggle-switch-background">
                          <div className="toggle-switch-handle"></div>
                        </div>
                      </label>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(pageRoutes.hostDetails, {
                              state: { host_id: item?.host_id },
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
                  pageCount={Math.ceil(hostList?.length / listPerPages)}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <AccountActionModal title={"Add Host"} isViewModal={isViewModal} setIsViewModal={setIsViewModal} />

    </PanelLayout>
  );
};

export default HostManagement;
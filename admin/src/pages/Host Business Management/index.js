import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { checkStatus } from "../../utills/pip";
import { pageRoutes } from "../../routes/PageRoutes";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchhostBusiness,
  hostStatusUpdate,
} from "../../redux/actions/hostAction";

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

const HostBusinessManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);
  
  const [isSubmit, setIsSubmit] = useState(false);
  const [isViewModal, setIsViewModal] = useState(false);

  const { hostBusinessHeader, hostBusinessList, filterOption, isLoading } =
    useSelector((state) => state.hostReducers);

  const paginatedList = hostBusinessList
    ?.filter((item) => {
      const fullName = `${item?.first_name} ${item?.last_name}`;
      const search = fullName
        ?.toLowerCase()
        ?.includes(debouncedSearch?.toLowerCase());
      const status = selectedValue ? item?.is_active == selectedValue : true;

      return search && status;
    })
    ?.slice(currentPage * listPerPages, (currentPage + 1) * listPerPages);

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  useEffect(() => {
    dispatch(fetchhostBusiness());
  }, []);

    const handleStatusUpdate = (item) => {
      setIsSubmit(true)
      const callback = (res) => {
        setIsSubmit(false)
        if (res?.success) {
          dispatch(fetchhostBusiness());
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
    return <Loader />;
  }
  return (
    <PanelLayout>
      <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_575 pb-4">
        <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_black_text">
          Host Business Management
        </h4>
      </div>
      <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 pb-4">
        <SearchInput
          value={searchFilter}
          onChange={setSearchFilter}
          placeholder="Search by first or last name"
        />
        <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 ct_w_100_767">
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
              <TableHeader data={hostBusinessHeader} />
              <tbody>
                {paginatedList?.map((item, i) => (
                  <tr className={checkStatus(item?.status ?? "")}>
                    <td>{i + 1}</td>
                    <td>{item?.first_name || "#N/A"}</td>
                    <td>{item?.last_name || "#N/A"}</td>

                    <td>{item?.email || "#N/A"}</td>
                    <td>{item?.phone || "#N/A"}</td>
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
                            navigate(pageRoutes.hostBusinessDetails, {
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
                  pageCount={Math.ceil(hostBusinessList?.length / listPerPages)}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <AccountActionModal
        title={"Add Host"}
        isViewModal={isViewModal}
        setIsViewModal={setIsViewModal}
      />
    </PanelLayout>
  );
};

export default HostBusinessManagement;

import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Loader from "../../components/form/Loader";
import { pageRoutes } from "../../routes/PageRoutes";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import SearchInput from "../../components/form/SearchInput";
import useDebounce from "../../components/hooks/useDebounce";
import NoRecord from "../../shared/components/others/NoRecord";
import TableHeader from "../../shared/components/Table/TableHeader";
import AccountActionModal from "../../components/modal/AccountActionModal";
import ReactPagination from "../../shared/components/Table/ReactPagination";
import PaginationDropdown from "../../shared/components/Table/PaginationDropdown";
import {
  businessStatusUpdate,
  fetchBusiness,
} from "../../redux/actions/userAction";

const BusinessManagment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { businessTableHeading, businessList, isLoading } = useSelector(
    (state) => state.userReducers
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);

  const [isSubmit, setIsSubmit] = useState(false);
  const [isViewModal, setIsViewModal] = useState(false);

  const paginatedList = businessList
    ?.filter((item) => {
      const search = debouncedSearch
        ? item?.business_name
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
    dispatch(fetchBusiness());
  }, []);

  const handleStatusUpdate = (item) => {
    setIsSubmit(true);
    const callback = (res) => {
      setIsSubmit(false);
      if (res?.success) {
        dispatch(fetchBusiness());
      }
    };

    dispatch(
      businessStatusUpdate({
        payload: {
          user_id: item?.id,
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
          Business Management
        </h4>
        <div className="ct_w_100_575">
          <a
            href="#"
            className="ct_orange_btn"
            onClick={(e) => {
              e.preventDefault();
              setIsViewModal(true);
            }}
          >
            + Add Business
          </a>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 pb-4">
        <SearchInput
          value={searchFilter}
          onChange={setSearchFilter}
          placeholder="Search by business name"
        />
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive ct_custom_table">
            <table className="table">
              <TableHeader data={businessTableHeading} />
              <tbody>
                {paginatedList?.map((item, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                      <span className="ct_overlay_text">
                        {item?.business_name || "#N/A"}
                      </span>
                    </td>
                    <td>
                      {item?.first_name
                        ? `${item?.first_name} ${item?.last_name}`
                        : "#N/A"}
                    </td>
                    <td>{item?.country || "#N/A"}</td>
                    <td>{item?.total_user || 0}</td>
                    <td>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={item?.is_active}
                          disabled={isSubmit}
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
                            navigate(pageRoutes.businessDetails, {
                              state: { id: item?.id },
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
                  pageCount={Math.ceil(businessList?.length / listPerPages)}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <AccountActionModal title={"Add Business"} isViewModal={isViewModal} setIsViewModal={setIsViewModal} />
    </PanelLayout>
  );
};

export default BusinessManagment;

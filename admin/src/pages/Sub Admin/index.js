import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Loader from "../../components/form/Loader";
import { pageRoutes } from "../../routes/PageRoutes";
import SubHeader from "../../shared/layout/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import SearchInput from "../../components/form/SearchInput";
import useDebounce from "../../components/hooks/useDebounce";
import DeleteModal from "../../components/modal/DeleteModal";
import NoRecord from "../../shared/components/others/NoRecord";
import TableHeader from "../../shared/components/Table/TableHeader";
import ReactPagination from "../../shared/components/Table/ReactPagination";
import PaginationDropdown from "../../shared/components/Table/PaginationDropdown";
import {
  fetchCardData,
  fetchSubAdmins,
  subAdminStatusUpdate,
} from "../../redux/actions/subAdminAction";

const SubAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");
  const [isViewModal, setIsViewModal] = useState(false);
  const debouncedSearch = useDebounce(searchFilter, 500);
  const { tableHeader, list, isLoading ,cardDetails} = useSelector(
    (state) => state.subAdminReducers
  );


  const paginatedList = list
    ?.filter((item) => {
      const search = item?.full_name
        ?.toLowerCase()
        ?.includes(debouncedSearch?.toLowerCase());
      const type = filterType ? item?.is_active == filterType : true;
      return search && type;
    })
    ?.slice(currentPage * listPerPages, (currentPage + 1) * listPerPages);

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  useEffect(() => {
    dispatch(fetchSubAdmins());
    dispatch(fetchCardData());
  }, []);

  const handleStatusUpdate = (item) => {
    const callback = (res) => {
      if (res?.success) {
        dispatch(fetchSubAdmins());
      }
    };
    const data = {
      sub_admin_id: item?.admin_id,
    };
    dispatch(subAdminStatusUpdate({ payload: data, callback }));
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout>
      <SubHeader
        label="Sub Admin"
        isBtn={true}
        btnRoute={pageRoutes.addSubAdmin}
        btnName="+Add Sub Admin"
      />
      <div class="row">
        <div class="col-xxl-3 col-lg-6 col-md-6 mb-4">
          <div class="ct_dash_card">
            <div class="ct_card_title">
              <h6 class="ct_fs_16 mb-2 ct_black_text ct_text_op_07">
                Total Sub Admin
              </h6>
              <h4 class="mb-0 ct_fs_28 ct_fw_700">{cardDetails?.total_sub_admin || "0"}</h4>
            </div>
          </div>
        </div>
        <div class="col-xxl-3 col-lg-6 col-md-6 mb-4">
          <div class="ct_dash_card">
            <div class="ct_card_title">
              <h6 class="ct_fs_16 mb-2 ct_black_text ct_text_op_07">
                Active Sub Admins
              </h6>
              <h4 class="mb-0 ct_fs_28 ct_fw_700">{cardDetails?.total_active || "0"}</h4>
            </div>
          </div>
        </div>
        <div class="col-xxl-3 col-lg-6 col-md-6 mb-4">
          <div class="ct_dash_card">
            <div class="ct_card_title">
              <h6 class="ct_fs_16 mb-2 ct_black_text ct_text_op_07">
                Pending Invites
              </h6>
              <h4 class="mb-0 ct_fs_28 ct_fw_700">{cardDetails?.total_pending || "0"}</h4>
            </div>
           
          </div>
        </div>
        <div class="col-xxl-3 col-lg-6 col-md-6 mb-4">
          <div class="ct_dash_card">
             <div class="ct_card_title">
              <h6 class="ct_fs_16 mb-2 ct_black_text ct_text_op_07">
                Blocked Sub Admins
              </h6>
              <h4 class="mb-0 ct_fs_28 ct_fw_700">{cardDetails?.total_deactive || "0"}</h4>
            </div>
           
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 pb-4">
        <SearchInput
          value={searchFilter}
          onChange={setSearchFilter}
          placeholder="Search by name"
        />
        <div class="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 ct_w_100_767">
          <div class="form-group ct_w_100_767">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              class="form-control ct_input ct_input_h_50 ct_light_blue_input_border"
            >
              <option value="">All</option>
              <option value={1}>Active</option>
              <option value={0}>Blocked</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive ct_custom_table">
            <table className="table">
              <TableHeader data={tableHeader} />
              <tbody>
                {paginatedList?.map((item, i) => (
                  <tr>
                    <td>{i + 1}</td>

                    <td>{item?.full_name ?? "#N/A"}</td>
                    <td>{item?.email ?? "#N/A"}</td>
                    <td>{item?.mobile ?? "#N/A"}</td>

                    <td>
                      <label class="toggle-switch">
                        <input
                          type="checkbox"
                          checked={item?.is_active}
                          onChange={() => handleStatusUpdate(item)}
                        />
                        <div class="toggle-switch-background">
                          <div class="toggle-switch-handle"></div>
                        </div>
                      </label>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(pageRoutes.subAdminDetail, {
                              state: { data: item },
                            });
                          }}
                          className="ct_text_39A1FF"
                        >
                          <i className="fa-solid fa-eye fs-5"></i>
                        </a>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(pageRoutes.editSubAdminDetail, {
                              state: { data: item },
                            });
                          }}
                          className="text-dark"
                        >
                          <i className="fa-solid fa-pencil fs-5"></i>
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
                  pageCount={Math.ceil(list?.length / listPerPages)}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <DeleteModal
        isViewModal={isViewModal}
        setIsViewModal={setIsViewModal}
        heading="Delete Sub Admin"
        value="Are you sure you want to delete this sub admin?"
      />
    </PanelLayout>
  );
};

export default SubAdmin;

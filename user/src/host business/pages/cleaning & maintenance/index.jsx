import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../shared/components/loader";
import PanelLayout from "../../../shared/layout/PanelLayout";
import NoRecord from "../../../shared/components/other/NoRecord";
import SearchInput from "../../../shared/components/form/SearchInput";
import DeleteModal from "../../../host/components/modals/DeleteModal";
import useDebounce from "../../../shared/components/hooks/useDebounce";
import ReactPagination from "../../../shared/components/table/ReactPagination";
import PaginationDropdown from "../../../shared/components/table/PaginationDropdown";
import {
  fetchCliningManage,
  updateCleaningStatus,
} from "../../../redux/features/host/actions/bookingAction";

const CleaningMaintenance = () => {
  const dispatch = useDispatch();
  const [isViewModal, setIsViewModal] = useState(false);
  const user = { name: "Cleaning & Maintenance", role: "hostBusiness" };
  const { isLoading, cleaningList, filterOption } = useSelector(
    (state) => state?.host?.booking,
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);

  const paginatedList = cleaningList
    ?.filter((item) => {
      const search = item?.property_title
        ?.toLowerCase()
        ?.includes(debouncedSearch?.toLowerCase());
      const status = typeFilter ? item?.cleaning_status == typeFilter : true;
      return search && status;
    })
    ?.slice(currentPage * listPerPages, (currentPage + 1) * listPerPages);

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  useEffect(() => {
    dispatch(fetchCliningManage());
  }, [dispatch]);

  const handleStatus = (property_id, cleaning_status) => {
    const callback = (res) => {
      if (res?.success) {
        dispatch(fetchCliningManage());
      }
    };

    dispatch(
      updateCleaningStatus({
        payload: { property_id, cleaning_status },
        callback,
      }),
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout user={user}>
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="d-flex align-items-center justify-content-end gap-3 ct_flex_col_575">
            <SearchInput
              value={searchFilter}
              onChange={setSearchFilter}
              placeholder="Search by property name"
            />
            <div className="form-group ct_w_100_575">
              <select
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                }}
                value={typeFilter}
                className="form-control ct_input ct_input_h_50 ct_light_blue_input_border"
              >
                <option value="">All</option>
                {filterOption?.map((item, ind) => (
                  <option key={ind} value={item?.value}>
                    {item?.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="table-responsive mt-3 ct_offers_table">
            <table className="table">
              {paginatedList?.length > 0 &&
                paginatedList?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <h5
                        className="ct_fs_18 ct_fw_500 mb-0 d-flex align-items-center gap-2 ct_white_space_nowrap ct_minimise_cnt"
                        style={{ width: "350px" }}
                      >
                        <img
                          loading="lazy"
                          src="https://app.flexsirent.com/admin/assets/img/house_icon.svg"
                          alt=""
                        />
                        {item?.property_title || "#N/A"}
                      </h5>
                    </td>

                    <td className="text-end" style={{ verticalAlign: "start" }}>
                      <div className="text-end d-flex justify-content-end">
                        <div className="form-group ct_w_100_575">
                          <select
                            value={item?.cleaning_status}
                            onChange={(e) => {
                              handleStatus(item?.property_id, e.target.value);
                            }}
                            className="form-control ct_input ct_input_h_50 ct_light_blue_input_border w-auto"
                          >
                            {filterOption?.map((option, ind) => (
                              <option key={ind} value={option?.value}>
                                {option?.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
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
                  pageCount={Math.ceil(cleaningList?.length / listPerPages)}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className="modal fade modal-lg"
        id="ct_add_maintanance"
        tabIndex="-1"
        aria-labelledby="ct_add_maintananceLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h1 className="modal-title fs-5" id="ct_add_maintananceLabel">
                Add Maintenance
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body pb-4">
              <form action="">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group mb-4">
                      <label className="mb-2">Property Name</label>
                      <select className="form-control ct_input ct_input_h_40">
                        <option value="reservation">Property Name</option>
                        <option value="cleaning">Property Name</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group mb-4">
                      <label className="mb-2">Status</label>
                      <select className="form-control ct_input ct_input_h_40">
                        <option value="reservation">In Cleaning</option>
                        <option value="cleaning">Mark As Ready</option>
                        <option value="cleaning">Under Maintenance</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <button type="button" className="ct_orange_btn ms-auto">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal
        isViewModal={isViewModal}
        setIsViewModal={setIsViewModal}
        heading="Delete Sub User"
        body="Are you sure you want to delete this sub user?"
      />
    </PanelLayout>
  );
};

export default CleaningMaintenance;

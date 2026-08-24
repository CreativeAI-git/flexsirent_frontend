import { useEffect, useState } from "react";
import Loader from "../../components/form/Loader";
import { pipViewDateTime } from "../../utills/pip";
import SubHeader from "../../shared/layout/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import StatusCol from "../../components/Table/StatusCol";
import PanelLayout from "../../shared/layout/PanelLayout";
import InboxModal from "../../components/modal/InboxModal";
import NoRecord from "../../shared/components/others/NoRecord";
import { fetchSupports } from "../../redux/actions/supportAction";
import SelectDropdown from "../../components/form/SelectDropdown";
import TableHeader from "../../shared/components/Table/TableHeader";
import { setSuppoortDetail } from "../../redux/reducers/supportReducers";
import ReactPagination from "../../shared/components/Table/ReactPagination";
import PaginationDropdown from "../../shared/components/Table/PaginationDropdown";

const Support = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    supportsList,
    filterOption,
    userOrHostHeader,
    userBookingSupportHeader,
  } = useSelector((state) => state.supportReducers);
  const tabs = [
    {
      label: "Guest Queries",
      value: "userQuery",
    },
    {
      label: "Host Queries",
      value: "hostQuery",
    },
  ];
  const userTabs = [
    {
      label: "Booking",
      value: "booking",
    },
    {
      label: "Other",
      value: "other",
    },
  ];
  const [dateFilter, setDateFilter] = useState("");
  const [activeTab, setActiveTab] = useState(tabs[0]?.value);
  const [filterType, setFilterType] = useState(userTabs[0]?.value);
  const [isViewModal2, setIsViewModal2] = useState(false);
  const tableHeader =
    activeTab == tabs[1]?.value ||
    (activeTab == tabs[0]?.value && filterType == userTabs[1].value)
      ? userOrHostHeader
      : userBookingSupportHeader;

  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);

  const paginatedList = supportsList[activeTab]
    ?.filter((item) => {
      const filter =
        filterType === userTabs[0].value
          ? item?.property_id && item?.property_id !== 0
          : filterType === userTabs[1].value
          ? item?.property_id === 0
          : true;

      const dateMatch = dateFilter
        ? new Date(item?.created_at).toISOString().split("T")[0] === dateFilter
        : true;

      return dateMatch && filter;
    })
    ?.slice(currentPage * listPerPages, (currentPage + 1) * listPerPages);

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  useEffect(() => {
    dispatch(fetchSupports());
  }, []);

  useEffect(() => {
    if (activeTab == tabs[0].value) {
      setFilterType(userTabs[0].value);
    } else {
      setFilterType("");
    }
    setDateFilter("");
  }, [activeTab]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout>
      <SubHeader label="Support Tickets" />
      <div class="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767  pb-4">
        <ul className="nav nav-pills mb-3 ct_custom_tabs d-flex  justify-content-start mb-0 ct_flex_col_767 ct_w_100_767">
          {tabs?.map((item, ind) => {
            return (
              <li
                key={ind}
                className={`nav-item ct_w_100_767 ${
                  item?.value == activeTab ? "active" : ""
                }`}
              >
                <button
                  className={`nav-link ct_fw_500 ct_w_100_767 ${
                    item?.value == activeTab ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => {
                    setActiveTab(item?.value);
                  }}
                >
                  {item?.label}
                </button>
              </li>
            );
          })}
        </ul>

        <div class="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 ct_w_100_767">
          {activeTab == tabs[0].value && (
            <SelectDropdown
              divClass="form-group ct_w_100_575 ct_w_100_767 "
              className="form-control ct_input ct_input_h_50 ct_light_blue_input_border ct_w_100_767"
              id="statusfilter"
              defaultOptions=""
              options={filterOption}
              selectedValue={filterType}
              onChange={setFilterType}
            />
          )}
          <div class="form-group ct_w_100_767">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              class="form-control ct_input ct_input_h_50 ct_light_blue_input_border"
            />
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
                    {filterType == userTabs[0].value &&
                      activeTab == tabs[0].value && (
                        <td>{item?.property_title ?? "#N/A"}</td>
                      )}

                    <td>
                      <span className="ct_overlay_text">
                        {item?.message ?? "#N/A"}
                      </span>
                    </td>

                    <td>{pipViewDateTime(item?.created_at) ?? "#N/A"}</td>

                    <StatusCol status={item?.status} type="support" />

                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(setSuppoortDetail({ ...item, activeTab }));
                            setIsViewModal2(true);
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
                  pageCount={Math.ceil(
                    supportsList[activeTab]?.length / listPerPages
                  )}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <InboxModal
        title={activeTab == tabs[0]?.value ? "Guest Query" : "Host Query"}
        isViewModal={isViewModal2}
        setIsViewModal={setIsViewModal2}
      />
    </PanelLayout>
  );
};

export default Support;

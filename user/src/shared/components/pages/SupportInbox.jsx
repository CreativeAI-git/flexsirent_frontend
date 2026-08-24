import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader";
import NoRecord from "../other/NoRecord";
import TableHeader from "../table/tableHeader";
import StatusCol from "../table/StatusCol";
import ReactPagination from "../table/ReactPagination";
import PaginationDropdown from "../table/PaginationDropdown";
import PanelLayout from "../../layout/PanelLayout";
import { getSubstring, pipViewDateTime } from "../../utils/pip";
import UserInboxModal from "../../../host/components/modals/UserInboxModal";
import SendMessageModal from "../../../host/components/modals/SendMessageModal";
import { setSuppoortDetail } from "../../../redux/features/host/reducers/inboxReducer";
import {
  fetchHostQueries,
  fetchUserQueries,
} from "../../../redux/features/host/actions/inboxAction";

const tabs = [
  {
    label: "Guest Queries",
    value: "guestQueries",
  },
  {
    label: "Host Queries",
    value: "hostQueries",
  },
];

const SupportInbox = ({ role = "host" }) => {
  const dispatch = useDispatch();
  const user = { name: "Support", role };
  const { isLoading, userQueriesList, hostQueriesList, guestInboxHeader, hostInboxHeader } =
    useSelector((state) => state?.host?.inbox);

  const [activeTab, setActiveTab] = useState(tabs[0]?.value);
  const [dateFilter, setDateFilter] = useState("");
  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);

  const filterList =
    activeTab == tabs[0]?.value ? userQueriesList : hostQueriesList;

  const paginatedList = filterList
    ?.filter((item) => {
      const dateMatch = dateFilter
        ? new Date(item?.created_at).toISOString().split("T")[0] === dateFilter
        : true;

      return dateMatch;
    })
    ?.slice(currentPage * listPerPages, (currentPage + 1) * listPerPages);

  const refreshQueries = () => {
    if (activeTab == tabs[0]?.value) {
      dispatch(fetchUserQueries());
      return;
    }

    dispatch(fetchHostQueries());
  };

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  useEffect(() => {
    setCurrentPage(0);
    refreshQueries();
  }, [activeTab]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout user={user}>
      <div className="row mt-4">
        <div className="col-md-12 mt-4">
          <div className="d-flex align-items-center justify-content-end gap-3 ct_flex_col_575">
            <div className="form-group ct_w_100_767">
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  setCurrentPage(0);
                }}
                max={new Date().toISOString().split("T")[0]}
                className="form-control ct_input ct_light_blue_input_border ct_input_h_50"
              />
            </div>
            <div>
              <button
                type="button"
                className="ct_dark_blue_btn"
                onClick={() => setIsSendMessageModalOpen(true)}
              >
                Send Message
              </button>
            </div>
          </div>
          <div className="mt-4">
            <ul className="nav nav-pills mb-3 ct_custom_tabs justify-content-start">
              {tabs?.map((item, ind) => {
                return (
                  <li
                    key={ind}
                    className={`nav-item ${
                      item?.value == activeTab ? "active" : ""
                    }`}
                  >
                    <button
                      className={`nav-link ct_fw_500 ${
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
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade active show">
                <div className="table-responsive mt-3 ct_custom_table">
                  <table className="table ">
                    <TableHeader
                      data={
                        activeTab == tabs[0].value
                          ? guestInboxHeader
                          : hostInboxHeader
                      }
                    />
                    <tbody>
                      {paginatedList?.map((item, i) => (
                        <tr key={item?.ticket_id || i}>
                          <td>{currentPage * listPerPages + i + 1}</td>
                          {activeTab == tabs[0]?.value && (
                            <>
                              <td>
                                {`${item?.user_first_name} ${item?.user_last_name}` ??
                                  "#N/A"}
                              </td>
                              <td>{getSubstring(item?.message) ?? "#N/A"}</td>
                            </>
                          )}
                          {activeTab == tabs[1]?.value && (
                            <>
                              <td>{getSubstring(item?.message) ?? "#N/A"}</td>
                            </>
                          )}
                          <td>{pipViewDateTime(item?.created_at) ?? "#N/A"}</td>
                          <td>
                            <StatusCol status={item?.status} type="support" />
                          </td>

                          <td>
                            <div className="d-flex align-items-center gap-3 justify-content-end">
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  dispatch(
                                    setSuppoortDetail({ ...item, activeTab }),
                                  );
                                  setIsDetailsModalOpen(true);
                                }}
                                className="text-dark"
                              >
                                <i className="fa-regular fa-eye"></i>
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
                        pageCount={Math.ceil(filterList?.length / listPerPages)}
                        onPageChange={handlePageClick}
                        currentPage={currentPage}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SendMessageModal
        handleSubmit={refreshQueries}
        isViewModal={isSendMessageModalOpen}
        setIsViewModal={setIsSendMessageModalOpen}
      />
      <UserInboxModal
        title={activeTab == tabs[0]?.value ? "Guest Query" : "Your Query"}
        isViewModal={isDetailsModalOpen}
        setIsViewModal={setIsDetailsModalOpen}
      />
    </PanelLayout>
  );
};

export default SupportInbox;

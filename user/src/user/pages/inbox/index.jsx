import { webPath } from "../../routes";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../shared/components/loader";
import { pipViewDateTime } from "../../../shared/utils/pip";
import PanelLayout from "../../../shared/layout/PanelLayout";
import NoRecord from "../../../shared/components/other/NoRecord";
import StatusCol from "../../../shared/components/table/StatusCol";
import InboxDetails from "../../components/modals/pages/InboxDetails";
import TableHeader from "../../../shared/components/table/tableHeader";
import ReactPagination from "../../../shared/components/table/ReactPagination";
import { fetchUserSupport } from "../../../redux/features/user/actions/inboxAction";
import PaginationDropdown from "../../../shared/components/table/PaginationDropdown";

const Inbox = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [isViewModal, setIsViewModal] = useState(false);
  const [supportDetail, setSupportDetail] = useState()
  const navigate = useLocalizedNavigate();
  const tabs = [
    { label: "Booking", value: "Booking" },
    { label: "Other", value: "Other" },
  ];
  const [dateFilter, setDateFilter] = useState("");
  const [activeTab, setActiveTab] = useState(tabs[0]?.value);
  const { bookingHeader, otherHeader, isLoading, userSupportList } = useSelector(
    (state) => state.guest.inbox
  );

  const user = { name: "Support", role: "guest" };

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  const paginatedList = userSupportList[activeTab]
    ?.filter((item) => {
      const dateMatch = dateFilter
        ? new Date(item?.created_at).toISOString().split("T")[0] === dateFilter
        : true;

      return dateMatch;
    })
    ?.slice(currentPage * listPerPages, (currentPage + 1) * listPerPages);

  useEffect(() => {
    dispatch(fetchUserSupport());
  }, []);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout user={user}>
      <div className="row mt-5">
        <div className="col-md-12 mt-4">
          <div className="d-flex align-items-center justify-content-between ct_flex_col_767 gap-3">
            <ul
              className="nav nav-pills mb-0 ct_custom_tabs justify-content-start ct_flex_col_767 ct_w_100_767"
              id="pills-tab"
              role="tablist"
            >
              {tabs?.map((item, index) => (
                <li className="nav-item ct_w_100_767" role="presentation">
                  <button
                    className={`nav-link ct_fw_500 ct_w_100_767 ${item?.value == activeTab ? "active" : ""
                      }`}
                    onClick={() => setActiveTab(item?.value)}
                    type="button"
                    role="tab"
                  >
                    {item?.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="d-flex align-items-center justify-content-end gap-3 ct_flex_col_767 ct_w_100_767">
              <div className="form-group ct_w_100_767">
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  className="form-control ct_input ct_light_blue_input_border ct_input_h_50"
                />
              </div>
              <button
                className="ct_orange_btn ct_w_100_767"
                onClick={() => {
                  navigate(webPath?.newSupport);
                }}
              >
                + New Support
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div className="table-responsive mt-3 ct_custom_table">
              <table className="table ">
                <TableHeader data={activeTab == tabs[0]?.value ? bookingHeader : otherHeader} />
                {paginatedList?.length > 0 && (
                  <tbody>
                    {paginatedList?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        {activeTab == tabs[0]?.value && <td>{item?.property_title || "#N/A"}</td>}
                        <td>
                          <span className="ct_overlay_text">
                            {" "}
                            {item?.message || "#N/A"}
                          </span>
                        </td>
                        <td>{pipViewDateTime(item?.created_at) || "#N/A"}</td>
                        <td>
                          <StatusCol
                            status={item?.status}
                            type="support"
                          />
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-3 justify-content-end">
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setSupportDetail({ ...item, activeTab })
                                setIsViewModal(true);
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
                )}
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
                    pageCount={Math.ceil(userSupportList[activeTab]?.length / listPerPages)}
                    onPageChange={handlePageClick}
                    currentPage={currentPage}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <InboxDetails supportDetail={supportDetail} isViewModal={isViewModal} setIsViewModal={setIsViewModal} />

      {/* <!-- business Modal S --> */}
    </PanelLayout>
  );
};

export default Inbox;

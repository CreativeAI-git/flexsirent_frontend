import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import Loader from "../../../shared/components/loader";
import PanelLayout from "../../../shared/layout/PanelLayout";
import NoRecord from "../../../shared/components/other/NoRecord";
import SearchInput from "../../../shared/components/form/SearchInput";
import TableHeader from "../../../shared/components/table/tableHeader";
import SelectDropdown from "../../../shared/components/form/SelectDropdown";
import ReactPagination from "../../../shared/components/table/ReactPagination";
import PaginationDropdown from "../../../shared/components/table/PaginationDropdown";

const Inbox = () => {
  const navigate = useLocalizedNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedValue, setSelectedValue] = useState();
  const tabs = [
    {
      label: "From Guest to Host",
      value: "guestToHost",
    },
    {
      label: "From Host to Business",
      value: "hostToBusiness",
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const { isLoading, headers, inboxList, dayOpt1 } = useSelector(
    (state) => state.business.management
  );

  const user = { name: "Inbox", role: "guestBusiness" };

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  const paginatedList =
    inboxList[activeTab]
      ?.filter((item) => {
        const search = item?.host
          ?.toLowerCase()
          ?.includes(searchFilter?.toLowerCase());
        return search;
      })
      ?.slice(currentPage * listPerPages, (currentPage + 1) * listPerPages) ||
    [];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout user={user}>
      <div className="row mt-5">
        <div className="col-md-12 mt-4">
          <div className="d-flex align-items-center justify-content-end gap-3 ct_flex_col_767">
            <SearchInput
              value={searchFilter}
              onChange={setSearchFilter}
              placeholder="Search by host"
            />
            <SelectDropdown
              id="statusfilter"
              defaultOptions=""
              options={dayOpt1}
              selectedValue={selectedValue}
              onChange={setSelectedValue}
            />

            <div className="ct_w_100_767">
              <button
                className="ct_orange_btn ct_w_100_767"
                data-bs-toggle="modal"
                data-bs-target="#ct_send_message"
              >
                + Send Message To Host
              </button>
            </div>
          </div>
          <div className="mt-4">
            <ul className="nav nav-pills mb-3 ct_custom_tabs justify-content-start">
              {tabs?.map((item, index) => {
                return (
                  <li className={`nav-item`} role="presentation">
                    <button
                      className={`nav-link ct_fw_500 ${
                        item?.value === activeTab ? "active" : ""
                      }`}
                      type="button"
                      onClick={() => setActiveTab(item.value)}
                    >
                      {item?.label}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="table-responsive ct_custom_table">
              <table className="table ">
                <TableHeader data={headers[activeTab]} />
                {paginatedList?.length > 0 && (
                  <tbody>
                    {paginatedList?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>

                        {activeTab == tabs[0]?.value && (
                          <td>{item?.guest || "#N/A"}</td>
                        )}
                        <td>{item?.host || "#N/A"}</td>
                        {activeTab == tabs[1]?.value && (
                          <td>{item?.business || "#N/A"}</td>
                        )}
                        <td>
                          <span className="ct_overlay_text">
                            {item?.message || "#N/A"}
                          </span>
                        </td>
                        <td>{item?.date || 0}</td>

                        <td>
                          <div className="d-flex align-items-center gap-3 justify-content-end">
                            <a
                              onClick={(e)=>{
                                e.preventDefault()
                              }}
                              // data-bs-toggle="modal"
                              // data-bs-target="#ct_business_detail"
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
                    pageCount={Math.ceil(
                      inboxList[activeTab]?.length / listPerPages
                    )}
                    onPageChange={handlePageClick}
                    currentPage={currentPage}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* business Modal S */}
      <div
        className="modal fade modal-xl"
        id="ct_send_message"
        tabindex="-1"
        aria-labelledby="ct_send_messageLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close ct_login_btn_close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body pt-3 pb-5">
              <div className="">
                <h4 className="ct_fs_20 ct_fw_600 mb-0">
                  Send a Message to Your Host
                </h4>
              </div>
              <ul className="ct_inquery_main mt-4">
                <li>
                  <h5 className="ct_fs_16 ct_fw_600 mb-1">Host Name</h5>
                  <p className="mb-0 ct_text_op_6 ct_fs_14">Robert Decosta</p>
                </li>
                <li>
                  <h5 className="ct_fs_16 ct_fw_600 mb-1">Email</h5>
                  <p className="mb-0 ct_text_op_6 ct_fs_14">
                    robert@mailinator.com
                  </p>
                </li>
              </ul>
              <div className="form-group mt-4">
                <label for="" className="mb-2 ct_fw_600">
                  Message
                </label>
                <textarea className="form-control ct_input h-auto" rows="4">
                  I just had a cancellation — the apartment is now available
                  from July 1st.Also I’ve uploaded the updated rental agreement
                  and ID proof. Please let me know if you need anything else to
                  complete verification. Thanks!
                </textarea>
              </div>
              <div className="mt-4 ">
                <button className="ct_dark_blue_btn ms-auto">Send Message</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inbox Modal S */}
      <div
        className="modal fade modal-xl"
        id="ct_inbox_detail"
        tabindex="-1"
        aria-labelledby="ct_inbox_detailLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close ct_login_btn_close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body pt-3 pb-5">
              <div className="">
                <h4 className="ct_fs_20 ct_fw_600 mb-0">Reply to Host Inquiry</h4>
              </div>
              <ul className="ct_inquery_main mt-4">
                <li>
                  <h5 className="ct_fs_16 ct_fw_600 mb-1">Host</h5>
                  <p className="mb-0 ct_text_op_6 ct_fs_14">Robert Decosta</p>
                </li>
                <li>
                  <h5 className="ct_fs_16 ct_fw_600 mb-1">Email </h5>
                  <p className="mb-0 ct_text_op_6 ct_fs_14">
                    robert@mailinator.com
                  </p>
                </li>
              </ul>
              <div className="form-group mt-4">
                <textarea
                  className="form-control ct_input h-auto"
                  disabled
                  rows="4"
                >
                  "Hey! I loved the pictures. Could you tell me more about the
                  Wi-Fi speed and neighborhood?" and "Do I need to pay anything
                  extra apart from the rent and deposit?"
                </textarea>
              </div>
              <div className="form-group mt-4">
                <label for="" className="mb-2 ct_fw_600">
                  Your Response
                </label>
                <textarea
                  className="form-control ct_input h-auto"
                  disabled
                  rows="4"
                >
                  "Hey! I loved the pictures. Could you tell me more about the
                  Wi-Fi speed and neighborhood?" and "Do I need to pay anything
                  extra apart from the rent and deposit?"
                </textarea>
              </div>
              <div className="mt-4">
                <button className="ct_dark_blue_btn ms-auto">Send Reply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
};

export default Inbox;

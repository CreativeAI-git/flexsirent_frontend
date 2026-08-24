import { useEffect, useState } from "react";
import Loader from "../../components/form/Loader";
import SubHeader from "../../shared/layout/SubHeader";
import { curSym, pipViewDate } from "../../utills/pip";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import SearchInput from "../../components/form/SearchInput";
import useDebounce from "../../components/hooks/useDebounce";
import NoRecord from "../../shared/components/others/NoRecord";
import SelectDropdown from "../../components/form/SelectDropdown";
import TableHeader from "../../shared/components/Table/TableHeader";
import ReactPagination from "../../shared/components/Table/ReactPagination";
import PaginationDropdown from "../../shared/components/Table/PaginationDropdown";
import { fetchPayout, fetchPayoutCardData } from "../../redux/actions/serviceFeeAction";

const ManagePayout = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);

  const filterOption = [
    { value: "", label: "All" },
    { value: "PAID", label: "Paid" },
    { value: "PENDING", label: "Pending" },
    { value: "REJECTED", label: "Rejected" },
  ];

  const { isLoading, payoutHeader, payoutList, payoutCards } = useSelector(
    (state) => state?.serviceFeeReducers,
  );

  const tableClass = (status, type = "col") => {
    switch (status) {
      case "FAILED":
        return type == "row" ? "ct_red_light_status" : "ct_red_clr";
      case "REJECTED":
        return type == "row" ? "ct_red_light_status" : "ct_red_clr";
      case "PAID":
        return type == "row" ? "ct_green_light_status" : "ct_green_clr";
      case "PENDING":
      case "PROCESSING":
        return type == "row" ? "ct_brown_light_status" : "ct_brown_clr";
    }
  };
  const filteredList =
    payoutList?.filter((item) => {
      const search = item?.property_title
        ?.toLowerCase()
        ?.includes(debouncedSearch?.toLowerCase());
      const status = selectedValue
        ? item?.payout_status == selectedValue
        : true;
      return search && status;
    }) || [];
  const paginatedList = filteredList?.slice(
    currentPage * listPerPages,
    (currentPage + 1) * listPerPages,
  );

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  useEffect(() => {
    dispatch(fetchPayout());
    dispatch(fetchPayoutCardData());
  }, []);

  if (isLoading) return <Loader />;

  return (
    <PanelLayout>
      <SubHeader label="Manage Payout" />
      <div class="row">
        
        <div class="col-xxl-4 col-lg-6 col-md-6 mb-4">
          <div class="ct_dash_card">
            <div class="ct_card_title">
              <h6 class="ct_fs_16 mb-2 ct_black_text ct_text_op_07">
                Paid Payouts
              </h6>
              <h4 class="mb-0 ct_fs_28 ct_fw_700">{payoutCards?.paid_payout_count || 0}</h4>
            </div>
          </div>
        </div>
        <div class="col-xxl-4 col-lg-6 col-md-6 mb-4">
          <div class="ct_dash_card">
            <div class="ct_card_title">
              <h6 class="ct_fs_16 mb-2 ct_black_text ct_text_op_07">
                Pending Payouts
              </h6>
              <h4 class="mb-0 ct_fs_28 ct_fw_700">{payoutCards?.pending_payout_count || 0}</h4>
            </div>
          </div>
        </div>
        <div class="col-xxl-4 col-lg-6 col-md-6 mb-4">
          <div class="ct_dash_card">
            <div class="ct_card_title">
              <h6 class="ct_fs_16 mb-2 ct_black_text ct_text_op_07">
                Rejected Payouts 
              </h6>
              <h4 class="mb-0 ct_fs_28 ct_fw_700">{payoutCards?.rejected_payout_count || 0}</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 pb-4">
        <SearchInput
          value={searchFilter}
          onChange={setSearchFilter}
          placeholder="Search by property"
        />
        <div class="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 ct_w_100_767">
          <div class="form-group ct_w_100_767">
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
              <TableHeader data={payoutHeader} />
              <tbody>
                {paginatedList?.map((item, i) => (
                  <tr className={tableClass(item?.payout_status, "row")}>
                    <td>{i + 1}</td>

                    <td>
                      {`${item?.guest_name}` ?? "#N/A"}
                    </td>
                    <td>
                      {`${item?.host_name}` ?? "#N/A"}
                    </td>
                    <td>{item?.property_title ?? "#N/A"}</td>
                    <td>  {curSym}{item?.host_amount ?? "#N/A"}</td>
                   
                    <td>
                      {curSym}
                      {item?.admin_earnings ?? "0"}
                    </td>
                    <td>{pipViewDate(item?.payout_released_at) ?? "#N/A"}</td>

                    <td>
                      <span
                        class={`${tableClass(item.payout_status, "col")} ct_fw_600 text-capitalize`}
                      >
                        {item?.payout_status?.toLowerCase()}
                      </span>
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
                  pageCount={Math.ceil(filteredList?.length / listPerPages)}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ct_support_resolved_detail Modal S */}
      <div
        class="modal fade modal-xl"
        id="ct_support_pending_detail"
        tabindex="-1"
        aria-labelledby="ct_support_pending_detailLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header border-0">
              <button
                type="button"
                class="btn-close ct_login_btn_close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body pt-3 pb-5">
              <div class="">
                <h4 class="ct_fs_20 ct_fw_600 mb-0">Inquiry Detail</h4>
              </div>
              <ul class="ct_inquery_main mt-4">
                <li>
                  <h5 class="ct_fs_16 ct_fw_600 mb-1">Date</h5>
                  <p class="mb-0 ct_text_op_6 ct_fs_14">20 August, 2024</p>
                </li>
                <li>
                  <h5 class="ct_fs_16 ct_fw_600 mb-1">User Name</h5>
                  <p class="mb-0 ct_text_op_6 ct_fs_14">John Wick</p>
                </li>
                <li>
                  <h5 class="ct_fs_16 ct_fw_600 mb-1">Email </h5>
                  <p class="mb-0 ct_text_op_6 ct_fs_14">abc123@gmail.com</p>
                </li>
                <li>
                  {/* <span class="ct_cancle_badge d-inline-block ct_line_h_30 px-4 ct_border_radius_10">Pending</span> */}
                  <span class="ct_bown_badge d-inline-block ct_line_h_30 px-4 ct_border_radius_10">
                    Pending
                  </span>
                </li>
              </ul>
              <div class="form-group mt-4">
                <textarea
                  class="form-control ct_input h-auto"
                  disabled
                  rows="4"
                >
                  "Hey! I loved the pictures. Could you tell me more about the
                  Wi-Fi speed and neighborhood?" and "Do I need to pay anything
                  extra apart from the rent and deposit?"
                </textarea>
              </div>
              {/* when received then also show this div other wise comment */}
              <div class="form-group mt-4">
                <label for="" class="mb-2 ct_fw_600">
                  Your Response
                </label>
                <textarea
                  class="form-control ct_input h-auto"
                  disabled
                  rows="4"
                >
                  Hello! Thanks for reaching out. Yes, the studio is available
                  starting from the 1st of next month.It includes high-speed
                  Wi-Fi and access to a If you have any specific move-in date or
                  other questions, feel free to ask. I’d be happy to help!
                </textarea>
              </div>
              <div class="mt-4 ms-auto">
                <button class="ct_orange_btn ms-auto">Send Reply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
};

export default ManagePayout;

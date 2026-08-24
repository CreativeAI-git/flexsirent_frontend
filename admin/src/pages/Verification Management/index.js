import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { pipViewDate } from "../../utills/pip";
import Loader from "../../components/form/Loader";
import SubHeader from "../../shared/layout/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import SearchInput from "../../components/form/SearchInput";
import useDebounce from "../../components/hooks/useDebounce";
import NoRecord from "../../shared/components/others/NoRecord";
import TableHeader from "../../shared/components/Table/TableHeader";
import ReactPagination from "../../shared/components/Table/ReactPagination";
import PaginationDropdown from "../../shared/components/Table/PaginationDropdown";
import {
  getAllKYCDocData,
  updateKYCStatus,
} from "../../redux/actions/authAction";
import { pageRoutes } from "../../routes/PageRoutes";
import ReasonModal from "../../components/modal/ReasonModal";

const VerificationManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, userKycData, tableHeader, userBusinessKycData } =
    useSelector((state) => state.authReducers);

  const [activeKyc, setActiveKyc] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);

  const [isViewModal2, setIsViewModal2] = useState(false);

  const tableClass = (status, type = "col") => {
    switch (status) {
      case "Rejected":
        return type == "row" ? "ct_red_light_status" : "ct_red_clr";
      case "Approved":
        return type == "row" ? "ct_green_light_status" : "ct_green_clr";
      case "Pending":
        return type == "row" ? "ct_brown_light_status" : "ct_brown_clr";
    }
  };

  const tabs = [
    {
      value: "User",
      label: "User",
    },
    {
      value: "Business",
      label: "Business",
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const filterList =
    activeTab == tabs[0]?.value ? userKycData : userBusinessKycData || [];
  const paginatedList = filterList
    ?.filter((item) => {
      const fullName = `${item?.first_name} ${item?.last_name}`;
      const search = fullName
        ?.toLowerCase()
        ?.includes(debouncedSearch?.toLowerCase());
      const status = selectedValue ? item?.status == selectedValue : true;
      return search && status;
    })
    ?.slice(currentPage * listPerPages, (currentPage + 1) * listPerPages);

  useEffect(() => {
    dispatch(getAllKYCDocData());
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  const handleChangeStatus = (val, item) => {
    const callback = (response) => {
      if (response.success) {
        dispatch(getAllKYCDocData());
      }
    };
    const data = {
      id: item?.id,
      user_type: item?.user_type,
      status: val,
    };
    dispatch(updateKYCStatus({ payload: data, callback }));
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout>
      <SubHeader label="KYC Management" />
      <div class="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 pb-4">
        <SearchInput
          value={searchFilter}
          onChange={setSearchFilter}
          placeholder="Search by user name"
        />
        <div class="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 ct_w_100_767">
          <div class="form-group ct_w_100_767">
            <select
              class="form-control ct_input ct_input_h_50 ct_light_blue_input_border"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="0">Pending</option>
              <option value="1">Approved</option>
              <option value="2">Rejected</option>
            </select>
          </div>
        </div>
      </div>
      <ul
        class="nav nav-pills mb-3 ct_custom_tabs"
        id="pills-tab"
        role="tablist"
      >
        {tabs?.map((tab, index) => (
          <li class="nav-item" role="presentation" key={index}>
            <button
              className={`nav-link ${activeTab === tab?.value ? "active" : ""}`}
              type="button"
              onClick={() => setActiveTab(tab?.value)}
            >
              {tab?.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive ct_custom_table">
            <table className="table">
              <TableHeader data={tableHeader} />
              <tbody>
                {paginatedList?.map((item, i) => (
                  <tr className={tableClass(item?.status, "row")}>
                    <td>{i + 1}</td>
                    <td>
                      {`${item?.first_name} ${item?.last_name}` || "#N/A"}
                    </td>

                    <td>
                      {item?.created_at
                        ? pipViewDate(item?.created_at)
                        : "#N/A"}
                    </td>

                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <select
                          class="form-control ct_input ct_input_h_50 ct_light_blue_input_border w-auto"
                          value={item?.status}
                          onChange={(e) => {
                            if (e.target.value == "2") {
                              setIsViewModal2(true);
                              setActiveKyc(item);
                              return;
                            }
                            handleChangeStatus(e.target.value, item);
                          }}
                          disabled={item?.status === 0 ? false : true}
                        >
                          <option value="0">Pending</option>
                          <option value="1">Accept</option>
                          <option value="2">Reject</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(pageRoutes.varificationDetail, {
                              state: { data: item },
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
                  pageCount={Math.ceil(filterList?.length / listPerPages)}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <ReasonModal
        isViewModal={isViewModal2}
        setIsViewModal={setIsViewModal2}
        activeKyc={activeKyc}
      />
    </PanelLayout>
  );
};

export default VerificationManagement;

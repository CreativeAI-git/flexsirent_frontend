import { useEffect, useState } from "react";
import Loader from "../../components/form/Loader";
import SubHeader from "../../shared/layout/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import SearchInput from "../../components/form/SearchInput";
import useDebounce from "../../components/hooks/useDebounce";
import ListingPropertyTable from "../../components/Table/ListingPropertyTable";
import {
  fetchListingCards,
  fetchListingRequest,
} from "../../redux/actions/hostAction";

const ListingsRequest = () => {
  const dispatch = useDispatch();
  const [searchFilter, setSearchFilter] = useState("");
  const { requestsHeaders, requestList, isLoading, listingCardData } =
    useSelector((state) => state.hostReducers);
  const listingStats = [
    {
      label: "Total Listing Requests",
      value: listingCardData?.total_listing_request || 0,
    },
    {
      label: "Pending Approval",
      value: listingCardData?.total_pending || 0,
    },
    {
      label: "Approved Listings",
      value: listingCardData?.total_approve || 0,
    },
    {
      label: "Rejected Listings",
      value: listingCardData?.total_reject || 0,
    },
  ];

  const tabs = [
    {
      value: "1",
      label: "Host",
    },
    {
      value: "2",
      label: "Host Business",
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const debouncedSearch = useDebounce(searchFilter, 500);

  const filteredData = requestList?.filter((item) => {
    const full_name = `${item?.host_first_name} ${item?.host_lost_name}`;
    const search = full_name
      ?.toLowerCase()
      ?.includes(debouncedSearch?.toLowerCase());
    return search;
  });

  useEffect(() => {
    dispatch(fetchListingCards());
  }, []);

  useEffect(() => {
    dispatch(fetchListingRequest({ user_type: activeTab }));
  }, [activeTab]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout>
      <SubHeader label="Listing Requests" />
      <div className="row">
        {listingStats.map((item, index) => (
          <div key={index} className="col-xxl-3 col-lg-6 col-md-6 mb-4">
            <div className="ct_dash_card">
              <div className="ct_card_title">
                <h6 className="ct_fs_16 mb-2 ct_black_text ct_text_op_07">
                  {item.label}
                </h6>
                <h4 className="mb-0 ct_fs_28 ct_fw_700">{item.value}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div class="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 pb-4">
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

        <SearchInput
          value={searchFilter}
          onChange={setSearchFilter}
          placeholder="Search by host name"
        />
      </div>
      <div className="row">
        <div className="col-md-12">
          <ListingPropertyTable
            data={filteredData}
            tableHeading={requestsHeaders}
          />
        </div>
      </div>
    </PanelLayout>
  );
};

export default ListingsRequest;

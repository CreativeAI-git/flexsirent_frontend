import { useState } from "react";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { hostBusinessPaths } from "../../routes";
import { curSym } from "../../../shared/utils/pip";
import Button from "../../../shared/components/buttons";
import PanelLayout from "../../../shared/layout/PanelLayout";
import NoRecord from "../../../shared/components/other/NoRecord";
import DeleteModal from "../../../host/components/modals/DeleteModal";
import SearchInput from "../../../shared/components/form/SearchInput";
import useDebounce from "../../../shared/components/hooks/useDebounce";
import TableHeader from "../../../shared/components/table/tableHeader";
import SelectDropdown from "../../../shared/components/form/SelectDropdown";
import ReactPagination from "../../../shared/components/table/ReactPagination";
import AddListingModal from "../../../shared/components/modals/AddListingModal";
import PaginationDropdown from "../../../shared/components/table/PaginationDropdown";

const Property = () => {
  const navigate = useLocalizedNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const debouncedSearch = useDebounce(searchFilter);

  const [isViewModal, setIsViewModal] = useState(false);

  const tabs = [
    { value: "Own Listings", label: "Own Listings" },
    { value: "System Listings", label: "System Listings" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]?.value);
  const bookingDropDown = [
    { value: "Under Review", label: "Under Review" },
    { value: "Published", label: "Published" },
  ];
  const ownPropertyHeader = [
    "S.No.",
    "Property Name",
    "Property Type",
    "Location",
    "Price/Month",
    "Listed On",
    "Status",
    "Actions",
  ];
  const webPropertyHeader = [
    "S.No.",
    "Property Name",
    "Property Type",
    "Website Address",
    "Location",
    "Price/Month",
    "Listed On",
    "Status",
    "Actions",
  ];
  const propertyData = [
    {
      property_title: "Modern Downtown",
      property_type: "Apartments",
      url: "www.abc.com",
      location: "123 Main St, New York",
      price_per_month: `${curSym}${2800}`,
      listed_on: "25 May, 2024",
      status: "Under Review",
    },
  ];
  const user = { name: "Property", role: "hostBusiness" };

  const paginatedList = propertyData
    ?.filter((item) => {
      const search = item?.property_title
        ?.toLowerCase()
        ?.includes(debouncedSearch?.toLowerCase());
      return search;
    })
    ?.slice(currentPage * listPerPages, (currentPage + 1) * listPerPages);

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  return (
    <PanelLayout user={user}>
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="d-flex align-items-center justify-content-end gap-3 ct_flex_col_575">
            <SearchInput
              value={searchFilter}
              onChange={setSearchFilter}
              placeholder="Search by Property Name"
            />
            <SelectDropdown
              id="statusfilter"
              defaultOptions=""
              selectedValue={selectedValue}
              onChange={setSelectedValue}
              placeholder="Sort By"
              options={bookingDropDown}
            />
            <Button
              title="+ Add Listing"
              data-bs-toggle="modal"
              data-bs-target="#ct_add_listing_modal"
            />
          </div>
          <div className="mt-4">
            <ul
              className="nav nav-pills mb-3 ct_custom_tabs justify-content-start"
              id="pills-tab"
              role="tablist"
            >
              {tabs?.map((item, index) => (
                <li key={index} className="nav-item" role="presentation">
                  <button
                    className={`nav-link ct_fw_500 ${item?.value == activeTab ? "active" : ""
                      }`}
                    id="pills-Flexible-tab"
                    onClick={() => {
                      setActiveTab(item?.value);
                    }}
                    type="button"
                  >
                    {item?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="table-responsive mt-3 ct_custom_table">
            <table className="table ">
              <TableHeader
                data={
                  activeTab == tabs[0]?.value
                    ? ownPropertyHeader
                    : webPropertyHeader
                }
              />
              <tbody>
                {paginatedList?.map((item, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                      <span className="ct_overlay_text">
                        {item?.property_title ?? "#N/A"}
                      </span>
                    </td>
                    <td>{item?.property_type ?? "#N/A"}</td>
                    {tabs[1]?.value == activeTab && <td>{item?.url ?? "#N/A"}</td>}
                    <td>
                      <span className="ct_overlay_text">
                        {item?.location ?? "#N/A"}
                      </span>
                    </td>
                    <td>{item?.price_per_month ?? "#N/A"}</td>
                    <td>{item?.listed_on ?? "#N/A"}</td>
                    <td>
                      <span
                        className={
                          item?.status == "Under Review"
                            ? "ct_cancel_clr"
                            : "ct_upcoming_clr"
                        }
                      >
                        {item?.status ?? "#N/A"}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-3 justify-content-end">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(hostBusinessPaths.ListingDetails);
                          }}
                          className="text-dark"
                        >
                          <i className="fa-regular fa-eye"></i>
                        </a>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(hostBusinessPaths.EditProperty);
                          }}
                          className="text-dark"
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </a>
                        <a
                          href="javasscript:void(0)"
                          className="text-dark"
                          onClick={() => setIsViewModal(true)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
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
                  pageCount={Math.ceil(propertyData?.length / listPerPages)}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <AddListingModal redirectURL={hostBusinessPaths.AddListing} />

      <DeleteModal
        value="Delete Listing"
        heading="Are you sure you want to delete this property listing?"
        body="This action is permanent. All listing data — including photos, details, and availability — will be permanently removed."
        isViewModal={isViewModal}
        setIsViewModal={setIsViewModal}
      />
    </PanelLayout>
  );
};

export default Property;

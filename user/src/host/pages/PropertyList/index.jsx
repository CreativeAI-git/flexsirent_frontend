import { hostRoutes } from "../../routes";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../shared/components/loader";
import Button from "../../../shared/components/buttons";
import PanelLayout from "../../../shared/layout/PanelLayout";
import DeleteModal from "../../components/modals/DeleteModal";
import { curSym, pipViewDate } from "../../../shared/utils/pip";
import NoRecord from "../../../shared/components/other/NoRecord";
import StatusCol from "../../../shared/components/table/StatusCol";
import SearchInput from "../../../shared/components/form/SearchInput";
import TableHeader from "../../../shared/components/table/tableHeader";
import useDebounce from "../../../shared/components/hooks/useDebounce";
import ReactPagination from "../../../shared/components/table/ReactPagination";
import AddListingModal from "../../../shared/components/modals/AddListingModal";
import PaginationDropdown from "../../../shared/components/table/PaginationDropdown";
import {
  deleteProperty,
  fetchProperties,
} from "../../../redux/features/host/actions/bookingAction";
import { hostBusinessPaths } from "../../../host business/routes";

const Property = () => {
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");
  const [isViewModal, setIsViewModal] = useState(false);
  const debouncedSearch = useDebounce(searchFilter, 500);
  const { pathname } = useLocation();
  const isHost = !pathname.includes("/host-business");
  const { isLoading, propertyHeader, propertyData, listingHeader } =
    useSelector((state) => state.host.booking);
  const tabs = [
    { value: "propertyListing", label: "Property Listing" },
    { value: "listingRequest", label: "Listing Request" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]?.value);

  const user = {
    name: "Property",
    role: isHost ? "host" : "hostBusiness",
  };

  const shouldFilter = activeTab === tabs[0].value;

  const paginatedList = (propertyData?.[activeTab] || [])
    .filter((item) => {
      if (!shouldFilter) return true; // skip filtering
      return item?.property_title
        ?.toLowerCase()
        ?.includes(debouncedSearch?.toLowerCase() || "");
    })
    .slice(currentPage * listPerPages, (currentPage + 1) * listPerPages);

  useEffect(() => {
    dispatch(fetchProperties());
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  const hadleDeleteProperty = () => {
    const callback = (response) => {
      if (response.success) {
        setIsViewModal(false);
        dispatch(fetchProperties());
      }
    };
    dispatch(
      deleteProperty({
        payload: {
          property_id: id,
        },
        callback,
      }),
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout user={user}>
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="d-flex align-items-center justify-content-end gap-3 ct_flex_col_575">
            {shouldFilter && (
              <SearchInput
                value={searchFilter}
                onChange={setSearchFilter}
                placeholder="Search by property name"
              />
            )}
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
                    className={`nav-link ct_fw_500 ${
                      item?.value == activeTab ? "active" : ""
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
                  activeTab == tabs[0].value ? propertyHeader : listingHeader
                }
              />
              <tbody>
                {paginatedList?.map((item, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    {activeTab == tabs[0]?.value && (
                      <>
                        <td>
                          <span className="ct_overlay_text">
                            {item?.property_title ?? "#N/A"}
                          </span>
                        </td>

                        <td>{item?.category_name ?? "#N/A"}</td>
                        <td>
                          <span className="ct_overlay_text">
                            {item?.address ?? "#N/A"}
                          </span>
                        </td>
                        <td>
                          {item?.monthly_rent
                            ? `${curSym}${item?.monthly_rent}`
                            : "#N/A"}
                        </td>
                        <td>{pipViewDate(item?.created_at) ?? "#N/A"}</td>
                        <td>
                          <StatusCol status={item?.status} type="property" />
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-3 justify-content-end">
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(
                                  isHost
                                    ? hostRoutes.ListingDetails
                                    : hostBusinessPaths?.ListingDetails,
                                  {
                                    state: { data: item },
                                  },
                                );
                              }}
                              className="text-dark"
                            >
                              <i className="fa-regular fa-eye"></i>
                            </a>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(isHost ? hostRoutes.EditProperty : hostBusinessPaths?.EditProperty, {
                                  state: { data: item },
                                });
                              }}
                              className="text-dark"
                            >
                              <i className="fa-solid fa-pencil"></i>
                            </a>
                            <a
                              href="javasscript:void(0)"
                              className="text-dark"
                              onClick={() => {
                                setId(item?.property_id);
                                setIsViewModal(true);
                              }}
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </a>
                          </div>
                        </td>
                      </>
                    )}

                    {activeTab == tabs[1].value && (
                      <>
                        <td>
                          <span className="ct_minimise_cnt ct_white_normal">
                            {item?.website_address ?? "#N/A"}
                          </span>
                        </td>
                        <td>{item?.post_code ?? "#N/A"}</td>
                        <td>
                          <span className="ct_overlay_text">
                            {item?.address ?? "#N/A"}
                          </span>
                        </td>
                        <td className="text-end">
                          {pipViewDate(item?.created_at) ?? "#N/A"}
                        </td>
                      </>
                    )}
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
                  pageCount={Math.ceil(
                    propertyData[activeTab]?.length / listPerPages,
                  )}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <AddListingModal
        redirectURL={
          isHost ? hostRoutes.AddListing : hostBusinessPaths?.AddListing
        }
      />

      <DeleteModal
        value="Delete Listing"
        heading="Are you sure you want to delete this property listing?"
        body="This action is permanent. All listing data — including photos, details, and availability — will be permanently removed."
        isViewModal={isViewModal}
        handleDelete={hadleDeleteProperty}
        setIsViewModal={setIsViewModal}
      />
    </PanelLayout>
  );
};

export default Property;

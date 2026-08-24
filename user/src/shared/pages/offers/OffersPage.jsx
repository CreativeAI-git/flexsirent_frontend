import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader";
import SearchInput from "../../components/form/SearchInput";
import useDebounce from "../../components/hooks/useDebounce";
import NoRecord from "../../components/other/NoRecord";
import ReactPagination from "../../components/table/ReactPagination";
import PaginationDropdown from "../../components/table/PaginationDropdown";
import TableHeader from "../../components/table/tableHeader";
import PanelLayout from "../../layout/PanelLayout";
import { getSubstring, pipViewDate } from "../../utils/pip";
import AddOffersModal from "../../../host/components/modals/AddOffersModal";
import ViewOfferModal from "../../../host/components/modals/ViewOfferModal";
import {
  fetchHostOffers,
  fetchHostPropertiesWithoutOffer,
  updateOfferStatus,
} from "../../../redux/features/host/actions/reviewAction";

const getPropertyTitle = (item) =>
  item?.property_title ??
  item?.website_address ??
  item?.address ??
  item?.floor ??
  item?.title ??
  item?.property_name ??
  item?.property?.property_title ??
  "#N/A";

const getOfferValue = (item) =>
  item?.offer_value ??
  item?.discount ??
  item?.offer_percentage ??
  item?.offer?.offer_value ??
  "#N/A";

const isOfferActive = (item) => Number(item?.is_active) === 1;

const getLocationText = (item) =>
  [item?.address, item?.location, item?.country].filter(Boolean).join(", ");

const OffersPage = ({ panelRole }) => {
  const dispatch = useDispatch();
  const user = { name: "Offers", role: panelRole };
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState({});
  const [updatingOfferId, setUpdatingOfferId] = useState(null);
  const debouncedSearch = useDebounce(searchFilter, 500);

  const { reviewLoading, allOffersData, offersHeading } = useSelector(
    (state) => state.host.review,
  );

  const refreshOffersPage = () => {
    dispatch(fetchHostOffers());
    dispatch(fetchHostPropertiesWithoutOffer());
  };

  const handleStatusUpdate = (item) => {
    setUpdatingOfferId(item?.offer_id);

    dispatch(
      updateOfferStatus({
        payload: {
          offer_id: item?.offer_id,
          is_active: isOfferActive(item) ? 0 : 1,
        },
        callback: (res) => {
          setUpdatingOfferId(null);
          if (res?.success) {
            setSelectedOffer((prev) =>
              prev?.offer_id === item?.offer_id
                ? { ...prev, is_active: isOfferActive(item) ? 0 : 1 }
                : prev,
            );
            refreshOffersPage();
          }
        },
      }),
    );
  };

  const filteredList = useMemo(
    () =>
      (allOffersData || []).filter((item) => {
        const searchText = `${getPropertyTitle(item)} ${getOfferValue(item)} ${
          item?.start_date || ""
        } ${item?.end_date || ""} ${item?.website_address || ""} ${
          getLocationText(item) || ""
        } ${item?.post_code || ""}`.toLowerCase();

        return debouncedSearch
          ? searchText.includes(debouncedSearch.toLowerCase())
          : true;
      }),
    [allOffersData, debouncedSearch],
  );

  const paginatedList = filteredList.slice(
    currentPage * listPerPages,
    (currentPage + 1) * listPerPages,
  );

  useEffect(() => {
    refreshOffersPage();
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearch, listPerPages]);

  if (reviewLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout user={user}>
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="d-flex align-items-center justify-content-end gap-3 ct_flex_col_575">
            
            <div className="d-flex align-items-center justify-content-end gap-3 ct_flex_col_575 ct_w_100_575">
              <SearchInput
                value={searchFilter}
                onChange={setSearchFilter}
                placeholder="Search by property, address or date"
              />
              <div className="ct_w_100_575">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(true);
                  }}
                  className="ct_dark_blue_btn"
                >
                  Add Offer
                </button>
              </div>
            </div>
          </div>

          <div className="table-responsive mt-3 ct_custom_table">
            <table className="table">
              <TableHeader data={offersHeading} />
              {paginatedList.length > 0 && (
                <tbody>
                  {paginatedList.map((item, index) => (
                    <tr key={item?.offer_id || item?.property_id || index}>
                      <td>{currentPage * listPerPages + index + 1}</td>
                      <td>
                        <span className="ct_overlay_text">
                          {getPropertyTitle(item)}
                        </span>
                        <p className="mb-0 ct_text_op_6">
                          {getSubstring(
                            getLocationText(item) ||
                              item?.website_address ||
                              "#N/A",
                            30,
                          )}
                        </p>
                      </td>
                      <td>
                        {getOfferValue(item) !== "#N/A"
                          ? `${getOfferValue(item)}%`
                          : "#N/A"}
                      </td>
                      <td>{pipViewDate(item?.start_date) || "#N/A"}</td>
                      <td>{pipViewDate(item?.end_date) || "#N/A"}</td>
                      <td>
                        <label className="toggle-switch mb-0">
                          <input
                            type="checkbox"
                            checked={isOfferActive(item)}
                            disabled={
                              !item?.offer_id ||
                              updatingOfferId === item?.offer_id
                            }
                            onChange={() => handleStatusUpdate(item)}
                          />
                          <div className="toggle-switch-background">
                            <div className="toggle-switch-handle"></div>
                          </div>
                        </label>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-end gap-3">
                          <a
                            className="text-dark ct_cursor_pointer"
                            onClick={() => {
                              setSelectedOffer(item);
                              setIsDetailModalOpen(true);
                            }}
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
            {paginatedList.length <= 0 && <NoRecord />}
          </div>

          {filteredList.length > 0 && (
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div>
                <PaginationDropdown
                  onChange={(val) => {
                    setListPerPages(Number(val));
                    setCurrentPage(0);
                  }}
                />
              </div>
              <div>
                <ReactPagination
                  pageCount={Math.ceil(filteredList.length / listPerPages)}
                  onPageChange={(data) => setCurrentPage(data?.selected)}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <AddOffersModal
        isViewModal={isAddModalOpen}
        setIsViewModal={setIsAddModalOpen}
        onSuccess={refreshOffersPage}
      />
      <ViewOfferModal
        isViewModal={isDetailModalOpen}
        setIsViewModal={setIsDetailModalOpen}
        data={selectedOffer}
        onToggleStatus={handleStatusUpdate}
        updatingOfferId={updatingOfferId}
      />
    </PanelLayout>
  );
};

export default OffersPage;

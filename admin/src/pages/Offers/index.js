import { pipViewDate } from "../../utills/pip";
import Loader from "../../components/form/Loader";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubHeader from "../../shared/layout/SubHeader";
import StatusCol from "../../components/Table/StatusCol";
import PanelLayout from "../../shared/layout/PanelLayout";
import SearchInput from "../../components/form/SearchInput";
import useDebounce from "../../components/hooks/useDebounce";
import NoRecord from "../../shared/components/others/NoRecord";
import { fetchOffers } from "../../redux/actions/serviceFeeAction";
import ViewOfferModal from "../../components/modal/ViewOfferModal";
import TableHeader from "../../shared/components/Table/TableHeader";
import ReactPagination from "../../shared/components/Table/ReactPagination";
import PaginationDropdown from "../../shared/components/Table/PaginationDropdown";

const getPropertyTitle = (item = {}) => item?.property_title ?? "#N/A";

const getOfferValue = (item = {}) => {
  const value = item?.offer_value;
  return value === 0 || value ? `${value}%` : "#N/A";
};

const getStatusText = (item = {}) => {
  if (item?.is_active === 1 || item?.is_active === "1") return "Active";
  if (item?.is_active === 0 || item?.is_active === "0") return "Inactive";
  return "#N/A";
};

const Offers = () => {
  const dispatch = useDispatch();
  const [searchFilter, setSearchFilter] = useState("");
  const [isDetailModal, setIsDetailModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const debouncedSearch = useDebounce(searchFilter, 500);

  const { isLoading, offerHeader, offerList } = useSelector(
    (state) => state?.serviceFeeReducers,
  );

  const filteredList = useMemo(
    () =>
      (offerList || []).filter((item) => {
        const searchText = `${getPropertyTitle(item)} ${
          item?.address || ""
        } ${item?.location || ""} ${item?.city || ""} ${
          item?.state || ""
        } ${item?.country || ""} ${getOfferValue(item)} ${getStatusText(item)}`.toLowerCase();

        return debouncedSearch
          ? searchText.includes(debouncedSearch.toLowerCase())
          : true;
      }),
    [debouncedSearch, offerList],
  );

  const paginatedList = filteredList.slice(
    currentPage * listPerPages,
    (currentPage + 1) * listPerPages,
  );

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearch, listPerPages]);

  if (isLoading) return <Loader />;

  return (
    <PanelLayout>
      <SubHeader label="Offers" />

      <div className="d-flex align-items-center justify-content-end gap-3 ct_flex_col_767 pb-4">
        <SearchInput
          value={searchFilter}
          onChange={setSearchFilter}
          placeholder="Search by property, discount, status"
        />
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive ct_custom_table">
            <table className="table">
              <TableHeader data={offerHeader} />
              <tbody>
                {paginatedList?.map((item, index) => (
                  <tr key={item?.offer_id || item?.id || index}>
                    <td>{currentPage * listPerPages + index + 1}</td>
                    <td>{getPropertyTitle(item)}</td>
                    <td>{getOfferValue(item)}</td>
                    <td>{pipViewDate(item?.start_date) || "#N/A"}</td>
                    <td>{pipViewDate(item?.end_date) || "#N/A"}</td>
                    <StatusCol status={item?.is_active} type={"offer"} />
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedOffer(item);
                            setIsDetailModal(true);
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

          {filteredList?.length !== 0 && (
            <div className="d-flex ct_flex_col_575 gap-3 justify-content-between align-items-center mt-4">
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
                  pageCount={Math.ceil(filteredList?.length / listPerPages)}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <ViewOfferModal
        isViewModal={isDetailModal}
        setIsViewModal={setIsDetailModal}
        data={selectedOffer}
      />
    </PanelLayout>
  );
};

export default Offers;

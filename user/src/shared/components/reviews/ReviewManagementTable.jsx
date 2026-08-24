import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoRecord from "../other/NoRecord";
import TableHeader from "../table/tableHeader";
import SearchInput from "../form/SearchInput";
import SelectDropdown from "../form/SelectDropdown";
import ReactPagination from "../table/ReactPagination";
import PaginationDropdown from "../table/PaginationDropdown";
import useDebounce from "../hooks/useDebounce";
import Loader from "../loader";
import { pipViewDate } from "../../utils/pip";
import ReviewDetailsModal from "../modals/ReviewDetailsModal";
import { fetchHostReviews } from "../../../redux/features/host/actions/bookingAction";

const ReviewManagementTable = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [isViewModal, setIsViewModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState({});
  const debouncedSearch = useDebounce(searchFilter, 500);

  const {
    isLoading,
    hostReviewsHeader,
    hostReviewsFilter,
    hostReviewsList,
    hostReviewsTotal,
  } = useSelector((state) => state.host.booking);

  const pageCount = useMemo(
    () => Math.ceil((hostReviewsTotal || 0) / listPerPages),
    [hostReviewsTotal, listPerPages]
  );

  useEffect(() => {
    dispatch(
      fetchHostReviews({
        payload: {
          search: debouncedSearch || "",
          rating: selectedRating || "",
          page: currentPage + 1,
          limit: listPerPages,
        },
      })
    );
  }, [dispatch, debouncedSearch, selectedRating, currentPage, listPerPages]);

  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearch, selectedRating]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-end gap-3 ct_flex_col_575">
        <SearchInput
          value={searchFilter}
          onChange={setSearchFilter}
          placeholder="Search by guest name or email"
        />
        <SelectDropdown
          id="ratingFilter"
          options={hostReviewsFilter}
          selectedValue={selectedRating}
          onChange={setSelectedRating}
        />
      </div>
      <div className="table-responsive mt-3 ct_custom_table">
        <table className="table">
          <TableHeader data={hostReviewsHeader} />
          {hostReviewsList?.length > 0 && (
            <tbody>
              {hostReviewsList?.map((item, index) => {
                const ratingValue = Number(item?.rating);
                return (
                  <tr key={item?.rating_id || index}>
                    <td>{currentPage * listPerPages + index + 1}</td>
                    <td>{item?.guest_name || "#N/A"}</td>
                    <td>
                      <span className="ct_overlay_text">
                        {item?.property_title || "#N/A"}
                      </span>
                    </td>
                    <td>
                      <span className="ct_text_clr_4B5563">
                        <i className="fa-solid fa-star"></i>{" "}
                        {Number.isFinite(ratingValue)
                          ? ratingValue.toFixed(1)
                          : "#N/A"}
                      </span>
                    </td>
                    <td>
                      <span className="ct_overlay_text">
                        {item?.review || "#N/A"}
                      </span>
                    </td>
                    <td>{pipViewDate(item?.created_at) || "#N/A"}</td>
                    <td>
                      <div className="d-flex align-items-center gap-3 justify-content-end">
                        <a
                          href="#"
                          className="text-dark"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedReview(item);
                            setIsViewModal(true);
                          }}
                        >
                          <i className="fa-regular fa-eye"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {hostReviewsList?.length <= 0 && <NoRecord />}
      </div>
      {hostReviewsList?.length > 0 && (
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
              pageCount={pageCount}
              onPageChange={(data) => setCurrentPage(data?.selected)}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
      <ReviewDetailsModal
        data={selectedReview}
        isViewModal={isViewModal}
        setIsViewModal={setIsViewModal}
      />
    </>
  );
};

export default ReviewManagementTable;

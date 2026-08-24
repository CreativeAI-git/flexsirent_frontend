import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { pipViewDate } from "../../utills/pip";
import Loader from "../../components/form/Loader";
import { pageRoutes } from "../../routes/PageRoutes";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../shared/layout/PanelLayout";
import SearchInput from "../../components/form/SearchInput";
import useDebounce from "../../components/hooks/useDebounce";
import ReviewModal from "../../components/modal/ReviewModal";
import DeleteModal from "../../components/modal/DeleteModal";
import NoRecord from "../../shared/components/others/NoRecord";
import TableHeader from "../../shared/components/Table/TableHeader";
import ReactPagination from "../../shared/components/Table/ReactPagination";
import PaginationDropdown from "../../shared/components/Table/PaginationDropdown";
import {
  deleteReview,
  fetchReviews,
} from "../../redux/actions/serviceFeeAction";
import ImageWithPreview from "../../components/image preview/imageWithPreview";

const Reviews = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");
  const debouncedSearch = useDebounce(searchFilter, 500);

  const [isViewModal, setIsViewModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const [sortType, setSortType] = useState("newest");
  const [ratingFilter, setRatingFilter] = useState("all");

  const { reviewTableHeader, reviewList, isLoading } = useSelector(
    (state) => state?.serviceFeeReducers,
  );
  const formatRating = (rating) => Number(rating).toFixed(1);

  const filteredList = reviewList
    ?.filter((item) => {
      const fullName = `${item?.user_first_name} ${item?.user_last_name}`;

      // Search filter
      const searchMatch = debouncedSearch
        ? fullName?.toLowerCase()?.includes(debouncedSearch?.toLowerCase())
        : true;

      // Rating filter
      const ratingMatch =
        ratingFilter === "all"
          ? true
          : Math.floor(item?.rating) === Number(ratingFilter);

      return searchMatch && ratingMatch;
    })
    ?.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);

      if (sortType === "newest") return dateB - dateA;
      if (sortType === "oldest") return dateA - dateB;

      // default recent
      return dateB - dateA;
    });

  const paginatedList = filteredList?.slice(
    currentPage * listPerPages,
    (currentPage + 1) * listPerPages,
  );
  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  useEffect(() => {
    dispatch(fetchReviews());
  }, []);

  const handleDeleteReview = () => {
    const callback = (res) => {
      if (res?.success) {
        setIsDeleteModal(false);
        dispatch(fetchReviews());
      }
    };
    dispatch(deleteReview({ payload: id, callback }));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout>
      <div className="d-flex align-items-center justify-content-between gap-3 ct_flex_col_575 pb-4">
        <h4 className="ct_fs_24 ct_fw_600 mb-0 ct_black_text">Reviews</h4>
      </div>
      <div class="d-flex align-items-center justify-content-between gap-2 ct_flex_col_767 pb-4">
        <div class="ct_search ct_w_100_search_767">
          <SearchInput
            value={searchFilter}
            onChange={setSearchFilter}
            placeholder="Search by user name"
          />

          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div class="d-flex align-items-center justify-content-between gap-2 ct_flex_col_767 ct_w_100_767">
          <div class="form-group ct_w_100_767">
            <select
              class="form-control ct_input ct_input_h_50 ct_light_blue_input_border"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <div class="form-group ct_w_100_767">
            <select
              class="form-control ct_input ct_input_h_50 ct_light_blue_input_border"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Star</option>
              <option value="4">4 Star</option>
              <option value="3">3 Star</option>
              <option value="2">2 Star</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          <div class="ct_w_100_767">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate(pageRoutes?.addReview);
              }}
              class="ct_orange_btn"
            >
              + Add Review
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive ct_custom_table">
            <table className="table">
              <TableHeader data={reviewTableHeader} />
              <tbody>
                {paginatedList?.map((item, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                      <span>
                        <ImageWithPreview
                          image={item?.image || "user_profile.png"}
                          className="ct_img_40"
                        />
                      </span>
                    </td>
                    <td>
                      {`${item?.user_first_name} ${item?.user_last_name}` ||
                        "#N/A"}
                    </td>
                    <td>
                      {`${item?.host_first_name} ${item?.host_last_name}` ||
                        "#N/A"}
                    </td>
                    <td>{item?.property_title ?? "#N/A"}</td>

                    <td>
                      <span class="ct_text_clr_4B5563">
                        <i class="fa-solid fa-star"></i>{" "}
                        {formatRating(item?.rating) || "#N/A"}
                      </span>
                    </td>
                    <td>
                      <span className="ct_overlay_text">
                        {item?.review ?? "#N/A"}
                      </span>
                    </td>
                    <td>{pipViewDate(item?.created_at) ?? "#N/A"}</td>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setId(item);
                            setIsViewModal(true);
                          }}
                          // data-bs-toggle="modal"
                          // data-bs-target="#ct_review_detail"
                          className="ct_text_39A1FF"
                        >
                          <i className="fa-solid fa-eye fs-5"></i>
                        </a>
                        {/* <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(pageRoutes.editReview, {
                              state: { data: item },
                            });
                          }}
                          className="text-dark"
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </a> */}
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setId(item?.rating_id);
                            setIsDeleteModal(true);
                          }}
                          className="ct_red_clr"
                        >
                          <i className="fa-solid fa-trash-can fs-5"></i>
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
                  pageCount={Math.ceil(filteredList?.length / listPerPages)}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Review Detail Modal */}
      <ReviewModal
        data={id}
        isViewModal={isViewModal}
        setIsViewModal={setIsViewModal}
      />
      <DeleteModal
        isViewModal={isDeleteModal}
        setIsViewModal={setIsDeleteModal}
        heading="Delete Review"
        value="Are you sure you want to delete this review?"
        handleDelete={handleDeleteReview}
      />
    </PanelLayout>
  );
};

export default Reviews;

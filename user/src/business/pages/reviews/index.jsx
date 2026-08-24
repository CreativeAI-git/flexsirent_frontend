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

const Reviews = () => {
  const navigate = useLocalizedNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedValue, setSelectedValue] = useState();
  const [selectedValue1, setSelectedValue1] = useState();
  const { isLoading, reviewsHeader, reviewsList, starOpt, dayOpt } =
    useSelector((state) => state.business.management);

  const user = { name: "Reviews", role: "guestBusiness" };

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  const paginatedList = reviewsList
    ?.filter((item) => {
      const search = item?.host
        ?.toLowerCase()
        ?.includes(searchFilter?.toLowerCase());
      return search;
    })
    ?.slice(currentPage * listPerPages, (currentPage + 1) * listPerPages);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout user={user}>
      <div className="d-flex align-items-center justify-content-end gap-3 ct_flex_col_575">
        <SearchInput
          value={searchFilter}
          onChange={setSearchFilter}
          placeholder="Search by host"
        />
        <SelectDropdown
          id="statusfilter"
          defaultOptions=""
          options={starOpt}
          selectedValue={selectedValue}
          onChange={setSelectedValue}
        />
        <SelectDropdown
          id="dayfilter"
          defaultOptions=""
          options={dayOpt}
          selectedValue={selectedValue1}
          onChange={setSelectedValue1}
        />
      </div>
      <div className="row ct_mt_40">
        <div className="col-md-12">
          <div className="table-responsive ct_custom_table">
            <table className="table ">
              <TableHeader data={reviewsHeader} />
              {paginatedList?.length > 0 && (
                <tbody>
                  {paginatedList?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.host || "#N/A"}</td>
                      <td>{item?.guest || "#N/A"}</td>
                      <td>{item?.property_title || "#N/A"}</td>
                      <td>
                        <span className="ct_text_clr_4B5563">
                          <i className="fa-solid fa-star"></i> {item?.rating || "0"}
                        </span>
                      </td>
                      <td>{item?.date || "#N/A"}</td>
                      <td>{item?.review || "#N/A"}</td>

                      <td>
                        <div className="d-flex align-items-center gap-3 justify-content-end">
                          <a
                            href="javascript:void(0)"
                            data-bs-toggle="modal"
                            data-bs-target="#ct_review_detail"
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
                  pageCount={Math.ceil(reviewsList?.length / listPerPages)}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="ct_review_detail"
        tabindex="-1"
        aria-labelledby="ct_review_detail"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title" id="ct_review_detail">Feedback Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body pb-5">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div>
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12.5 10C14.7091 10 16.5 8.20914 16.5 6C16.5 3.79086 14.7091 2 12.5 2C10.2909 2 8.5 3.79086 8.5 6C8.5 8.20914 10.2909 10 12.5 10Z" stroke="#282828" strokeWidth="1.725" />
                      <path d="M20.5 17.5001C20.5 19.9851 20.5 22.0001 12.5 22.0001C4.5 22.0001 4.5 19.9851 4.5 17.5001C4.5 15.0151 8.082 13.0001 12.5 13.0001C16.918 13.0001 20.5 15.0151 20.5 17.5001Z" stroke="#282828" strokeWidth="1.725" />
                    </svg>
                    Renny Smith
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 16.5H7.5M9 16.5H10.5M9 12H10.5M6 12H7.5M6 7.5H7.5M9 7.5H10.5M20.25 20.25H3.75V3.75H12.75V11.25H20.25V20.25ZM12.75 14.25H17.25V20.25H12.75V14.25Z" stroke="#0D0D0D" strokeWidth="1.75" />
                    </svg>
                    Apartment
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div>
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.5 22H10.5C6.729 22 4.843 22 3.672 20.828C2.501 19.656 2.5 17.771 2.5 14V12C2.5 8.229 2.5 6.343 3.672 5.172C4.844 4.001 6.729 4 10.5 4H14.5C18.271 4 20.157 4 21.328 5.172C22.499 6.344 22.5 8.229 22.5 12V14C22.5 17.771 22.5 19.657 21.328 20.828C20.675 21.482 19.8 21.771 18.5 21.898M7.5 4V2.5M17.5 4V2.5M22 9H11.25M2.5 9H6.375"
                        stroke="#282828"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path d="M18.5 17C18.5 17.2652 18.3946 17.5196 18.2071 17.7071C18.0196 17.8946 17.7652 18 17.5 18C17.2348 18 16.9804 17.8946 16.7929 17.7071C16.6054 17.5196 16.5 17.2652 16.5 17C16.5 16.7348 16.6054 16.4804 16.7929 16.2929C16.9804 16.1054 17.2348 16 17.5 16C17.7652 16 18.0196 16.1054 18.2071 16.2929C18.3946 16.4804 18.5 16.7348 18.5 17ZM18.5 13C18.5 13.2652 18.3946 13.5196 18.2071 13.7071C18.0196 13.8946 17.7652 14 17.5 14C17.2348 14 16.9804 13.8946 16.7929 13.7071C16.6054 13.5196 16.5 13.2652 16.5 13C16.5 12.7348 16.6054 12.4804 16.7929 12.2929C16.9804 12.1054 17.2348 12 17.5 12C17.7652 12 18.0196 12.1054 18.2071 12.2929C18.3946 12.4804 18.5 12.7348 18.5 13ZM13.5 17C13.5 17.2652 13.3946 17.5196 13.2071 17.7071C13.0196 17.8946 12.7652 18 12.5 18C12.2348 18 11.9804 17.8946 11.7929 17.7071C11.6054 17.5196 11.5 17.2652 11.5 17C11.5 16.7348 11.6054 16.4804 11.7929 16.2929C11.9804 16.1054 12.2348 16 12.5 16C12.7652 16 13.0196 16.1054 13.2071 16.2929C13.3946 16.4804 13.5 16.7348 13.5 17ZM13.5 13C13.5 13.2652 13.3946 13.5196 13.2071 13.7071C13.0196 13.8946 12.7652 14 12.5 14C12.2348 14 11.9804 13.8946 11.7929 13.7071C11.6054 13.5196 11.5 13.2652 11.5 13C11.5 12.7348 11.6054 12.4804 11.7929 12.2929C11.9804 12.1054 12.2348 12 12.5 12C12.7652 12 13.0196 12.1054 13.2071 12.2929C13.3946 12.4804 13.5 12.7348 13.5 13ZM8.5 17C8.5 17.2652 8.39464 17.5196 8.20711 17.7071C8.01957 17.8946 7.76522 18 7.5 18C7.23478 18 6.98043 17.8946 6.79289 17.7071C6.60536 17.5196 6.5 17.2652 6.5 17C6.5 16.7348 6.60536 16.4804 6.79289 16.2929C6.98043 16.1054 7.23478 16 7.5 16C7.76522 16 8.01957 16.1054 8.20711 16.2929C8.39464 16.4804 8.5 16.7348 8.5 17ZM8.5 13C8.5 13.2652 8.39464 13.5196 8.20711 13.7071C8.01957 13.8946 7.76522 14 7.5 14C7.23478 14 6.98043 13.8946 6.79289 13.7071C6.60536 13.5196 6.5 13.2652 6.5 13C6.5 12.7348 6.60536 12.4804 6.79289 12.2929C6.98043 12.1054 7.23478 12 7.5 12C7.76522 12 8.01957 12.1054 8.20711 12.2929C8.39464 12.4804 8.5 12.7348 8.5 13Z" fill="#282828" />
                    </svg>
                    12 May 2025, 10 AM
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18.75 9.75C18.75 7.95979 18.0388 6.2429 16.773 4.97703C15.5071 3.71116 13.7902 3 12 3C10.2098 3 8.4929 3.71116 7.22703 4.97703C5.96116 6.2429 5.25 7.95979 5.25 9.75C5.25 12.519 7.4655 16.128 12 20.451C16.5345 16.128 18.75 12.519 18.75 9.75ZM12 22.5C6.4995 17.5005 3.75 13.2495 3.75 9.75C3.75 7.56196 4.61919 5.46354 6.16637 3.91637C7.71354 2.36919 9.81196 1.5 12 1.5C14.188 1.5 16.2865 2.36919 17.8336 3.91637C19.3808 5.46354 20.25 7.56196 20.25 9.75C20.25 13.2495 17.5005 17.5005 12 22.5Z" fill="#0D0D0D" />
                      <path d="M12 12C12.5967 12 13.169 11.7629 13.591 11.341C14.0129 10.919 14.25 10.3467 14.25 9.75C14.25 9.15326 14.0129 8.58097 13.591 8.15901C13.169 7.73705 12.5967 7.5 12 7.5C11.4033 7.5 10.831 7.73705 10.409 8.15901C9.98705 8.58097 9.75 9.15326 9.75 9.75C9.75 10.3467 9.98705 10.919 10.409 11.341C10.831 11.7629 11.4033 12 12 12ZM12 13.5C11.0054 13.5 10.0516 13.1049 9.34835 12.4017C8.64509 11.6984 8.25 10.7446 8.25 9.75C8.25 8.75544 8.64509 7.80161 9.34835 7.09835C10.0516 6.39509 11.0054 6 12 6C12.9946 6 13.9484 6.39509 14.6517 7.09835C15.3549 7.80161 15.75 8.75544 15.75 9.75C15.75 10.7446 15.3549 11.6984 14.6517 12.4017C13.9484 13.1049 12.9946 13.5 12 13.5Z" fill="#0D0D0D" />
                    </svg>
                    123 Main St, New York
                  </div>
                </div>
              </div>
              <ul>
                <li>
                  <h5 className="ct_fs_16 mb-3">Rating</h5>
                  <ul className="d-flex align-items-center gap-2">
                    <li>
                      <i className="fa-solid fa-star ct_orange_text ct_fs_20"></i>
                    </li>
                    <li>
                      <i className="fa-solid fa-star ct_orange_text ct_fs_20"></i>
                    </li>
                    <li>
                      <i className="fa-solid fa-star ct_orange_text ct_fs_20"></i>
                    </li>
                    <li>
                      <i className="fa-solid fa-star ct_orange_text ct_fs_20"></i>
                    </li>
                    <li>
                      <i className="fa-regular fa-star ct_orange_text ct_fs_20"></i>
                    </li>
                  </ul>
                </li>
                <li className="mt-4">
                  <h5 className="ct_fs_16 mb-3">Review</h5>
                  <textarea className="form-control ct_input h-auto" rows="4" disabled>Doctor was very helpful and explained the treatment clearly. Good experience overall. The consultation felt personalized, and I appreciated the time taken to answer all my questions. I left feeling informed and reassured about the next steps. Highly recommended!</textarea>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </PanelLayout>
  );
};

export default Reviews;

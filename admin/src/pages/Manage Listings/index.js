import { useState } from "react";
import { useNavigate } from "react-router";
import { pageRoutes } from "../../routes/PageRoutes";
import SubHeader from "../../shared/layout/SubHeader";
import PanelLayout from "../../shared/layout/PanelLayout";
import SearchInput from "../../components/form/SearchInput";
import DeleteModal from "../../components/modal/DeleteModal";
import NoRecord from "../../shared/components/others/NoRecord";
import TableHeader from "../../shared/components/Table/TableHeader";
import ReactPagination from "../../shared/components/Table/ReactPagination";
import PaginationDropdown from "../../shared/components/Table/PaginationDropdown";

const ManageListings = () => {
  const navigate = useNavigate();
  const [searchFilter, setSearchFilter] = useState("");
  const [isViewModal, setIsViewModal] = useState(false);

  const tableHeader = [
    "S.No.",
    "Property ID",
    "Title",
    "Host Name",
    "Location",
    "Date",
    "Status",
    "Actions",
  ];
  const list = [
    {
      property_id: "12345",
      title: "Luxury Beachfront Villa",
      location: "Miami, FL",
      host: "John Smith",
      date: "08 May 2025",
      status: true,
    },
    {
      property_id: "12345",
      title: "Luxury Beachfront Villa",
      location: "Miami, FL",
      host: "John Smith",
      date: "08 May 2025",
      status: false,
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);

  const paginatedList = list?.slice(
    currentPage * listPerPages,
    (currentPage + 1) * listPerPages
  );

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  return (
    <PanelLayout>
      <SubHeader
        label="Manage Listings"
        isBtn={true}
        btnRoute={pageRoutes.addListingDetail}
        btnName="+ Add New Listing"
      />

      <div class="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 pb-4">
        <SearchInput
          value={searchFilter}
          onChange={setSearchFilter}
          placeholder="Search by title"
        />
        <div class="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 ct_w_100_767">
          <div class="ct_w_100_575">
            <label for="ct_import">
              <input type="file" class="d-none" accept="image/*" id="ct_import" />
              <span class="ct_orange_btn">
                <i class="fa-solid fa-file-import me-2"></i> Import
              </span>
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive ct_custom_table">
            <table className="table">
              <TableHeader data={tableHeader} />
              <tbody>
                {paginatedList?.map((item, i) => (
                  <tr>
                    <td>{i + 1}</td>

                    <td>#{item?.property_id ?? "#N/A"}</td>
                    <td>{item?.title ?? "#N/A"}</td>
                    <td>{item?.host ?? "#N/A"}</td>
                    <td>{item?.location ?? "#N/A"}</td>
                    <td>{item?.date ?? "#N/A"}</td>
                    <td>
                      <label class="toggle-switch">
                        <input type="checkbox" checked={item?.status} />
                        <div class="toggle-switch-background">
                          <div class="toggle-switch-handle"></div>
                        </div>
                      </label>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(pageRoutes.listingDetail);
                          }}
                          className="ct_text_39A1FF"
                        >
                          <i className="fa-solid fa-eye"></i>
                        </a>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(pageRoutes.editListingDetail);
                          }}
                          className="text-dark"
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </a>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsViewModal(true);
                          }}
                          className="ct_red_clr"
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
                  pageCount={Math.ceil(list?.length / listPerPages)}
                  onPageChange={handlePageClick}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <DeleteModal
        isViewModal={isViewModal}
        setIsViewModal={setIsViewModal}
        heading="Delete Listing"
        value="Are you sure you want to delete this listing?"
      />
    </PanelLayout>
  );
};

export default ManageListings;

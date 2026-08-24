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

const ManageReservation = () => {
  const navigate = useNavigate();
  const [searchFilter, setSearchFilter] = useState("");
  const [isViewModal, setIsViewModal] = useState(false);

  const tableHeader = [
    "S.No.",
    "Booking ID",
    "Property",
    "Guest Name",
    "Host Name",
    "Check-in",
    "Check-out",
    "Status",
    "Actions",
  ];
  const list = [
    {
      bookingId: "BK-2401",
      property: "Luxury Ocean Villa",
      guest: "Emma Thompson",
      host: "John Davis",
      checkIn: "08 May 2025",
      checkOut: "08 May 2025",
      status: "Pending",
    },
    {
      bookingId: "BK-2401",
      property: "Luxury Ocean Villa",
      guest: "Emma Thompson",
      host: "John Davis",
      checkIn: "08 May 2025",
      checkOut: "08 May 2025",
      status: "Cancelled",
    },
    {
      bookingId: "BK-2401",
      property: "Luxury Ocean Villa",
      guest: "Emma Thompson",
      host: "John Davis",
      checkIn: "08 May 2025",
      checkOut: "08 May 2025",
      status: "Confirmed",
    },
  ];
  const tableClass = (status, type = "col") => {
    switch (status) {
      case "Cancelled":
        return type == "row" ? "ct_red_light_status" : "ct_red_clr";
      case "Confirmed":
        return type == "row" ? "ct_green_light_status" : "ct_green_clr";
      case "Pending":
        return type == "row" ? "ct_brown_light_status" : "ct_brown_clr";
    }
  };

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
      <SubHeader label="Manage Reservation" />

      <div class="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 pb-4">
        <SearchInput
          value={searchFilter}
          onChange={setSearchFilter}
          placeholder="Search by property"
        />
        <div class="d-flex align-items-center justify-content-between gap-3 ct_flex_col_767 ct_w_100_767">
          <div class="form-group ct_w_100_767">
            <select class="form-control ct_input ct_input_h_50 ct_light_blue_input_border">
              <option value="">Filter by role</option>
              <option value="">User</option>
              <option value="">Guest</option>
            </select>
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
                  <tr className={tableClass(item?.status, "row")}>
                    <td>{i + 1}</td>

                    <td>{item?.bookingId ?? "#N/A"}</td>
                    <td>{item?.property ?? "#N/A"}</td>
                    <td>{item?.guest ?? "#N/A"}</td>
                    <td>{item?.host ?? "#N/A"}</td>
                    <td>{item?.checkIn ?? "#N/A"}</td>
                    <td>{item?.checkOut ?? "#N/A"}</td>
                    <td>
                      <span
                        class={`${tableClass(item.status, "col")} ct_fw_600`}
                      >
                        {item?.status}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(pageRoutes.reservationDetails);
                          }}
                          className="ct_text_39A1FF"
                        >
                          <i className="fa-solid fa-eye"></i>
                        </a>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(pageRoutes?.editReservationDetail);
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
        heading="Delete Reservation"
        value="Are you sure you want to delete this reservation?"
      />
    </PanelLayout>
  );
};

export default ManageReservation;

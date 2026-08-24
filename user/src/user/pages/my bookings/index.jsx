import { webPath } from "../../routes";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useEffect, useState } from "react";
import Loader from "../../../shared/components/loader";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../../shared/layout/PanelLayout";
import { curSym, pipViewDate } from "../../../shared/utils/pip";
import NoRecord from "../../../shared/components/other/NoRecord";
import ReactPagination from "../../../shared/components/table/ReactPagination";
import PaginationDropdown from "../../../shared/components/table/PaginationDropdown";
import { fetchMyBookings } from "../../../redux/features/user/actions/bookingAction";

const MyBookings = () => {
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const user = { name: "My Bookings", role: "guest" };
  const tabs = [
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Ongoing", value: "ongoing" },
  ];

  const { isLoading, userMyBookingList } = useSelector(
    (state) => state.guest.booking
  );

  const [activeTab, setActiveTab] = useState(tabs[0]?.value);

  const [currentPage, setCurrentPage] = useState(0);
  const [listPerPages, setListPerPages] = useState(5);

  const paginatedList =
    userMyBookingList[activeTab]?.slice(
      currentPage * listPerPages,
      (currentPage + 1) * listPerPages
    ) || [];

  const handlePageClick = (pageData) => {
    setCurrentPage(pageData?.selected);
  };

  const renderComponent = (bookingData) => {
    switch (activeTab) {
      case "completed":
        return (
          <>
            <p className="d-flex align-items-center gap-2 mb-1">
              <img loading="lazy"
                src="https://app.flexsirent.com/assets/img/dashbaord-images/outline_calnder_icon.png"
                alt=""
              />
              02 Jan, 2024 - {pipViewDate(bookingData?.booked_to)}
            </p>
          </>
        );
      case "cancelled":
        return (
          <>
            {" "}
            <p className="text-danger mb-1">
              Cancelled on: {pipViewDate(bookingData?.updated_at)}
            </p>
          </>
        );
      case "upcoming":
        return (
          <>
            {" "}
            <p className="ct_text_clr_0073D1 mb-1">
              Booked on: {pipViewDate(bookingData?.created_at)}
            </p>
          </>
        );
    }
  };

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout user={user}>
      <div className="col-md-12">
        <div className="row mt-5">
          <div className="col-md-12">
            <ul
              className="nav nav-pills mb-5 ct_custom_tabs justify-content-start "
              id="pills-tab"
              role="tablist"
            >
              {tabs?.map((item, index) => (
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ct_fw_500 ${item?.value == activeTab ? "active" : ""
                      }`}
                    onClick={() => setActiveTab(item?.value)}
                    type="button"
                    role="tab"
                  >
                    {item?.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="tab-content " id="pills-tabContent">
              <div
                className="tab-pane fade active show"
                id="pills-Completed"
                role="tabpanel"
                aria-labelledby="pills-Completed-tab"
              >
                <div className="row">
                  {paginatedList.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="col-xl-4 col-lg-6 col-md-6  mb-4 "
                      >
                        <figure className="ct_my_booking_card h-100">
                          <div className="ct_my_booking_img">
                            <img loading="lazy"
                              src={
                                item?.propertyImage
                                  ? item?.propertyImage[0]?.image
                                  : "#N/A"
                              }
                              alt=""
                            />
                            <span className="text-capitalize">{activeTab}</span>
                          </div>
                          <figcaption className="mt-3">
                            <div className="mb-4">
                              <h5 className="ct_overlay_text w-100 mb-3 ct_fs_18">
                                {item?.property_title || "#N/A"}
                              </h5>

                              <p className="ct_text_clr_4B5563 mb-2 d-flex align-items-start">
                                <img
                                  loading="lazy"
                                  src="https://app.flexsirent.com/assets/img/dashbaord-images/ep_location.svg"
                                  alt=""
                                  className="me-1 ct_text_op_6"
                                />
                                <span>{item?.address || "#N/A"}</span>
                              </p>

                              {renderComponent(item)}

                              <h4 className="ct_fs_18 mt-4">
                                <span className="ct_fw_600">
                                  {curSym}
                                  {item?.monthly_rent || "0"}
                                </span>
                                <span className="ct_text_op_6">/month</span>
                              </h4>
                            </div>

                            <div className="ct_booking_btn_wrap mt-auto">
                              <a
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigate(webPath.BookingDetails, {
                                    state: { data: item },
                                  });
                                }}
                                className="ct_orange_btn"
                              >
                                View Details
                              </a>
                            </div>
                          </figcaption>
                        </figure>
                      </div>
                    );
                  })}
                </div>
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
                        userMyBookingList[activeTab]?.length / listPerPages
                      )}
                      onPageChange={handlePageClick}
                      currentPage={currentPage}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
};

export default MyBookings;

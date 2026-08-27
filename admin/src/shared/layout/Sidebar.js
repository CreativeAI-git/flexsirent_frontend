import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { pageRoutes } from "../../routes/PageRoutes";
import { useLocation, useNavigate } from "react-router";
import { toggleSideBarView } from "../../redux/reducers/authReducers";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
    const scrollRef = useRef(null);
  const role = localStorage.getItem("adminRole");
  const permission = JSON.parse(
    localStorage.getItem("subAdminPermission") || "[]"
  );

  const adminSidebar = [
    {
      name: "Dashboard",
      img: "assets/img/dashboard_icon.svg",
      path: pageRoutes.dashboard,
    },
    {
      name: "User Management",
      img: "assets/img/user_management_icon.svg",
      path: pageRoutes.userManagement,
    },
    {
      name: "Host Management",
      img: "assets/img/host_management_icon.svg",
      path: pageRoutes.hostManagement,
    },
    {
      name: "Business Management",
      img: "assets/img/business_management_icon.svg",
      path: pageRoutes.businessManagement,
    },
    {
      name: "Host Business Management",
      img: "assets/img/host_business_management_icon.svg",
      path: pageRoutes.hostBusinessManagement,
    },
    {
      name: "Property Management",
      img: "assets/img/property_management_icon.svg",
      path: pageRoutes.propertyManagement,
    },
    {
      name: "Booking Overview",
      img: "assets/img/booking_review_icon.svg",
      path: pageRoutes.bookingmanagement,
    },
    // {
    //     name: "Contracts",
    //     img: "assets/img/contract_icon.svg",
    //     path: ''
    // },
    {
      name: "Blog Management",
      img: "assets/img/blog_management_icon.svg",
      path: pageRoutes.blogManagement,
    },
    {
      name: "Reviews",
      img: "assets/img/reviews_icon.svg",
      path: pageRoutes.reviews,
    },

    {
      name: "Sub Admin",
      img: "assets/img/sub admin icon.svg",
      path: pageRoutes.subAdmin,
    },
    // {
    //   name: "Booking Calendar",
    //   img: "assets/img/booking_calander_icon.svg",
    //   path: pageRoutes.bookingCalender,
    // },
    {
      name: "Chat Management",
      img: "assets/img/chat_management_icon.svg",
      path: pageRoutes.chatManagement,
    },
    {
      name: "Cancellation Policy Management",
      img: "assets/img/policy_management_icon.svg",
      path: pageRoutes.cancellationPolicyManagement,
    },
    {
      name: "Policy Management",
      img: "assets/img/policy_management_icon.svg",
      path: pageRoutes.policyManagement,
    },
    {
      name: "SEO Management",
      img: "assets/img/seo_management_icon.svg",
      path: pageRoutes.seoManagement,
    },
    // {
    //   name: "Manage Listing",
    //   img: "assets/img/listing_request_icon.svg",
    //   path: pageRoutes.manageListings,
    // },
    {
      name: "Listing Request",
      img: "assets/img/Listing request icon.svg",
      path: pageRoutes.listingsRequest,
    },
    // {
    //   name: "Manage Reservation",
    //   img: "assets/img/manage_reservation_icon.svg",
    //   path: pageRoutes.manageReservation,
    // },
    {
      name: "Manage Inquiry",
      img: "assets/img/manage_inquiry_icon.svg",
      path: pageRoutes.manageInquiry,
    },
    {
      name: "Offers",
      img: "assets/img/offers.svg",
      path: pageRoutes.offers,
    },
    {
      name: "Report Management",
      img: "assets/img/report_management_icon.svg",
      path: pageRoutes.reportManagement,
    },
    {
      name: "Manage Service Fee",
      img: "assets/img/manage_Service_fee_icon.svg",
      path: pageRoutes?.manageServiceFee,
    },
    {
      name: "Manage Payout",
      img: "assets/img/manage_payout_icon.svg",
      path: pageRoutes?.managePayout,
    },
    {
      name: "Support Tickets",
      img: "assets/img/support_icon.svg",
      path: pageRoutes.support,
    },
    {
      name: "Contact Us",
      img: "assets/img/contact_us_icon.svg",
      path: pageRoutes?.contactUs,
    },
    {
      name: "KYC Management",
      img: "assets/img/verification_manangement_icon.svg",
      path: pageRoutes?.verificationManagement,
    },
  ];
  const filteredSidebar =
    adminSidebar?.filter((item) =>
      permission?.some((perm) => perm?.title === item?.name)
    ) || [];

  const sidemenu = role == "Admin" ? adminSidebar : filteredSidebar;

    useEffect(() => {
      const savedScroll = sessionStorage.getItem("admin-sidebarScroll");
      if (scrollRef.current && savedScroll) {
        scrollRef.current.scrollTop = Number(savedScroll);
      }
    }, []);
  

  return (
    <div className="ct_side_bar">
      <div
        className="ct_close_sidebar ct_cursor_pointer"
        onClick={() => dispatch(toggleSideBarView(false))}
      >
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className="ct_admin_logo">
        <img  loading="lazy" src="assets/img/logo.svg" alt="" />
      </div>
      <ul ref={scrollRef}>
        {sidemenu?.map((item) => (
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                 if (scrollRef.current) {
                  sessionStorage.setItem(
                    "admin-sidebarScroll",
                    scrollRef.current.scrollTop,
                  );
                }
                navigate(item?.path);
              }}
              className={pathname == item?.path ? "active" : ""}
            >
              <img  loading="lazy" src={item?.img} alt="" />
              {item?.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

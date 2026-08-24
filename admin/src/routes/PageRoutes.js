import { lazy } from "react";

const MyProfile = lazy(() => import("../pages/Auth"));
const Reviews = lazy(() => import("../pages/Reviews"));
const Support = lazy(() => import("../pages/Support"));
const Booking = lazy(() => import("../pages/Bookings"));
const Login = lazy(() => import("../pages/Auth/Login"));
const SubAdmin = lazy(() => import("../pages/Sub Admin"));
const ContactUs = lazy(() => import("../pages/contact us"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const BlogManagement = lazy(() => import("../pages/Blogs"));
const EditBlog = lazy(() => import("../pages/Blogs/EditBlog"));
const AddBlogs = lazy(() => import("../pages/Blogs/AddBlogs"));
const Notification = lazy(() => import("../pages/Notification"));
const ManagePayout = lazy(() => import("../pages/Manage Payout"));
const Offers = lazy(() => import("../pages/Offers"));
const PropertyManagement = lazy(() => import("../pages/Property"));
const AddReview = lazy(() => import("../pages/Reviews/AddReview"));
const ManageInquiry = lazy(() => import("../pages/Manage Inquiry"));
const SeoManagement = lazy(() => import("../pages/Seo Management"));
const EditProfile = lazy(() => import("../pages/Auth/EditProfile"));
// const EditReview = lazy(() => import("../pages/Reviews/EditReview"));
const BlogDetails = lazy(() => import("../pages/Blogs/BlogDetails"));
const HostManagement = lazy(() => import("../pages/HostManagement"));
const UserManagement = lazy(() => import("../pages/User Management"));
const ChatManagement = lazy(() => import("../pages/Chat Management"));
// const ManageListings = lazy(() => import("../pages/Manage Listings"));
const ListingsRequest = lazy(() => import("../pages/Listings Request"));
// const BookingCalender = lazy(() => import("../pages/Booking Calender"));
const AddSubAdmin = lazy(() => import("../pages/Sub Admin/AddSubAdmin"));
const ForgotPassword = lazy(() => import("../pages/Auth/ForgotPassword"));
const ChangePassword = lazy(() => import("../pages/Auth/ChangePassword"));
const CancellationPolicyManagement = lazy(
  () => import("../pages/Cancellation Policy Management"),
);
const PolicyManagement = lazy(() => import("../pages/Policy Management"));
const ReportManagement = lazy(() => import("../pages/Report Management"));
const ManageServiceFee = lazy(() => import("../pages/Manage Service Fee"));
// const ManageReservation = lazy(() => import("../pages/Manage Reservation"));
const BusinessManagment = lazy(() => import("../pages/BusinessManagement"));
const BookingDetails = lazy(() => import("../pages/Bookings/BookingDetails"));
const HostDetails = lazy(() => import("../pages/HostManagement/HostDetails"));
const SubAdminDetail = lazy(() => import("../pages/Sub Admin/SubAdminDetail"));
const PropertyDetails = lazy(() => import("../pages/Property/PropertyDetails"));

const VerificationManagement = lazy(
  () => import("../pages/Verification Management"),
);
const HostBusinessManagement = lazy(
  () => import("../pages/Host Business Management"),
);
const ContactUsDetails = lazy(
  () => import("../pages/contact us/ContactUsDetails"),
);
const EditSubAdminDetail = lazy(
  () => import("../pages/Sub Admin/EditSubAdminDetail"),
);
const AddListingDetail = lazy(
  () => import("../pages/Manage Listings/AddListingDetail"),
);
const BusinessDetails = lazy(
  () => import("../pages/BusinessManagement/BusinessDetails"),
);
const ReportDetail = lazy(
  () => import("../pages/Report Management/ReportDetail"),
);
const ViewUserDetails = lazy(
  () => import("../pages/User Management/ViewUserDetails"),
);
const AddReport = lazy(
  () => import("../pages/Report Management/AddReportDetails"),
);
const ServiceFeeDetail = lazy(
  () => import("../pages/Manage Service Fee/ServiceFeeDetail"),
);
const AddServiceFeeDetail = lazy(
  () => import("../pages/Manage Service Fee/AddServiceFeeDetail"),
);
const EditReportDetail = lazy(
  () => import("../pages/Report Management/EditReportDetail"),
);
const EditListingDetail = lazy(
  () => import("../pages/Listings Request/EditListingDetail"),
);
const ReservationDetails = lazy(
  () => import("../pages/Manage Reservation/ReservationDetails"),
);
const EditReservationDetail = lazy(
  () => import("../pages/Manage Reservation/EditReservationDetail"),
);
const EditServiceFeeDetail = lazy(
  () => import("../pages/Manage Service Fee/EditServiceFeeDetail"),
);
const VarificationDetail = lazy(
  () => import("../pages/Verification Management/VarificationDetail"),
);
const HostBusinessDetails = lazy(
  () => import("../pages/Host Business Management/HostBusinessDetails"),
);
const EditVarificationDetail = lazy(
  () => import("../pages/Verification Management/EditVarificationDetail"),
);


export const pageRoutes = {
  dashboard: "/",
  login: "/login",
  bookingDetails: "/booking-details/:id",
  userManagement: "/user-management",
  userDetails: "/user-details",
  notification: "/notification",
  myProfile: "/my-profile",
  editProfile: "/edit-profile",
  changePassword: "/change-password",
  hostManagement: "/host-management",
  hostDetails: "/host-details",
  propertyDetails: "/property-details",
  businessManagement: "/business-management",
  businessDetails: "/business-details",
  propertyManagement: "/property-management",
  bookingmanagement: "/booking-management",
  blogManagement: "/blog-management",
  addBlog: "/add-blog",
  blogDetails: "/blog-details",
  editBlogs: "/update-blog",
  reviews: "/reviews",
  // editReview: "/edit-review",
  addReview: "/add-review",
  support: "/support",
  cancellationPolicyManagement: "/cancellation-policy-management",
  policyManagement: "/policy-management",
  seoManagement: "/seo-management",
  managePayout: "/manage-payout",
  verificationManagement: "/verification-management",
  varificationDetail: "/verification-details",
  editVarificationDetail: "/edit-verification-details",
  manageServiceFee: "/manage-service-fee",
  serviceFeeDetail: "/service-fee-details",
  editServiceFeeDetail: "/edit-service-fee-details",
  addServiceFeeDetail: "/add-service-fee-details",
  reportManagement: "/report-management",
  addReport: "/add-report",
  reportDetail: "/report-details",
  editReportDetail: "/edit-report-details",
  manageInquiry: "/manage-inquiry",
  offers: "/offers",
  // inquiryDetails: "/inquiry-details",
  // manageReservation: "/manage-reservation",
  reservationDetails: "/reservation-details",
  editReservationDetail: "/edit-reservation-details",
  listingsRequest: "/listings-request",
  listingDetail: "/listing-details",
  editListingDetail: "/edit-listing-details",
  // manageListings: "/manage-listing",
  addListingDetail: "/add-listing",
  subAdmin: "/sub-admin",
  addSubAdmin: "/add-sub-admin",
  subAdminDetail: "/sub-admin-details",
  editSubAdminDetail: "/edit-sub-admin-details",
  // bookingCalender: "/booking-calender",
  chatManagement: "/chat-management",
  forgotPassword: "/forgot-password",
  contactUs: "/contact-us",
  contactUsDetails: "/contact-us-details",
  hostBusinessManagement: "/host-business-management",
  hostBusinessDetails: "/host-business-details",
};

export const AllAdminRoutes = [
  {
    name: "Dashboard",
    path: pageRoutes.dashboard,
    element: <Dashboard />,
    isPrivate: true,
  },
  {
    name: "Forgot Password",
    path: pageRoutes.forgotPassword,
    element: <ForgotPassword />,
    isPrivate: false,
  },
  {
    name: "Booking Details",
    path: pageRoutes.bookingDetails,
    element: <BookingDetails />,
    isPrivate: true,
  },
  {
    name: "User Management",
    path: pageRoutes.userManagement,
    element: <UserManagement />,
    isPrivate: true,
  },
  {
    name: "User Details",
    path: pageRoutes.userDetails,
    element: <ViewUserDetails />,
    isPrivate: true,
  },
  {
    name: "Notification",
    path: pageRoutes.notification,
    element: <Notification />,
    isPrivate: true,
  },
  {
    name: "My Profile",
    path: pageRoutes.myProfile,
    element: <MyProfile />,
    isPrivate: true,
  },
  {
    name: "Edit Profile",
    path: pageRoutes.editProfile,
    element: <EditProfile />,
    isPrivate: true,
  },
  {
    name: "Change Password",
    path: pageRoutes.changePassword,
    element: <ChangePassword />,
    isPrivate: true,
  },
  {
    name: "Host Management",
    path: pageRoutes.hostManagement,
    element: <HostManagement />,
    isPrivate: true,
  },
  {
    name: "Host Details",
    path: pageRoutes.hostDetails,
    element: <HostDetails />,
    isPrivate: true,
  },
  {
    name: "Property Details",
    path: pageRoutes.propertyDetails,
    element: <PropertyDetails />,
    isPrivate: true,
  },
  {
    name: "Business Management",
    path: pageRoutes.businessManagement,
    element: <BusinessManagment />,
    isPrivate: true,
  },
  {
    name: "Business Details",
    path: pageRoutes.businessDetails,
    element: <BusinessDetails />,
    isPrivate: true,
  },
  {
    name: "Business Details",
    path: pageRoutes.propertyManagement,
    element: <PropertyManagement />,
    isPrivate: true,
  },
  {
    name: "Booking",
    path: pageRoutes.bookingmanagement,
    element: <Booking />,
    isPrivate: true,
  },
  {
    name: "Blog Management",
    path: pageRoutes.blogManagement,
    element: <BlogManagement />,
    isPrivate: true,
  },
  {
    name: "Add Blog",
    path: pageRoutes.addBlog,
    element: <AddBlogs />,
    isPrivate: true,
  },
  {
    name: "Blog Details",
    path: pageRoutes.blogDetails,
    element: <BlogDetails />,
    isPrivate: true,
  },
  {
    name: "Edit Blog",
    path: pageRoutes.editBlogs,
    element: <EditBlog />,
    isPrivate: true,
  },
  {
    name: "Reviews",
    path: pageRoutes.reviews,
    element: <Reviews />,
    isPrivate: true,
  },
  // {
  //   name: "EditReview",
  //   path: pageRoutes.editReview,
  //   element: <EditReview />,
  //   isPrivate: true,
  // },
  {
    name: "AddReview",
    path: pageRoutes.addReview,
    element: <AddReview />,
    isPrivate: true,
  },
  {
    name: "Support",
    path: pageRoutes.support,
    element: <Support />,
    isPrivate: true,
  },
  {
    name: "CancellationPolicyManagement",
    path: pageRoutes.cancellationPolicyManagement,
    element: <CancellationPolicyManagement />,
    isPrivate: true,
  },
  {
    name: "PolicyManagement",
    path: pageRoutes.policyManagement,
    element: <PolicyManagement />,
    isPrivate: true,
  },
  {
    name: "SeoManagement",
    path: pageRoutes.seoManagement,
    element: <SeoManagement />,
    isPrivate: true,
  },
  {
    name: "ManagePayout",
    path: pageRoutes.managePayout,
    element: <ManagePayout />,
    isPrivate: true,
  },
  {
    name: "VerificationManagement",
    path: pageRoutes.verificationManagement,
    element: <VerificationManagement />,
    isPrivate: true,
  },
  {
    name: "VarificationDetail",
    path: pageRoutes.varificationDetail,
    element: <VarificationDetail />,
    isPrivate: true,
  },
  {
    name: "EditVarificationDetail",
    path: pageRoutes.editVarificationDetail,
    element: <EditVarificationDetail />,
    isPrivate: true,
  },
  {
    name: "ManageServiceFee",
    path: pageRoutes.manageServiceFee,
    element: <ManageServiceFee />,
    isPrivate: true,
  },
  {
    name: "ServiceFeeDetail",
    path: pageRoutes.serviceFeeDetail,
    element: <ServiceFeeDetail />,
    isPrivate: true,
  },
  {
    name: "EditServiceFeeDetail",
    path: pageRoutes.editServiceFeeDetail,
    element: <EditServiceFeeDetail />,
    isPrivate: true,
  },
  {
    name: "AddServiceFeeDetail",
    path: pageRoutes.addServiceFeeDetail,
    element: <AddServiceFeeDetail />,
    isPrivate: true,
  },
  {
    name: "ReportManagement",
    path: pageRoutes.reportManagement,
    element: <ReportManagement />,
    isPrivate: true,
  },
  {
    name: "AddReport",
    path: pageRoutes.addReport,
    element: <AddReport />,
    isPrivate: true,
  },
  {
    name: "ReportDetail",
    path: pageRoutes.reportDetail,
    element: <ReportDetail />,
    isPrivate: true,
  },
  {
    name: "EditReportDetail",
    path: pageRoutes.editReportDetail,
    element: <EditReportDetail />,
    isPrivate: true,
  },
  {
    name: "ManageInquiry",
    path: pageRoutes.manageInquiry,
    element: <ManageInquiry />,
    isPrivate: true,
  },
  {
    name: "Offers",
    path: pageRoutes.offers,
    element: <Offers />,
    isPrivate: true,
  },
  // {
  //   name: "ManageReservation",
  //   path: pageRoutes.manageReservation,
  //   element: <ManageReservation />,
  //   isPrivate: true,
  // },
  {
    name: "ReservationDetails",
    path: pageRoutes.reservationDetails,
    element: <ReservationDetails />,
    isPrivate: true,
  },
  {
    name: "EditReservationDetail",
    path: pageRoutes.editReservationDetail,
    element: <EditReservationDetail />,
    isPrivate: true,
  },
  {
    name: "ListingsRequest",
    path: pageRoutes.listingsRequest,
    element: <ListingsRequest />,
    isPrivate: true,
  },

  {
    name: "EditListingDetail",
    path: pageRoutes.editListingDetail,
    element: <EditListingDetail />,
    isPrivate: true,
  },
  // {
  //   name: "ManageListings",
  //   path: pageRoutes.manageListings,
  //   element: <ManageListings />,
  //   isPrivate: true,
  // },
  // {
  //   name: "AddListingDetail",
  //   path: pageRoutes.addListingDetail,
  //   element: <AddListingDetail />,
  //   isPrivate: true,
  // },
  {
    name: "SubAdmin",
    path: pageRoutes.subAdmin,
    element: <SubAdmin />,
    isPrivate: true,
  },
  {
    name: "AddSubAdmin",
    path: pageRoutes.addSubAdmin,
    element: <AddSubAdmin />,
    isPrivate: true,
  },
  {
    name: "SubAdminDetail",
    path: pageRoutes.subAdminDetail,
    element: <SubAdminDetail />,
    isPrivate: true,
  },
  {
    name: "EditSubAdminDetail",
    path: pageRoutes.editSubAdminDetail,
    element: <EditSubAdminDetail />,
    isPrivate: true,
  },
  // {
  //   name: "BookingCalender",
  //   path: pageRoutes.bookingCalender,
  //   element: <BookingCalender />,
  //   isPrivate: true,
  // },
  {
    name: "ChatManagement",
    path: pageRoutes.chatManagement,
    element: <ChatManagement />,
    isPrivate: true,
  },
  {
    name: "Login",
    path: pageRoutes.login,
    element: <Login />,
    isPrivate: false,
  },
  {
    name: "ContactUs",
    path: pageRoutes.contactUs,
    element: <ContactUs />,
    isPrivate: false,
  },
  {
    name: "ContactUsDetails",
    path: pageRoutes.contactUsDetails,
    element: <ContactUsDetails />,
    isPrivate: false,
  },
  {
    name: "HostBusinessManagement",
    path: pageRoutes.hostBusinessManagement,
    element: <HostBusinessManagement />,
    isPrivate: false,
  },
  {
    name: "HostBusinessDetails",
    path: pageRoutes.hostBusinessDetails,
    element: <HostBusinessDetails />,
    isPrivate: false,
  },
];

import { lazy } from "react";

const Dashboard = lazy(() => import("../pages"));
const Inbox = lazy(() => import("../pages/inbox"));
const Reports = lazy(() => import("../pages/Reports"));
const Home = lazy(() => import("../../shared/pages/index"));
const WishList = lazy(() => import("../pages/wishlist"));
const Help = lazy(() => import("../../shared/pages/Help"));
const Blogs = lazy(() => import("../../shared/pages/blogs"));
const MyBookings = lazy(() => import("../pages/my bookings"));
const MyProfile = lazy(() => import("../pages/auth/MyProfile"));
const NewSupport = lazy(() => import("../pages/inbox/NewSupport"));
const Notifications = lazy(() => import("../pages/notifications"));
const EditProfile = lazy(() => import("../pages/auth/EditProfile"));
const Bookings = lazy(() => import("../pages/my bookings/bookings"));
const PaymentHistory = lazy(() => import("../pages/payment history"));
const Properties = lazy(() => import("../../shared/pages/properties"));
const KYCVerification = lazy(() => import("../pages/kyc varification"));
const Appartments = lazy(() => import("../../shared/pages/appartments"));
const PropertyData = lazy(() => import("../pages/wishlist/PropertyData"));
const ChangePassword = lazy(() => import("../pages/auth/ChangePassword"));
const InquiryManagement = lazy(() => import("../pages/inquiry management"));
const PaymentFailed = lazy(() => import("../../shared/pages/PaymentFailed"));
const PaymentSuccess = lazy(() => import("../../shared/pages/PaymentSuccess"));
const BlogDetails = lazy(() => import("../../shared/pages/blogs/BlogDetails"));
const GuestCommunications = lazy(() => import("../pages/guest communications"));
const PanelCancellationPolicy = lazy(() =>
  import("../pages/cancellations policy")
);

const BookingDetails = lazy(() =>
  import("../pages/my bookings/BookingDetails")
);
const BookProperty = lazy(() =>
  import("../../shared/pages/properties/BookProperty")
);
const BecomeHost = lazy(() =>
  import("../../shared/pages/become a host/BecomeHost")
);
const BookApartment = lazy(() =>
  import("../../shared/pages/appartments/BookApartment")
);
const ImportedList = lazy(() =>
  import("../../shared/pages/become a host/ImportedList")
);
const PropertyDetails = lazy(() =>
  import("../../shared/pages/properties/PropertyDetails")
);
const PaymentHistoryDetails = lazy(() =>
  import("../pages/payment history/PaymentHistoryDetails")
);
const HostingProcess = lazy(() =>
  import("../../shared/pages/become a host/HostingProcess")
);
const ApartmentDetails = lazy(() =>
  import("../../shared/pages/appartments/ApartmentDetails")
);
const BecomeHostProcess = lazy(() =>
  import("../../shared/pages/become a host/BecomeHostProcess")
);
const PrivacyPolicy = lazy(() =>
  import("../../shared/pages/content management/PrivacyPolicy")
);
const TermAndConditions = lazy(() =>
  import("../../shared/pages/content management/TermAndConditions")
);
const CancellationPolicies = lazy(() =>
  import("../../shared/pages/content management/CancellationPolicies")
);

export const webPath = {
  Home: "",
  AISearch: "ai-search",
  Appartments: "appartments",
  Properties: "properties",
  PropertyDetails: "property-details",
  PropertyDetailsById: "property/:propertyId",
  ApartmentDetails: "apartment-details",
  BecomeHost: "become-a-host",
  BecomeHostProcess: "become-a-host-process",
  HostingProcess: "hosting-process",
  ImportedList: "imported-list",
  Blogs: "blogs",
  BlogDetails: "blog-details",
  Help: "help",
  PrivacyPolicy: "privacy-policy",
  BookApartment: "book-apartment",
  Dashboard: "guest",
  Inbox: "guest/inbox",
  InquiryManagement: "guest/inquiry-management",
  Reports: "guest/reports",
  WishList: "guest/wishList",
  PropertyData: "guest/property-details",
  BookProperty: "guest/property-booking",
  MyBookings: "guest/my-bookings",
  Bookings: "guest/bookings",
  BookingDetails: "guest/booking-details",
  Notifications: "guest/notifications",
  MyProfile: "guest/my-profile",
  EditProfile: "guest/edit-profile",
  ChangePassword: "guest/change-password",
  PaymentHistory: "guest/payment-history",
  PaymentHistoryDetails: "guest/payment-history-details",
  KYCVerification: "guest/kyc-varification",
  GuestCommunications: "guest/communications",
  GuestCancellationPolicy: "guest/cancellation-policy",
  newSupport: "guest/new-support",
  TermAndConditions: "terms-and-condotions",
  cancellationPolicy: "cancellation-policy",
  PaymentSuccess: "success",
  PaymentFailed: "failed",
};

export const AllGuestRoutes = [
  {
    name: "Home",
    path: webPath.Home,
    element: <Home />,
    isPrivate: false,
  },
  {
    name: "AISearch",
    path: webPath.AISearch,
    element: <Home />,
    isPrivate: false,
  },
  {
    name: "Appartments",
    path: webPath.Appartments,
    element: <Appartments />,
    isPrivate: false,
  },
  {
    name: "Properties",
    path: webPath.Properties,
    element: <Properties />,
    isPrivate: false,
  },
  {
    name: "PropertyDetails",
    path: webPath.PropertyDetails,
    element: <PropertyDetails />,
    isPrivate: false,
  },
  {
    name: "PropertyDetailsById",
    path: webPath.PropertyDetailsById,
    element: <PropertyDetails />,
    isPrivate: false,
  },
  {
    name: "ApartmentDetails",
    path: webPath.ApartmentDetails,
    element: <ApartmentDetails />,
    isPrivate: false,
  },
  {
    name: "BecomeHost",
    path: webPath.BecomeHost,
    element: <BecomeHost />,
    isPrivate: false,
  },
  {
    name: "BecomeHostProcess",
    path: webPath.BecomeHostProcess,
    element: <BecomeHostProcess />,
    isPrivate: false,
  },
  {
    name: "HostingProcess",
    path: webPath.HostingProcess,
    element: <HostingProcess />,
    isPrivate: false,
  },
  {
    name: "ImportedList",
    path: webPath.ImportedList,
    element: <ImportedList />,
    isPrivate: false,
  },
  {
    name: "Blogs",
    path: webPath.Blogs,
    element: <Blogs />,
    isPrivate: false,
  },
  {
    name: "BlogDetails",
    path: webPath.BlogDetails,
    element: <BlogDetails />,
    isPrivate: false,
  },
  {
    name: "Help",
    path: webPath.Help,
    element: <Help />,
    isPrivate: false,
  },
  {
    name: "PrivacyPolicy",
    path: webPath.PrivacyPolicy,
    element: <PrivacyPolicy />,
    isPrivate: false,
  },
  {
    name: "TermAndConditions",
    path: webPath.TermAndConditions,
    element: <TermAndConditions />,
    isPrivate: false,
  },
  {
    name: "CancellationPolicies",
    path: webPath.cancellationPolicy,
    element: <CancellationPolicies />,
    isPrivate: false,
  },
  {
    name: "BookApartment",
    path: webPath.BookApartment,
    element: <BookApartment />,
    isPrivate: false,
  },
  {
    name: "Dashboard",
    path: webPath.Dashboard,
    element: <Dashboard />,
    isPrivate: false,
  },
  {
    name: "Inbox",
    path: webPath.Inbox,
    element: <Inbox />,
    isPrivate: false,
  },
  {
    name: "InquiryManagement",
    path: webPath.InquiryManagement,
    element: <InquiryManagement />,
    isPrivate: false,
  },
  {
    name: "Reports",
    path: webPath.Reports,
    element: <Reports />,
    isPrivate: false,
  },
  {
    name: "WishList",
    path: webPath.WishList,
    element: <WishList />,
    isPrivate: false,
  },
  {
    name: "PropertyData",
    path: webPath.PropertyData,
    element: <PropertyData />,
    isPrivate: false,
  },
  {
    name: "BookProperty",
    path: webPath.BookProperty,
    element: <BookProperty />,
    isPrivate: false,
  },
  {
    name: "MyBookings",
    path: webPath.MyBookings,
    element: <MyBookings />,
    isPrivate: false,
  },
  {
    name: "BookingDetails",
    path: webPath.BookingDetails,
    element: <BookingDetails />,
    isPrivate: false,
  },
  {
    name: "Bookings",
    path: webPath.Bookings,
    element: <Bookings />,
    isPrivate: false,
  },
  {
    name: "Notifications",
    path: webPath.Notifications,
    element: <Notifications />,
    isPrivate: false,
  },
  {
    name: "MyProfile",
    path: webPath.MyProfile,
    element: <MyProfile />,
    isPrivate: false,
  },
  {
    name: "EditProfile",
    path: webPath.EditProfile,
    element: <EditProfile />,
    isPrivate: false,
  },
  {
    name: "ChangePassword",
    path: webPath.ChangePassword,
    element: <ChangePassword />,
    isPrivate: false,
  },
  {
    name: "PaymentHistory",
    path: webPath.PaymentHistory,
    element: <PaymentHistory />,
    isPrivate: false,
  },
  {
    name: "PaymentHistoryDetails",
    path: webPath.PaymentHistoryDetails,
    element: <PaymentHistoryDetails />,
    isPrivate: false,
  },
  {
    name: "KYCVerification",
    path: webPath.KYCVerification,
    element: <KYCVerification />,
    isPrivate: false,
  },
  {
    name: "GuestCommunications",
    path: webPath.GuestCommunications,
    element: <GuestCommunications />,
    isPrivate: false,
  },
  {
    name: "GuestCancellationPolicy",
    path: webPath.GuestCancellationPolicy,
    element: <PanelCancellationPolicy />,
    isPrivate: false,
  },
  {
    name: "NewSupport",
    path: webPath.newSupport,
    element: <NewSupport />,
    isPrivate: false,
  },
  {
    name: "PaymentSuccess",
    path: webPath.PaymentSuccess,
    element: <PaymentSuccess />,
    isPrivate: false,
  },
  {
    name: "PaymentFailed",
    path: webPath.PaymentFailed,
    element: <PaymentFailed />,
    isPrivate: false,
  },
];

import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/index"));
const Offers = lazy(() => import("../pages/Offers"));
const Reports = lazy(() => import("../pages/Reports"));
const Reviews = lazy(() => import("../pages/reviews"));
const Support = lazy(() => import("../pages/Support"));
const MyProfile = lazy(() => import("../pages/auth/MyProfile"));
const Bookings = lazy(() => import("../pages/bookings/Bookings"));
const BusinessRules = lazy(() => import("../pages/Business Rules"));
const SubHostManagement = lazy(() => import("../pages/Sub Host"));
const AddSubHost = lazy(() => import("../pages/Sub Host/AddSubHost"));
const EditSubHost = lazy(() => import("../pages/Sub Host/EditSubHost"));
const Property = lazy(() => import("../../host/pages/PropertyList"));
const Notifications = lazy(() => import("../pages/notifications"));
const PayoutReports = lazy(() => import("../pages/payout reports"));
const EditProfile = lazy(() => import("../pages/auth/EditProfile"));
const KYCVerification = lazy(() => import("../pages/kyc varification"));
const ChangePassword = lazy(() => import("../pages/auth/ChangePassword"));
const BookingDetail = lazy(() => import("../pages/bookings/BookingDetail"));
const InquiryManagement = lazy(() => import("../pages/inquiry management"));
const CancellationPolicy = lazy(() => import("../pages/cancellations policy"));
const GuestCommunications = lazy(() => import("../pages/guest communications"));
const BookingRequests = lazy(() => import("../pages/bookings/BookingRequests"));
const AddListing = lazy(() => import("../../host/pages/PropertyList/AddListing"));
const EditProperty = lazy(() => import("../../host/pages/PropertyList/EditProperty"));
const ListingDetails = lazy(() => import("../../host/pages/PropertyList/ListingDetails"));
const SubHostDetails = lazy(() => import("../pages/Sub Host/SubHostDetails"));


const CleaningMaintenance = lazy(() =>
  import("../pages/cleaning & maintenance")
);
// const PricingAvailability = lazy(() =>
//   import("../pages/pricing & availability")
// );
const BookingPropertyDetail = lazy(() =>
  import("../components/pages/BookingPropertyDetail")
);
const AddNewPricing = lazy(() =>
  import("../pages/pricing & availability/AddNewPricing")
);
const EditNewPricing = lazy(() =>
  import("../pages/pricing & availability/EditNewPricing")
);


export const hostBusinessPaths = {
  Dashboard: "/host-business/",
  BookingDetail: "/host-business/booking-details",
  BookingRequests: "/host-business/booking-requests",
  Bookings: "/host-business/bookings",
  BookingPropertyDetail: "/host-business/booking-property-details",
  Notifications: "/host-business/notifications",
  MyProfile: "/host-business/my-profile",
  EditProfile: "/host-business/edit-profile",
  ChangePassword: "/host-business/change-password",
  GuestCommunications: "/host-business/communications",
  Reports: "/host-business/reports",
  Support: "/host-business/support",
  Offers: "/host-business/offers",
  Reviews: "/host-business/reviews",
  CancellationPolicy: "/host-business/cancellation-policy",
  KYCVerification: "/host-business/kyc-varification",
  BusinessRules: "/host-business/business-rules",
  PayoutReports: "/host-business/payout-reports",
  SubHostManagement: "/host-business/sub-host-management",
  SubUserAccess: "/host-business/sub-host-management",
  AddSubHost: "/host-business/add-sub-host",
  EditSubHost: "/host-business/edit-sub-host-details",
  SubHostDetails: "/host-business/sub-host-details",
  InquiryManagement: "/host-business/inquiry-management",
  CleaningMaintenance: "/host-business/cleaning-and-maintenance",
  // PricingAvailability: "/host-business/pricing-and-availability",
  AddNewPricing: "/host-business/add-new-pricing",
  EditNewPricing: "/host-business/edit-pricing",
  Property: "/host-business/property",
  AddListing: "/host-business/add-property",
  EditProperty: "/host-business/edit-property",
  ListingDetails: "/host-business/listing-details",
};

export const AllHostBusinessRoutes = [
  {
    name: "Dashboard",
    path: hostBusinessPaths.Dashboard,
    element: <Dashboard />,
    isPrivate: false,
  },
  {
    name: "BookingDetail",
    path: hostBusinessPaths.BookingDetail,
    element: <BookingDetail />,
    isPrivate: false,
  },
  {
    name: "BookingRequests",
    path: hostBusinessPaths.BookingRequests,
    element: <BookingRequests />,
    isPrivate: false,
  },
  {
    name: "Bookings",
    path: hostBusinessPaths.Bookings,
    element: <Bookings />,
    isPrivate: false,
  },
  {
    name: "BookingPropertyDetail",
    path: hostBusinessPaths.BookingPropertyDetail,
    element: <BookingPropertyDetail />,
    isPrivate: false,
  },
  {
    name: "Notifications",
    path: hostBusinessPaths.Notifications,
    element: <Notifications />,
    isPrivate: false,
  },
  {
    name: "MyProfile",
    path: hostBusinessPaths.MyProfile,
    element: <MyProfile />,
    isPrivate: false,
  },
  {
    name: "EditProfile",
    path: hostBusinessPaths.EditProfile,
    element: <EditProfile />,
    isPrivate: false,
  },
  {
    name: "ChangePassword",
    path: hostBusinessPaths.ChangePassword,
    element: <ChangePassword />,
    isPrivate: false,
  },
  {
    name: "GuestCommunications",
    path: hostBusinessPaths.GuestCommunications,
    element: <GuestCommunications />,
    isPrivate: false,
  },
  {
    name: "Support",
    path: hostBusinessPaths.Support,
    element: <Support />,
    isPrivate: false,
  },
  {
    name: "Reports",
    path: hostBusinessPaths.Reports,
    element: <Reports />,
    isPrivate: false,
  },
  {
    name: "Offers",
    path: hostBusinessPaths.Offers,
    element: <Offers />,
    isPrivate: false,
  },
  {
    name: "Reviews",
    path: hostBusinessPaths.Reviews,
    element: <Reviews />,
    isPrivate: false,
  },
  {
    name: "CancellationPolicy",
    path: hostBusinessPaths.CancellationPolicy,
    element: <CancellationPolicy />,
    isPrivate: false,
  },
  {
    name: "KYCVerification",
    path: hostBusinessPaths.KYCVerification,
    element: <KYCVerification />,
    isPrivate: false,
  },
  {
    name: "BusinessRules",
    path: hostBusinessPaths.BusinessRules,
    element: <BusinessRules />,
    isPrivate: false,
  },
  {
    name: "PayoutReports",
    path: hostBusinessPaths.PayoutReports,
    element: <PayoutReports />,
    isPrivate: false,
  },
  {
    name: "SubHostManagement",
    path: hostBusinessPaths.SubHostManagement,
    element: <SubHostManagement />,
    isPrivate: false,
  },
  {
    name: "AddSubHost",
    path: hostBusinessPaths.AddSubHost,
    element: <AddSubHost />,
    isPrivate: false,
  },
  {
    name: "EditSubHost",
    path: hostBusinessPaths.EditSubHost,
    element: <EditSubHost />,
    isPrivate: false,
  },
  {
    name: "SubHostDetails",
    path: hostBusinessPaths.SubHostDetails,
    element: <SubHostDetails />,
    isPrivate: false,
  },
  {
    name: "InquiryManagement",
    path: hostBusinessPaths.InquiryManagement,
    element: <InquiryManagement />,
    isPrivate: false,
  },
  {
    name: "CleaningMaintenance",
    path: hostBusinessPaths.CleaningMaintenance,
    element: <CleaningMaintenance />,
    isPrivate: false,
  },
  // {
  //   name: "PricingAvailability",
  //   path: hostBusinessPaths.PricingAvailability,
  //   element: <PricingAvailability />,
  //   isPrivate: false,
  // },
  {
    name: "AddNewPricing",
    path: hostBusinessPaths.AddNewPricing,
    element: <AddNewPricing />,
    isPrivate: false,
  },
  {
    name: "EditNewPricing",
    path: hostBusinessPaths.EditNewPricing,
    element: <EditNewPricing />,
    isPrivate: false,
  },
  {
    name: "Property",
    path: hostBusinessPaths.Property,
    element: <Property />,
    isPrivate: false,
  },
  {
    name: "AddListing",
    path: hostBusinessPaths.AddListing,
    element: <AddListing />,
    isPrivate: false,
  },
  {
    name: "EditProperty",
    path: hostBusinessPaths.EditProperty,
    element: <EditProperty />,
    isPrivate: false,
  },
  {
    name: "ListingDetails",
    path: hostBusinessPaths.ListingDetails,
    element: <ListingDetails />,
    isPrivate: false,
  },
];

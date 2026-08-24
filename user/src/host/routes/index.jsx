import { lazy } from "react";
import Reports from "../pages/Reports";

const Booking = lazy(() => import("../pages/Bookings"));
const Inbox = lazy(() => import("../pages/Inbox/index"));
const InquiryManagement = lazy(() => import("../pages/Inquiry Management"));
const Offers = lazy(() => import("../pages/Offers/index"));
const MyProfile = lazy(() => import("../pages/Auth/index"));
const Reviews = lazy(() => import("../pages/Reviews/index"));
const Property = lazy(() => import("../pages/PropertyList"));
const SubHostManagement = lazy(()=>import("../pages/Sub Host"));
const Dashboard = lazy(() => import("../pages/Dashboard/index"));
const BusinessRules = lazy(() => import("../pages/Business Rules"));
const AddSubHost = lazy(()=>import("../pages/Sub Host/AddSubHost"));
const EditSubHost = lazy(()=>import("../pages/Sub Host/EditSubHost"));
const Notification = lazy(() => import("../pages/Notification/index"));
const UpdateProfile = lazy(() => import("../pages/Auth/UpdateProfile"));
const ChangePassword = lazy(() => import("../pages/Auth/ChangePassword"));
const AddListing = lazy(() => import("../pages/PropertyList/AddListing"));
const SubHostDetails = lazy(()=>import("../pages/Sub Host/SubHostDetails"));
const HostCommunications = lazy(() => import("../pages/Host Communications"));
const ReservationRequest = lazy(() => import("../pages/Reservation Request"));
const BookingDetails = lazy(() => import("../pages/Bookings/BookingDetails"));
const EditProperty = lazy(() => import("../pages/PropertyList/EditProperty"));
const CleaningMaintenance = lazy(()=>import("../pages/cleaning & maintenance"));
const CancellationPolicy = lazy(() => import("../pages/cancellations policy"));
const AddPaymentDetails = lazy(() => import("../pages/Auth/AddPaymentDetails"));

const ListingDetails = lazy(() =>
  import("../pages/PropertyList/ListingDetails")
);
const ReservationRequestDetails = lazy(() =>
  import("../pages/Reservation Request/ReservationRequestDetails")
);

export const hostRoutes = {
  Dashboard: "/host/",
  BookingDetails: "/host/booking-details",
  ListingDetails: "/host/listing-details",
  Bookings: "/host/booking",
  Property: "/host/property",
  EditProperty: "/host/edit-property",
  Reviews: "/host/reviews",
  Offers: "/host/offers",
  Reports: "/host/reports",
  Inbox: "/host/support",
  InquiryManagement: "/host/inquiry-management",
  Notifications: "/host/notification",
  MyProfile: "/host/my-profile",
  UpdateProfile: "/host/edit-profile",
  AddHostPaymentDetails: "/host/add-payment-details",
  ChangePassword: "/host/change-password",
  AddListing: "/host/add-listing",
  HostCommunications: "/host/communication",
  BusinessRules: "/host/business-rules",
  CancellationPolicy: "/host/cancellation-policy",
  // ReservationRequest: "/host/reservation-request",
  // ReservationRequestDetails: "/host/reservation-request-details",
  CleaningMaintenance: "/host/cleaning-and-maintenance",
  SubHostManagement: "/host/sub-host-management",
  AddSubHost: "/host/add-sub-host",
  EditSubHost: "/host/edit-sub-host-details",
  SubHostDetails: "/host/sub-host-details",
};

export const AllHostsRoutes = [
  {
    name: "Dashboard",
    path: hostRoutes.Dashboard,
    element: <Dashboard />,
    isPrivate: false,
  },
  {
    name: "Booking Details",
    path: hostRoutes.BookingDetails,
    element: <BookingDetails />,
    isPrivate: false,
  },
  {
    name: "Listing Details",
    path: hostRoutes.ListingDetails,
    element: <ListingDetails />,
    isPrivate: false,
  },
  {
    name: "Bookings",
    path: hostRoutes.Bookings,
    element: <Booking />,
    isPrivate: false,
  },
  {
    name: "Property",
    path: hostRoutes.Property,
    element: <Property />,
    isPrivate: false,
  },
  {
    name: "Edit Property",
    path: hostRoutes.EditProperty,
    element: <EditProperty />,
    isPrivate: false,
  },
  {
    name: "Reviews",
    path: hostRoutes.Reviews,
    element: <Reviews />,
    isPrivate: false,
  },
  {
    name: "Offers",
    path: hostRoutes.Offers,
    element: <Offers />,
    isPrivate: false,
  },
  {
    name: "Reports",
    path: hostRoutes.Reports,
    element: <Reports />,
    isPrivate: false,
  },
  {
    name: "Inbox",
    path: hostRoutes.Inbox,
    element: <Inbox />,
    isPrivate: false,
  },
  {
    name: "InquiryManagement",
    path: hostRoutes.InquiryManagement,
    element: <InquiryManagement />,
    isPrivate: false,
  },
  {
    name: "Notification",
    path: hostRoutes.Notifications,
    element: <Notification />,
    isPrivate: false,
  },
  {
    name: "MyProfile",
    path: hostRoutes.MyProfile,
    element: <MyProfile />,
    isPrivate: false,
  },
  {
    name: "Edit Profile",
    path: hostRoutes.UpdateProfile,
    element: <UpdateProfile />,
    isPrivate: false,
  },
  {
    name: "Add Payment Details",
    path: hostRoutes.AddHostPaymentDetails,
    element: <AddPaymentDetails />,
    isPrivate: false,
  },
  {
    name: "Change Password",
    path: hostRoutes.ChangePassword,
    element: <ChangePassword />,
    isPrivate: false,
  },
  {
    name: "Add Listing",
    path: hostRoutes.AddListing,
    element: <AddListing />,
    isPrivate: false,
  },
  {
    name: "Host Communications",
    path: hostRoutes.HostCommunications,
    element: <HostCommunications />,
    isPrivate: false,
  },
  {
    name: "Business Rules",
    path: hostRoutes.BusinessRules,
    element: <BusinessRules />,
    isPrivate: false,
  },
  {
    name: "CancellationPolicy",
    path: hostRoutes.CancellationPolicy,
    element: <CancellationPolicy />,
    isPrivate: false,
  },
  // {
  //   name: "Reservation Request",
  //   path: hostRoutes.ReservationRequest,
  //   element: <ReservationRequest />,
  //   isPrivate: false,
  // },
  // {
  //   name: "Reservation Request Details",
  //   path: hostRoutes.ReservationRequestDetails,
  //   element: <ReservationRequestDetails />,
  //   isPrivate: false,
  // },
  {
    name: "CleaningMaintenance",
    path: hostRoutes.CleaningMaintenance,
    element: <CleaningMaintenance />,
    isPrivate: false,
  },
   {
      name: "SubHostManagement",
      path: hostRoutes.SubHostManagement,
      element: <SubHostManagement />,
      isPrivate: false,
    },
    {
      name: "AddSubHost",
      path: hostRoutes.AddSubHost,
      element: <AddSubHost />,
      isPrivate: false,
    },
    {
      name: "EditSubHost",
      path: hostRoutes.EditSubHost,
      element: <EditSubHost />,
      isPrivate: false,
    },
    {
      name: "SubHostDetails",
      path: hostRoutes.SubHostDetails,
      element: <SubHostDetails />,
      isPrivate: false,
    },
];

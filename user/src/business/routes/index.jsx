import { lazy } from "react";

const Dashboard = lazy(() => import("../pages"));
const Inbox = lazy(() => import("../pages/inbox"));
const GuestCommunications = lazy(() => import("../pages/guest communications"));
const InquiryManagement = lazy(() => import("../pages/inquiry management"));
const Reports = lazy(() => import("../pages/Reports"));
const Reviews = lazy(() => import("../pages/reviews"));
const Bookings = lazy(() => import("../pages/bookings"));
const Payments = lazy(() => import("../pages/payments"));
const Contracts = lazy(() => import("../pages/contracts"));
const KycUpload = lazy(() => import("../pages/kyc upload"));
const MyProfile = lazy(() => import("../pages/auth/MyProfile"));
const EditPayout = lazy(() => import("../pages/auth/EditPayout"));
const Invoices = lazy(() => import("../pages/payments/Invoices"));
const Notifications = lazy(() => import("../pages/notifications"));
const CancellationPolicy = lazy(() => import("../pages/cancellations policy"));
const EditProfile = lazy(() => import("../pages/auth/EditProfile"));
const PaymentHistory = lazy(() => import("../pages/payment history"));
const HostManagement = lazy(() => import("../pages/user management"));
const ChangePassword = lazy(() => import("../pages/auth/ChangePassword"));
const BookingDetails = lazy(() => import("../pages/bookings/BookingDetails"));
const ContractDetail = lazy(() => import("../pages/contracts/ContractDetail"));

const BusinessPropertyDetails = lazy(
  () => import("../components/my boookings/PropertyDetails"),
);
const PaymentHistoryDetails = lazy(
  () => import("../pages/payment history/PaymentHistoryDetails"),
);

export const businessPath = {
  Dashboard: "/guest-business",
  Bookings: "/guest-business/bookings",
  BookingDetails: "/guest-business/booking-details",
  BusinessPropertyDetails: "/guest-business/property-details",
  Payments: "/guest-business/payments",
  Invoices: "/guest-business/invoices",
  HostManagement: "/guest-business/user-management",
  // Inbox: "/guest-business/inbox",
  GuestCommunications: "/guest-business/communications",
  InquiryManagement: "/guest-business/inquiry-management",
  Reviews: "/guest-business/reviews",
  Reports: "/guest-business/reports",
  CancellationPolicy: "/guest-business/cancellation-policy",
  Notifications: "/guest-business/notifications",
  MyProfile: "/guest-business/my-profile",
  EditProfile: "/guest-business/edit-profile",
  ChangePassword: "/guest-business/change-password",
  EditPayout: "/guest-business/edit-payout-details",
  Contracts: "/guest-business/contracts",
  ContractDetail: "/guest-business/contract-details",
  KycUpload: "/guest-business/kyc-upload",
  PaymentHistory: "/guest-business/payment-history",
  PaymentHistoryDetails: "/guest-business/payment-history-details",
};

export const AllBusinessRoutes = [
  {
    name: "Dashboard",
    path: businessPath.Dashboard,
    element: <Dashboard />,
    isPrivate: false,
  },
  {
    name: "Bookings",
    path: businessPath.Bookings,
    element: <Bookings />,
    isPrivate: false,
  },
  {
    name: "BookingDetails",
    path: businessPath.BookingDetails,
    element: <BookingDetails />,
    isPrivate: false,
  },
  {
    name: "BusinessPropertyDetails",
    path: businessPath.BusinessPropertyDetails,
    element: <BusinessPropertyDetails />,
    isPrivate: false,
  },
  {
    name: "Payments",
    path: businessPath.Payments,
    element: <Payments />,
    isPrivate: false,
  },
  {
    name: "Invoices",
    path: businessPath.Invoices,
    element: <Invoices />,
    isPrivate: false,
  },
  {
    name: "HostManagement",
    path: businessPath.HostManagement,
    element: <HostManagement />,
    isPrivate: false,
  },
  // {
  //   name: "Inbox",
  //   path: businessPath.Inbox,
  //   element: <Inbox />,
  //   isPrivate: false,
  // },
  {
    name: "GuestCommunications",
    path: businessPath.GuestCommunications,
    element: <GuestCommunications />,
    isPrivate: false,
  },
  {
    name: "InquiryManagement",
    path: businessPath.InquiryManagement,
    element: <InquiryManagement />,
    isPrivate: false,
  },
  {
    name: "Reviews",
    path: businessPath.Reviews,
    element: <Reviews />,
    isPrivate: false,
  },
  {
    name: "Reports",
    path: businessPath.Reports,
    element: <Reports />,
    isPrivate: false,
  },
  {
    name: "CancellationPolicy",
    path: businessPath.CancellationPolicy,
    element: <CancellationPolicy />,
    isPrivate: false,
  },
  {
    name: "Notifications",
    path: businessPath.Notifications,
    element: <Notifications />,
    isPrivate: false,
  },
  {
    name: "MyProfile",
    path: businessPath.MyProfile,
    element: <MyProfile />,
    isPrivate: false,
  },
  {
    name: "EditProfile",
    path: businessPath.EditProfile,
    element: <EditProfile />,
    isPrivate: false,
  },
  {
    name: "EditPayout",
    path: businessPath.EditPayout,
    element: <EditPayout />,
    isPrivate: false,
  },
  {
    name: "Contracts",
    path: businessPath.Contracts,
    element: <Contracts />,
    isPrivate: false,
  },
  {
    name: "ContractDetail",
    path: businessPath.ContractDetail,
    element: <ContractDetail />,
    isPrivate: false,
  },
  {
    name: "ChangePassword",
    path: businessPath.ChangePassword,
    element: <ChangePassword />,
    isPrivate: false,
  },
  {
    name: "KycUpload",
    path: businessPath.KycUpload,
    element: <KycUpload />,
    isPrivate: false,
  },
  {
    name: "PaymentHistory",
    path: businessPath.PaymentHistory,
    element: <PaymentHistory />,
    isPrivate: false,
  },
  {
    name: "PaymentHistoryDetails",
    path: businessPath.PaymentHistoryDetails,
    element: <PaymentHistoryDetails />,
    isPrivate: false,
  },
];

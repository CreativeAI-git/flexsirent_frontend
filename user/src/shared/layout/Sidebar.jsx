import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { webPath } from "../../user/routes";
import { hostRoutes } from "../../host/routes";
import { businessPath } from "../../business/routes";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useLocation } from "react-router";
import { hostBusinessPaths } from "../../host business/routes";
import { toggleSideBarView } from "../../redux/features/host/reducers/authReducer";

import {
  BookingsSvg,
  DashbaordSvg,
  PaymentHistorySvg,
  WishlistSvg,
  ListingsSvg,
  ReviewsSvg,
  OffersSvg,
  InboxSvg,
  HostManagementSvg,
  ContractsSvg,
  InvoicesSvg,
  InquirySVG,
  KycSvg,
  CommunicationSvg,
  BusinessRuleSvg,
  BookingRequestSvg,
  CancellationPolicySvg,
  PayoutReportsSvg,
  CleaningMaintenanceSvg,
  PricingAvailabilitySvg,
  SubHostManagementSvg,
  ReportsSvg,
} from "../components/svg";
import { getPermissions } from "../utils/pip";
import { useEffect, useRef } from "react";

const Sidebar = ({ role }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const scrollRef = useRef(null);
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const permissions = getPermissions() || "[]";
  const isSubHost = typeof window !== "undefined" && localStorage.getItem("isSubHost") == "Yes";

  const menus = {
    host: [
      {
        name: t("sidebar.dashboard"),
        icon: <DashbaordSvg />,
        route: hostRoutes.Dashboard,
      },
      {
        name: t("sidebar.bookings"),
        icon: <BookingsSvg />,
        route: hostRoutes.Bookings,
      },
      {
        name: t("sidebar.property"),
        icon: <ListingsSvg />,
        route: hostRoutes.Property,
      },
      {
        name: t("sidebar.sub_host_management"),
        icon: <SubHostManagementSvg />,
        route: hostRoutes.SubHostManagement,
      },
      {
        name: t("sidebar.cleaning_maintenance"),
        icon: <CleaningMaintenanceSvg />,
        route: hostRoutes.CleaningMaintenance,
      },
      {
        name: t("sidebar.reviews"),
        icon: <ReviewsSvg />,
        route: hostRoutes.Reviews,
      },
      {
        name: t("sidebar.offers"),
        icon: <OffersSvg />,
        route: hostRoutes.Offers,
      },
      {
        name: t("sidebar.reports"),
        icon: <ReportsSvg />,
        route: hostRoutes.Reports,
      },
      {
        name: t("sidebar.support"),
        icon: <InboxSvg />,
        route: hostRoutes.Inbox,
      },
      {
        name: t("sidebar.inquiry_management"),
        icon: <InquirySVG />,
        route: hostRoutes.InquiryManagement,
      },
      {
        name: t("sidebar.communication"),
        icon: <CommunicationSvg />,
        route: hostRoutes.HostCommunications,
      },
      {
        name: t("sidebar.business_rules"),
        icon: <BusinessRuleSvg />,
        route: hostRoutes.BusinessRules,
      },
      {
        name: t("sidebar.cancellation_policy"),
        icon: <CancellationPolicySvg />,
        route: hostRoutes.CancellationPolicy,
      },
    ],
    hostBusiness: [
      {
        name: t("sidebar.dashboard"),
        icon: <DashbaordSvg />,
        route: hostBusinessPaths.Dashboard,
      },
      {
        name: t("sidebar.bookings"),
        icon: <BookingsSvg />,
        route: hostBusinessPaths.Bookings,
      },
      {
        name: t("sidebar.property"),
        icon: <ListingsSvg />,
        route: hostBusinessPaths.Property,
      },
      {
        name: t("sidebar.cleaning_maintenance"),
        icon: <CleaningMaintenanceSvg />,
        route: hostBusinessPaths.CleaningMaintenance,
      },
      {
        name: t("sidebar.communication"),
        icon: <CommunicationSvg />,
        route: hostBusinessPaths.GuestCommunications,
      },
      {
        name: t("sidebar.reports"),
        icon: <ReportsSvg />,
        route: hostBusinessPaths.Reports,
      },
      {
        name: t("sidebar.offers"),
        icon: <OffersSvg />,
        route: hostBusinessPaths.Offers,
      },
      {
        name: t("sidebar.reviews"),
        icon: <ReviewsSvg />,
        route: hostBusinessPaths.Reviews,
      },
      {
        name: t("sidebar.sub_host_management"),
        icon: <SubHostManagementSvg />,
        route: hostBusinessPaths.SubHostManagement,
      },
      {
        name: t("sidebar.inquiry_management"),
        icon: <InquirySVG />,
        route: hostBusinessPaths.InquiryManagement,
      },
      {
        name: t("sidebar.business_rules"),
        icon: <BusinessRuleSvg />,
        route: hostBusinessPaths.BusinessRules,
      },
      {
        name: t("sidebar.cancellation_policy"),
        icon: <CancellationPolicySvg />,
        route: hostBusinessPaths.CancellationPolicy,
      },
    ],
    guest: [
      {
        name: t("sidebar.dashboard"),
        icon: <DashbaordSvg />,
        route: webPath.Dashboard,
      },
      {
        name: t("sidebar.my_bookings"),
        icon: <BookingsSvg />,
        route: webPath.MyBookings,
      },
      {
        name: t("sidebar.bookings"),
        icon: <BookingsSvg />,
        route: webPath.Bookings,
      },
      {
        name: t("sidebar.payment_history"),
        icon: <PaymentHistorySvg />,
        route: webPath?.PaymentHistory,
      },
      {
        name: t("sidebar.wishlist"),
        icon: <WishlistSvg />,
        route: webPath.WishList,
      },
      {
        name: t("sidebar.support"),
        icon: <InboxSvg />,
        route: webPath.Inbox,
      },
      {
        name: t("sidebar.inquiry_management"),
        icon: <InquirySVG />,
        route: webPath.InquiryManagement,
      },
      {
        name: t("sidebar.reports"),
        icon: <ReportsSvg />,
        route: webPath.Reports,
      },
      {
        name: t("sidebar.communication"),
        icon: <CommunicationSvg />,
        route: webPath.GuestCommunications,
      },
      {
        name: t("sidebar.kyc_upload"),
        icon: <KycSvg />,
        route: webPath.KYCVerification,
      },
      {
        name: t("sidebar.cancellation_policy"),
        icon: <CancellationPolicySvg />,
        route: webPath.GuestCancellationPolicy,
      },
    ],
    guestBusiness: [
      {
        name: t("sidebar.dashboard"),
        icon: <DashbaordSvg />,
        route: businessPath.Dashboard,
      },
      {
        name: t("sidebar.bookings"),
        icon: <BookingsSvg />,
        route: businessPath.Bookings,
      },
      {
        name: t("sidebar.payment_history"),
        icon: <PaymentHistorySvg />,
        route: businessPath?.PaymentHistory,
      },
      {
        name: t("sidebar.user_management"),
        icon: <HostManagementSvg />,
        route: businessPath.HostManagement,
      },
      {
        name: t("sidebar.communication"),
        icon: <CommunicationSvg />,
        route: businessPath.GuestCommunications,
      },
      {
        name: t("sidebar.inquiry_management"),
        icon: <InquirySVG />,
        route: businessPath.InquiryManagement,
      },
      {
        name: t("sidebar.reports"),
        icon: <ReportsSvg />,
        route: businessPath.Reports,
      },
      {
        name: t("sidebar.kyc_upload"),
        icon: <KycSvg />,
        route: businessPath.KycUpload,
      },
      {
        name: t("sidebar.cancellation_policy"),
        icon: <CancellationPolicySvg />,
        route: businessPath.CancellationPolicy,
      },
    ],
  };

  useEffect(() => {
    const savedScroll = sessionStorage.getItem("sidebarScroll");
    if (scrollRef.current && savedScroll) {
      scrollRef.current.scrollTop = Number(savedScroll);
    }
  }, []);

  let roleMenus = menus[role] || [];
  if (role === "host" && isSubHost) {
    const allowedTitles = permissions.map((p) => p.title);
    roleMenus = roleMenus.filter((item) => allowedTitles.includes(item.name));
  }

  const isRouteActive = (route) => {
    if (!route) return false;
    const normalize = (path) => {
      let clean = path.replace(/^\/?(en|sv|fr|de|es|it)(\/|$)/, "$2");
      clean = clean.replace(/^\/+/, "").replace(/\/+$/, "");
      return clean;
    };
    return normalize(pathname) === normalize(route);
  };

  return (
    <div className="ct_side_bar">
      <div
        className="ct_close_sidebar ct_cursor_pointer"
        onClick={() => dispatch(toggleSideBarView(false))}
      >
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className="ct_admin_logo ct_cursor_pointer" onClick={() => {
        navigate(webPath?.Home)
      }}>
        <img loading="lazy" src="/assets/img/logo.svg" alt="" />
      </div>
      <ul className="ct_custom_scroll " ref={scrollRef}>
        {roleMenus?.map((item, index) => (
          <li className="ct_cursor_pointer" key={index}>
            <a
              className={isRouteActive(item?.route) ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                if (scrollRef.current) {
                  sessionStorage.setItem(
                    "sidebarScroll",
                    scrollRef.current.scrollTop,
                  );
                }
                navigate(item?.route);
              }}
            >
              {item?.icon || ""}
              {item?.name || ""}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

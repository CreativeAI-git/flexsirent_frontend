import { webPath } from "../../../user/routes";
import { hostRoutes } from "../../../host/routes";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useLocation, matchPath } from "react-router";
import { businessPath } from "../../../business/routes";
import { hostBusinessPaths } from "../../../host business/routes";

const BackButton = () => {
  const navigate = useLocalizedNavigate();
  const { pathname } = useLocation();
  const backButtonPaths = [
    webPath?.EditProfile,
    webPath?.PropertyData,
    webPath?.BookingDetails,
    webPath?.newSupport,
    webPath?.PaymentHistoryDetails,
    hostRoutes?.EditProperty,
    hostRoutes?.BookingDetails,
    hostRoutes?.ListingDetails,
    businessPath.BookingDetails,
    businessPath.PaymentHistoryDetails,
    businessPath.BusinessPropertyDetails,
    businessPath.Invoices,
    businessPath.EditProfile,
    businessPath.EditPayout,
    businessPath.ContractDetail,
    hostRoutes.AddListing,
    hostRoutes.ReservationRequestDetails,
    hostBusinessPaths.BookingDetail,
    hostBusinessPaths.BookingPropertyDetail,
    hostBusinessPaths.EditProfile,
    hostBusinessPaths.AddNewPricing,
    hostBusinessPaths?.EditNewPricing,
    hostBusinessPaths.AddListing,
    hostBusinessPaths.EditProperty,
    hostBusinessPaths.ListingDetails,
    hostRoutes.UpdateProfile,
    hostBusinessPaths.AddSubHost,
    hostBusinessPaths.EditSubHost,
    hostBusinessPaths.SubHostDetails,
    hostRoutes.AddSubHost,
    hostRoutes.EditSubHost,
    hostRoutes.SubHostDetails,
    webPath?.PropertyDetails
  ];
  // const shouldShowBackIcon = backButtonPaths.includes(pathname);
  const shouldShowBackIcon =
    backButtonPaths.includes(pathname) ||
    matchPath("/:lang/l/:id", pathname); // if language is in URL

  if (!shouldShowBackIcon) return null;
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
      className="ct_back_icon"
    >
      <i className="fa-solid fa-angle-left"></i>
    </a>
  );
};

export default BackButton;

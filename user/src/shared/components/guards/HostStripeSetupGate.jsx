import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { hostRoutes } from "../../../host/routes";
import { getProfile, getToken } from "../../utils/pip";
import { hostBusinessPaths } from "../../../host business/routes";
import HostStripeSetupModal from "../modals/HostStripeSetupModal";
import { fetchHostProfile } from "../../../redux/features/host/actions/authAction";

const panelConfig = {
  host: {
    pathPrefix: "/host",
    tokenPanel: "host",
    profilePanel: "host",
    userType: 1,
    redirectPath: hostRoutes.Dashboard,
  },
  hostBusiness: {
    pathPrefix: "/host-business",
    tokenPanel: "host-business",
    profilePanel: "hostBusiness",
    userType: 2,
    redirectPath: hostBusinessPaths.Dashboard,
  },
};

const HostStripeSetupGate = ({ panel, children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const config = panelConfig[panel];
  const [isStripeSetupModalOpen, setIsStripeSetupModalOpen] = useState(false);
  const [loginResponseData, setLoginResponseData] = useState(null);
  const [hasVerifiedStripe, setHasVerifiedStripe] = useState(false);

  useEffect(() => {
    if (!config || hasVerifiedStripe) {
      return;
    }

    const isPanelPath =
      location.pathname === config.pathPrefix ||
      location.pathname.startsWith(`${config.pathPrefix}/`);

    if (!isPanelPath || !getToken(config.tokenPanel)) {
      return;
    }

    const checkHostStripeStatus = async () => {
      const result = await dispatch(fetchHostProfile());
      const profileData = result?.payload?.data || getProfile(config.profilePanel) || {};

      if (profileData?.isStripeKycVerified === false) {
        setLoginResponseData({
          ...profileData,
          user_type: config.userType,
        });
        setIsStripeSetupModalOpen(true);
        return;
      }

      if (profileData?.isStripeKycVerified === true) {
        setHasVerifiedStripe(true);
        setIsStripeSetupModalOpen(false);
      }
    };

    checkHostStripeStatus();
  }, [config, dispatch, hasVerifiedStripe, location.pathname]);

  return (
    <>
      {children}
      {config ? (
        <HostStripeSetupModal
          isOpen={isStripeSetupModalOpen}
          closeModal={setIsStripeSetupModalOpen}
          loginResponseData={loginResponseData}
          redirectPath={config.redirectPath}
        />
      ) : null}
    </>
  );
};

export default HostStripeSetupGate;

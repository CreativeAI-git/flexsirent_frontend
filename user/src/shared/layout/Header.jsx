import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getProfile } from "../utils/pip";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { webPath } from "../../user/routes";
import { hostRoutes } from "../../host/routes";
import ProfileMenu from "../components/ProfileMenu";
import { businessPath } from "../../business/routes";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../components/other/BackButton";
import { hostBusinessPaths } from "../../host business/routes";
import { fetchUserProfile } from "../../redux/features/user/actions/authAction";
import { toggleSideBarView } from "../../redux/features/host/reducers/authReducer";
import {
  fetchHostProfile,
} from "../../redux/features/host/actions/authAction";
import LanguageModal from "../components/modals/LanguageModal";

const Header = ({ name, role }) => {
  const { t, i18n } = useTranslation();
  const navigate = useLocalizedNavigate();
  const dispatch = useDispatch();
  const [handleLanguageModal, setHandleLanguageModal] = useState(false);

  const roleRoutes = {
    host: hostRoutes,
    guestBusiness: businessPath,
    hostBusiness: hostBusinessPaths,
    guest: webPath,
  };

  // Choose route set based on role
  const routes = roleRoutes[role];

  useEffect(() => {
    if (!role) return;
    const profile = getProfile(role);
    if (!Object.keys(profile).length) {
      if (role == "guest" || role == "guestBusiness")
        dispatch(fetchUserProfile());
      if (role == "host" || role == "hostBusiness")
        dispatch(fetchHostProfile());
    }
  }, [role]);

  return (
    <header className="ct_dash_header">
      <div className="d-flex align-items-center gap-2">
        <i
          className="fa-solid fa-bars me-3 ct_fs_18 ct_menu_bar"
          onClick={() => dispatch(toggleSideBarView(true))}
        ></i>
        <h4 className="ct_fs_24 ct_fw_600 mb-0 d-none d-sm-block">
          <BackButton />
          {t(name)}
        </h4>
      </div>
      <div className="d-flex align-items-center gap-3">
        {/* Commented out language selector for now
        <li className="list-unstyled mb-0" onClick={() => setHandleLanguageModal(true)} style={{ listStyleType: "none" }}>
          <button type="button" className="btn btn-transparent p-0 border-0 ct_dark_blue_text notranslate" translate="no" style={{ outline: "none", cursor: "pointer" }}>
            {(i18n.resolvedLanguage || i18n.language || "en").split("-")[0]?.toUpperCase()} <i className="fa-solid fa-chevron-down ms-2"></i>
          </button>
        </li>
        */}
        <div className="ct_border_right_1 pe-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate(routes?.Notifications);
            }}
            className="ct_notification_icon"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 6.43994V9.76994"
                stroke="#fff"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                d="M12.0199 2C8.3399 2 5.3599 4.98 5.3599 8.66V10.76C5.3599 11.44 5.0799 12.46 4.7299 13.04L3.4599 15.16C2.6799 16.47 3.2199 17.93 4.6599 18.41C9.4399 20 14.6099 20 19.3899 18.41C20.7399 17.96 21.3199 16.38 20.5899 15.16L19.3199 13.04C18.9699 12.46 18.6899 11.43 18.6899 10.76V8.66C18.6799 5 15.6799 2 12.0199 2Z"
                stroke="#fff"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                d="M15.3299 18.8201C15.3299 20.6501 13.8299 22.1501 11.9999 22.1501C11.0899 22.1501 10.2499 21.7701 9.64992 21.1701C9.04992 20.5701 8.66992 19.7301 8.66992 18.8201"
                stroke="#fff"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
            </svg>
            <span></span>
          </a>
        </div>
        <ProfileMenu />
      </div>
      <LanguageModal isViewModal={handleLanguageModal} setIsViewModal={setHandleLanguageModal} />
    </header>
  );
};

export default Header;

import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useTranslation } from "react-i18next";
import { getActivePanel, getActiveProfile, getCurrentPanel } from "../utils/pip";
import ImageWithPreview from "./image preview/imageWithPreview";
import LogoutModal from "./modals/LogoutModal";

const ProfileMenu = () => {
  const { t } = useTranslation();
  const navigate = useLocalizedNavigate();

  const currentPanel = getCurrentPanel();
  const activePanel = getActivePanel();
  const panel = currentPanel !== "guest" ? currentPanel : (activePanel || "guest");

  const profileData = getActiveProfile(panel);

  const first_name =
    profileData?.first_name || profileData?.business_name || "User";

  const goToProfile = () => {
    navigate(`/${panel}/my-profile`);
  };

  const goToChangePassword = () => {
    navigate(`/${panel}/change-password`);
  };

  return (
    <>
      <div className="ct_right_dropdown dropdown">
        <button
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div className="d-flex align-items-center gap-2">
            <ImageWithPreview
              data="ct_img_30"
              isPreview={false}
              image={
                profileData?.profile_image ||
                "https://app.flexsirent.com/user_profile.png"
              }
            />
            <div className="text-start" style={{ lineHeight: "10px" }}>
              <small className="ct_text_939393  text-truncate ct_white_nowrap d-sm-inline-block d-none" style={{ width: "60px", lineHeight: "18px" }}>{first_name}</small>
            </div>
          </div>
          <i className="fa-solid fa-angle-down ms-auto"></i>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                goToProfile();
              }}
            >
              <img loading="lazy"
                src="https://app.flexsirent.com/assets/img/dashbaord-images/profile_icon.svg"
                alt=""
              />
              {t("profile.myProfile")}
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                goToChangePassword();
              }}
            >
              <img loading="lazy"
                src="https://app.flexsirent.com/assets/img/dashbaord-images/lock.svg"
                alt=""
              />
              {t("profile.changePassword")}
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => e.preventDefault()}
              data-bs-toggle="modal"
              data-bs-target="#ct_logout_modal_post"
            >
              <img loading="lazy"
                src="https://app.flexsirent.com/assets/img/dashbaord-images/logout.svg"
                alt=""
              />
              {t("profile.logout")}
            </a>
          </li>
        </ul>
      </div>
      <LogoutModal />
    </>
  );
};

export default ProfileMenu;

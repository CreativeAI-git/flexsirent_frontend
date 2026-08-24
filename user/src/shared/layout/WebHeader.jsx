import { webPath } from "../../user/routes";
import { getActivePanel } from "../utils/pip";
import { initPlugins } from "../utils/initPlugins";
import ProfileMenu from "../components/ProfileMenu";
import { useEffect, useReducer, useState } from "react";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useLocation, useParams } from "react-router";
import AIBar from "../../components/AIBar";
import LoginModal from "../components/modals/LoginModal";
import SignUpModal from "../components/modals/SignUpModal";
import ForgotPasswordModal from "../components/modals/ForgotPasswordModal";
import { LANGUAGES } from "../utils/data";
import LanguageModal from "../components/modals/LanguageModal";
import { message } from "antd";
import { useTranslation } from "react-i18next";

const WebHeader = ({
  logInModal = false,
  setLogInModal = () => { },
  loginAs = "",
}) => {
  const { lang } = useParams();
  const { t, i18n } = useTranslation();
  const currentLang = "en";

  useEffect(() => {
    if (i18n.language !== "en") {
      i18n.changeLanguage("en");
    }
  }, [i18n]);
  const location = useLocation();
  const navigate = useLocalizedNavigate();
  const { pathname } = useLocation();

  // Removes /en, /fr, /de etc.
  const currentPath =
    pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "").replace(/^\//, "");
  const [signupType, setSignupType] = useState("");
  const [loginType, setLoginType] = useState("");
  const [forgotPassType, setForgotPassType] = useState("");
  const [isSignUpModal, setIsSignUpModal] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(logInModal);
  const [isForgotPassModal, setIsForgotPassModal] = useState(false);
  const [handleLangaugeModal, setHandleLanguageModal] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHome = pathname === `/${lang}` || pathname === `/${lang}/` || pathname === "/";
  const isAISearch = pathname.includes("/ai-search");

  useEffect(() => {
    window.scroll(0, 0);
    initPlugins();
  }, [pathname]);

  useEffect(() => {
    setIsLoginModal(logInModal);
    setLoginType(loginAs);
  }, [logInModal, loginAs]);

  useEffect(() => {
    setLogInModal(isLoginModal);
  }, [isLoginModal]);

  useEffect(() => {
    if (isLoginModal || isSignUpModal || isForgotPassModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoginModal, isSignUpModal, isForgotPassModal]);

  const languageModalHandler = () => {
    setHandleLanguageModal(true);
  };

  const closeLanguageModal = () => {
    setHandleLanguageModal(false);
  };

  return (
    <>
      <header className={`ct_header ${isSticky ? "ct_sticky_menu" : ""}`}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="ct_navbr_main">
                <div className="ct_logo">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/${lang}/${webPath?.Home}`);
                    }}
                  >
                    <img loading="lazy" src="/assets/img/logo.svg" alt="" />
                  </a>
                </div>

                {!isHome && !isAISearch && isSticky && (
                  <div className="ct_header_search_bar d-none d-md-block mx-auto w-100 px-4" style={{ maxWidth: "450px" }}>
                    <AIBar placeholder={t("ai_discovery_banner.placeholder")} />
                  </div>
                )}

                <div className={`ct_navbar ${(!isHome && isSticky) ? "d-none" : ""}`}>
                  <ul>
                    <div className="ct_close_menu">
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                    <li>
                      <a
                        href="#"
                        className={currentPath == webPath?.Home ? "active" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/${lang}/${webPath?.Home}`);
                        }}
                      >
                        {t("home")}
                      </a>
                    </li>
                    <li>
                      <a
                        className={currentPath == webPath.BecomeHost ? "active" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/${lang}/${webPath.BecomeHost}`);
                        }}
                        href="#"
                      >
                        {t("becomeHost")}
                      </a>
                    </li>
                    <li>
                      <a
                        className={currentPath == webPath.Properties ? "active" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/${lang}/${webPath.Properties}`);
                        }}
                        href="#"
                      >
                        {t("properties")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className={currentPath == webPath?.Blogs ? "active" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/${lang}/${webPath?.Blogs}`);
                        }}
                      >
                        {t("blogs")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className={currentPath == webPath.Help ? "active" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/${lang}/${webPath.Help}`);
                        }}
                      >
                        {t("help")}
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="d-flex align-items-center gap-3">
                  {/* Commented out language selection for now
                  <li className="list-unstyled" onClick={languageModalHandler}>
                    <button type="button" className="btn btn-transparent p-0 border-0 notranslate" translate="no">
                      {currentLang || "en"} <i className="fa-solid fa-chevron-down ms-2"></i>
                    </button>
                  </li>
                  */}
                  {getActivePanel() ? <ProfileMenu /> :
                    <li className="d-flex align-items-center">
                      <div
                        className="mb-0"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <div className="d-flex align-items-center gap-1 ">
                          <div className="dropdown ct_login_dropdown ct_cursor_pointer">
                            <span
                              id="dropdownMenuButton2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <span>{t("login")}</span>
                            </span>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton2"
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={(e) => {
                                    setIsLoginModal(true);
                                    setLoginType("guest");
                                  }}
                                >
                                  {t("loginAsGuest")}
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={(e) => {
                                    setIsLoginModal(true);
                                    setLoginType("host");
                                  }}
                                >
                                  {t("loginAsHost")}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                  }
                  <div className={`ct_menu_bar ${pathname == webPath?.Home ? "ct_web_menu_bar" : ""}`}>
                    <i className="fa-solid fa-bars-staggered"></i>
                  </div>
                </div>
              </div>
            </div>
          </div >
        </div >
      </header >

      {/* language Modal */}
      <LanguageModal isViewModal={handleLangaugeModal} setIsViewModal={setHandleLanguageModal} />

      {/* Login as guest modal S */}
      < LoginModal
        type={loginType}
        isOpen={isLoginModal}
        closeModal={setIsLoginModal}
        onSignupClick={() => {
          setSignupType(loginType);
          setIsLoginModal(false);
          setIsSignUpModal(true);
        }}
        onforgotPassClick={() => {
          setForgotPassType(loginType);
          setIsLoginModal(false);
          setIsForgotPassModal(true);
        }}
      />



      {/* Sing as guest up modal S */}

      <SignUpModal
        type={signupType}
        isOpen={isSignUpModal}
        closeModal={setIsSignUpModal}
        signupToLogin={() => {
          setLoginType(signupType);
          setIsSignUpModal(false);
          setIsLoginModal(true);
        }}
      />

      {/* Forgot Pasword modal S */}
      <ForgotPasswordModal
        type={forgotPassType}
        isOpen={isForgotPassModal}
        closeModal={setIsForgotPassModal}
        onLoginClick={() => {
          setLoginType(forgotPassType);
          setIsForgotPassModal(false);
          setIsLoginModal(true);
        }}
      />
      {/* Mobile Floating Sticky AI Bar */}
      {!isHome && !isAISearch && isSticky && (
        <div
          className="d-block d-md-none position-fixed start-50 translate-middle-x"
          style={{
            bottom: "80px",
            zIndex: 1040,
            width: "90%",
            maxWidth: "480px",
            animation: "slideUp 0.3s ease-out"
          }}
        >

          <AIBar placeholder={t("ai_discovery_banner.placeholder")} />

        </div>
      )}
    </>
  );
};

export default WebHeader;

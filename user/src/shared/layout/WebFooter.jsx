import { webPath } from "../../user/routes";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";

const WebFooter = () => {
  const { pathname } = useLocation();

  // Removes /en, /fr, /de etc.
  const currentPath =
    pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "").replace(/^\//, "");
  const isHomePage = /^\/[a-z]{2}\/?$/.test(pathname);
  const { t } = useTranslation();
  const navigate = useLocalizedNavigate();

  const links = [
    { label: t("footer.nav_home"), path: webPath?.Home },
    { label: t("footer.nav_become_host"), path: webPath?.BecomeHost },
    { label: t("footer.nav_privacy"), path: webPath?.PrivacyPolicy },
    { label: t("footer.nav_terms") || "Terms & Conditions", path: webPath?.TermAndConditions },
    { label: t("footer.nav_cancellation") || "Cancellation Policy", path: webPath?.cancellationPolicy },
    { label: t("footer.nav_help"), path: webPath?.Help },
    { label: t("footer.nav_blogs"), path: webPath?.Blogs },
  ];
  console.log({ currentPath, page: webPath?.Home })
  return (
    <>
      {!isHomePage && <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="ct_newsletter_bg">
                <img loading="lazy"
                  src="https://app.flexsirent.com/assets/img/newletter_left_img.png"
                  alt=""
                  className="ct_flex_shrink_0"
                />
                <div className="ct_py_70 ct_py_0_res_991 ">
                  <h4 className="ct_fs_24 ct_fw_600">{t("footer.newsletter_title")}</h4>
                  <p className="mb-0">
                    {t("footer.newsletter_desc")}
                  </p>
                </div>
                <div className="">
                  <p className="mb-3">
                    {t("footer.newsletter_sub")}
                  </p>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control ct_input ct_input_h_50 ct_border_radius_100 ct_pe_120"
                      placeholder={t("footer.email_placeholder")}
                    />
                    <button className="ct_subscribe_btn">{t("footer.subscribe")}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5 col-md-5 mb-4 mb-lg-0">
              <div className="ct_footer_left_info">
                  <a onClick={(e) => {
                  e.preventDefault()
                  navigate(webPath?.Home)
                }} className="ct_footer_logo">
                  <img loading="lazy" src="/assets/img/logo.svg" alt="" />
                </a>
                <p className="my-4 text-white">
                  {t("footer.tagline_1")}
                </p>
                <p className="mb-0 text-white">
                  {t("footer.tagline_2")}
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-3">
              <h4 className="ct_fs_20 text-white mb-3">{t("footer.useful_links")}</h4>
              <ul className="ct_footer_link">
                {links.map((item, index) => (
                  <li key={index}>
                    <a

                      className={pathname === item?.path ? "active" : ""}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item?.path);
                      }}
                    >
                      {item?.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
      </>}
      <div className="ct_navbar-bottom">
        <ul>

          <li>
            <a

              className={currentPath == webPath?.Home ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                navigate(webPath?.Home);
              }}
            >

              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.25 10.123V19.9004C22.2499 20.2583 22.1076 20.6014 21.8545 20.8545C21.6014 21.1076 21.2583 21.2499 20.9004 21.25H15.3496V17.0996C15.3495 16.344 15.0498 15.6193 14.5156 15.085C13.9811 14.5505 13.2559 14.25 12.5 14.25C11.7441 14.25 11.0189 14.5505 10.4844 15.085C9.95017 15.6193 9.6505 16.344 9.65039 17.0996V21.25H4.09961C3.74171 21.2499 3.39859 21.1076 3.14551 20.8545C2.89243 20.6014 2.7501 20.2583 2.75 19.9004V10.123L12.5 1.76562L22.25 10.123Z" stroke="#0D0D0D" strokeWidth="1.5" />
              </svg>



              <span>  {t("home")}</span>
            </a>
          </li>
          <li>
            <a
              className={currentPath == webPath.BecomeHost ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                navigate(webPath.BecomeHost);
              }}

            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 19.1053H11.5526M8.86842 7.47368H9.76316M8.86842 11.0526H9.76316M8.86842 14.6316H9.76316M13.3421 7.47368H14.2368M13.3421 11.0526H14.2368M5.28947 19.1053V4.78947C5.28947 4.31488 5.47801 3.85972 5.8136 3.52412C6.14919 3.18853 6.60435 3 7.07895 3H16.0263C16.5009 3 16.9561 3.18853 17.2917 3.52412C17.6273 3.85972 17.8158 4.31488 17.8158 4.78947V11.0526M15.1316 17.3158H20.5M17.8158 14.6316V20" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <span>  {t("becomeHost")}</span>
            </a>
          </li>
          <li>
            <a

              className={currentPath == webPath?.Blogs ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                navigate(webPath?.Blogs);
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0556 4.54545C14.0556 4.95533 13.8917 5.34843 13.5999 5.63826C13.3082 5.92808 12.9126 6.09091 12.5 6.09091C12.0874 6.09091 11.6918 5.92808 11.4001 5.63826C11.1083 5.34843 10.9444 4.95533 10.9444 4.54545M14.0556 4.54545C14.0556 4.13557 13.8917 3.74248 13.5999 3.45265C13.3082 3.16282 12.9126 3 12.5 3C12.0874 3 11.6918 3.16282 11.4001 3.45265C11.1083 3.74248 10.9444 4.13557 10.9444 4.54545M14.0556 4.54545H17.6333C18.1284 4.54545 18.6032 4.74084 18.9533 5.08864C19.3033 5.43643 19.5 5.90814 19.5 6.4V18.1455C19.5 18.6373 19.3033 19.109 18.9533 19.4568C18.6032 19.8046 18.1284 20 17.6333 20H7.36667C7.12153 20 6.8788 19.952 6.65232 19.8588C6.42585 19.7656 6.22007 19.629 6.04673 19.4568C5.69667 19.109 5.5 18.6373 5.5 18.1455V6.4C5.5 6.15646 5.54828 5.9153 5.64209 5.6903C5.7359 5.46529 5.8734 5.26085 6.04673 5.08864C6.3968 4.74084 6.8716 4.54545 7.36667 4.54545H10.9444M8.61111 12.2727H11.7222M8.61111 9.95455H16.3889M8.61111 14.5909H10.1667M14.2936 12.8724L14.0003 14.0376C13.9935 14.0647 13.9794 14.0894 13.9595 14.1091C13.9396 14.1288 13.9148 14.1429 13.8876 14.1497L12.7147 14.441C12.5576 14.4796 12.5576 14.7022 12.7147 14.7408L13.8876 15.0321C13.9148 15.039 13.9396 15.053 13.9595 15.0727C13.9794 15.0924 13.9935 15.1171 14.0003 15.1442L14.2936 16.3095C14.3324 16.4655 14.5564 16.4655 14.5953 16.3095L14.8886 15.1442C14.8954 15.1171 14.9095 15.0924 14.9294 15.0727C14.9492 15.053 14.9741 15.039 15.0013 15.0321L16.1742 14.7408C16.3313 14.7022 16.3313 14.4804 16.1742 14.441L15.0013 14.1497C14.9741 14.1429 14.9492 14.1288 14.9294 14.1091C14.9095 14.0894 14.8954 14.0647 14.8886 14.0376L14.5953 12.8724C14.5564 12.7163 14.3324 12.7163 14.2936 12.8724Z" stroke="#0D0D0D" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>


              <span>    {t("blogs")}</span>
            </a>
          </li>

          <li>
            <a

              className={currentPath == webPath.Help ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                navigate(webPath.Help);
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.713 16.713C12.9043 16.521 13 16.2833 13 16V13C13 12.7167 12.904 12.4793 12.712 12.288C12.52 12.0967 12.2827 12.0007 12 12C11.7173 11.9993 11.48 12.0953 11.288 12.288C11.096 12.4807 11 12.718 11 13V16C11 16.2833 11.096 16.521 11.288 16.713C11.48 16.905 11.7173 17.0007 12 17C12.2827 16.9993 12.5203 16.9043 12.713 16.713ZM12.713 9.712C12.9043 9.52067 13 9.28333 13 9C13 8.71667 12.904 8.47933 12.712 8.288C12.52 8.09667 12.2827 8.00067 12 8C11.7173 7.99933 11.48 8.09533 11.288 8.288C11.096 8.48067 11 8.718 11 9C11 9.282 11.096 9.51967 11.288 9.713C11.48 9.90633 11.7173 10.002 12 10C12.2827 9.998 12.5203 9.902 12.713 9.712ZM6 21C5.45 21 4.97933 20.8043 4.588 20.413C4.19667 20.0217 4.00067 19.5507 4 19V10C4 9.68333 4.071 9.38333 4.213 9.1C4.355 8.81667 4.55067 8.58333 4.8 8.4L10.8 3.9C11.15 3.63333 11.55 3.5 12 3.5C12.45 3.5 12.85 3.63333 13.2 3.9L19.2 8.4C19.45 8.58333 19.646 8.81667 19.788 9.1C19.93 9.38333 20.0007 9.68333 20 10V19C20 19.55 19.804 20.021 19.412 20.413C19.02 20.805 18.5493 21.0007 18 21H6ZM6 19H18V10L12 5.5L6 10V19Z" fill="black" />
              </svg>

              <span> {t("help")}</span>
            </a>
          </li>
          {/* <li>
                      <select className="ct_select_transparent ct_select_res_white ">
                        <option value="En">En</option>
                      </select>

                    </li> */}
        </ul>
      </div>
    </>
  );
};

export default WebFooter;
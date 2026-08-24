import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { webPath } from "../../../../user/routes";
import { useTranslation } from "react-i18next";

const Section4 = () => {
  const { t } = useTranslation();
  const navigate = useLocalizedNavigate();
  return (
    <section className="ct_light_blue_bg ct_py_70">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mb-4 mb-lg-0">
            <h2 className="ct_fs_35 ct_fw_600 mb-3 ">
              {t("home_section4.title_part1")} <span className="ct_orange_text">flexsirent</span> {t("home_section4.title_part2")}
            </h2>
            <p className="mb-0 ct_para_scroll">
              {t("home_section4.subtitle")}
            </p>
            <div className="ct_client_group_imges">
              <img loading="lazy" src="https://app.flexsirent.com/assets/img/user_1.jpg" alt="" />
              <img loading="lazy" src="https://app.flexsirent.com/user_profile.png" alt="" />
              <img loading="lazy" src="https://app.flexsirent.com/assets/img/user_3.jpg" alt="" />
              <img loading="lazy" src="https://app.flexsirent.com/assets/img/user_4.jpg" alt="" />
            </div>
            <div className="row mt-5">
              <div className="col-sm-6 mb-4">
                <h4 className="ct_fs_22 ct_fw_700 mb-2">{t("home_section4.stat_verified_val")}</h4>
                <p className="mb-0">{t("home_section4.stat_verified_label")}</p>
              </div>
              <div className="col-sm-6 mb-4">
                <h4 className="ct_fs_22 ct_fw_700 mb-2">{t("home_section4.stat_renters_val")}</h4>
                <p className="mb-0">{t("home_section4.stat_renters_label")}</p>
              </div>
              <div className="col-sm-6 mb-4">
                <h4 className="ct_fs_22 ct_fw_700 mb-2">{t("home_section4.stat_hosts_val")}</h4>
                <p className="mb-0">{t("home_section4.stat_hosts_label")}</p>
              </div>
              <div className="col-sm-6 mb-4">
                <h4 className="ct_fs_22 ct_fw_700 mb-2">{t("home_section4.stat_reviews_val")}</h4>
                <p className="mb-0">{t("home_section4.stat_reviews_label")}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-4  mb-lg-0">
            <ul>
              <li className="ct_rectangle_card_main">
                <div className="d-flex">
                  <div className="ct_border_icon_right">
                    <div className="ct_icon_50 ct_flex_shrink_0">
                      <img loading="lazy" src="https://app.flexsirent.com/assets/img/digitel_icon.svg" alt="" />
                    </div>
                  </div>
                  <div className="ct_flex_1 ct_h4_decoration">
                    <h4
                      className="ct_fs_18 ct_fw_600 mb-0"
                      style={{ width: "fitContent" }}
                    >
                      {t("home_section4.card_nomads_title")}
                    </h4>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="ct_p_decoration ct_flex_1 ">
                    <p className="mb-0 ct_para_s croll ct_fs_14">
                      {t("home_section4.card_nomads_desc")}
                    </p>
                  </div>
                  <div className="ct_border_icon_left">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(webPath?.Properties);
                      }}
                      className="ct_link_icon_50 ct_flex_shrink_0"
                    >
                      <img loading="lazy" src="https://app.flexsirent.com/assets/img/right_icon.png" alt="" />
                    </a>
                  </div>
                </div>
              </li>
              <li className="ct_rectangle_card_main mt-5">
                <div className="d-flex">
                  <div className="ct_border_icon_right">
                    <div className="ct_icon_50 ct_flex_shrink_0">
                      <img loading="lazy" src="https://app.flexsirent.com/assets/img/erasum_icon.png" alt="" />
                    </div>
                  </div>
                  <div className="ct_flex_1 ct_h4_decoration">
                    <h4
                      className="ct_fs_18 ct_fw_600 mb-0"
                      style={{ width: "fitContent" }}
                    >
                      {t("home_section4.card_students_title")}
                    </h4>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="ct_p_decoration ct_flex_1 ">
                    <p className="mb-0 ct_para_s croll ct_fs_14">
                      {t("home_section4.card_students_desc")}
                    </p>
                  </div>
                  <div className="ct_border_icon_left">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(webPath?.Properties);
                      }}
                      className="ct_link_icon_50 ct_flex_shrink_0"
                    >
                      <img loading="lazy" src="https://app.flexsirent.com/assets/img/right_icon.png" alt="" />
                    </a>
                  </div>
                </div>
              </li>
              <li className="ct_rectangle_card_main mt-5">
                <div className="d-flex">
                  <div className="ct_border_icon_right">
                    <div className="ct_icon_50 ct_flex_shrink_0">
                      <img loading="lazy" src="https://app.flexsirent.com/assets/img/worker_icon.png" alt="" />
                    </div>
                  </div>
                  <div className="ct_flex_1 ct_h4_decoration">
                    <h4
                      className="ct_fs_18 ct_fw_600 mb-0"
                      style={{ width: "fitContent" }}
                    >
                      {t("home_section4.card_workers_title")}
                    </h4>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="ct_p_decoration ct_flex_1 ">
                    <p className="mb-0 ct_para_s croll ct_fs_14">
                      {t("home_section4.card_workers_desc")}
                    </p>
                  </div>
                  <div className="ct_border_icon_left">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(webPath?.Properties);
                      }}
                      className="ct_link_icon_50 ct_flex_shrink_0"
                    >
                      <img loading="lazy" src="https://app.flexsirent.com/assets/img/right_icon.png" alt="" />
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;

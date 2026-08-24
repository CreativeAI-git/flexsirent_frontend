import React from 'react'
import { useTranslation } from 'react-i18next'

const Section2 = () => {
  const { t } = useTranslation();
  return (
    <section className="ct_py_70">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="mb-0 ct_fw_600 text-center ct_fs_35">
              {t("home_section2.title_part1")}
              <br />
              {t("home_section2.title_part2")}{" "}
              <span className="ct_blue_text ct_decoration_text">{t("home_section2.title_part3")}</span>
            </h2>
          </div>
        </div>
        <div className="row ct_mt_60">
          <div className="col-lg-6 mb-5">
            <div className="d-flex align-items-center gap-3 ct_flex_col_575 ct_designed_card_main">
              <div
                className="ct_designed_card ct_flex_shrink_0"
                style={{ backgroundColor: "#FEF5F5" }}
              >
                <img loading="lazy" src="https://app.flexsirent.com/assets/img/home/vector_1.png" alt="" />
              </div>
              <div>
                <h4 className="ct_fs_18 ct_fw_600 ">{t("home_section2.verified_properties_title")}</h4>
                <p className="mb-0 ct_para_scroll">
                  {t("home_section2.verified_properties_desc")}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-5">
            <div className="d-flex align-items-center gap-3 ct_flex_col_575 ct_designed_card_main">
              <div
                className="ct_designed_card ct_flex_shrink_0"
                style={{ backgroundColor: "#FFF6EA" }}
              >
                <img loading="lazy" src="https://app.flexsirent.com/assets/img/home/vector_2.png" alt="" />
              </div>
              <div>
                <h4 className="ct_fs_18 ct_fw_600">{t("home_section2.globe_title")}</h4>
                <p className="mb-0 ct_para_scroll">
                  {t("home_section2.globe_desc")}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-5">
            <div className="d-flex align-items-center gap-3 ct_flex_col_575 ct_designed_card_main">
              <div
                className="ct_designed_card ct_flex_shrink_0"
                style={{ backgroundColor: "#E7E5F4" }}
              >
                <img loading="lazy" src="https://app.flexsirent.com/assets/img/home/vector_3.png" alt="" />
              </div>
              <div>
                <h4 className="ct_fs_18 ct_fw_600">{t("home_section2.flexible_stays_title")}</h4>
                <p className="mb-0 ct_para_scroll">
                  {t("home_section2.flexible_stays_desc")}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-5">
            <div className="d-flex align-items-center gap-3 ct_flex_col_575 ct_designed_card_main">
              <div
                className="ct_designed_card ct_flex_shrink_0"
                style={{ backgroundColor: "#EFF9FF" }}
              >
                <img loading="lazy" src="https://app.flexsirent.com/assets/img/home/vector_4.png" alt="" />
              </div>
              <div>
                <h4 className="ct_fs_18 ct_fw_600">{t("home_section2.support_title")}</h4>
                <p className="mb-0 ct_para_scroll">
                  {t("home_section2.support_desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Section2

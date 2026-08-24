import React from 'react'
import { useTranslation } from "react-i18next"

const Section7 = () => {
  const { t } = useTranslation();
  return (
    <section className="ct_py_70 ct_light_yellow_bg">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="ct_fs_35 ct_fw_600 text-center">
              {t("home_section7.title")}
            </h2>
          </div>
        </div>
        <div className="row ct_mt_60">
          <div className="col-lg-4 mb-5 mb-lg-0">
            <div className="ct_host_card">
              <div className="ct_host_icon">
                <img loading="lazy" src="https://app.flexsirent.com/assets/img/host_icon_1.png" alt="" />
              </div>
              <div className="ct_host_inner_cnt ct_custom_scroll">
                <h4 className="ct_fs_20 ct_fw_600">{t("home_section7.card_list_title")}</h4>
                <p className="mb-0 ct_text_op_6">
                  {t("home_section7.card_list_desc")}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-5 mb-lg-0">
            <div className="ct_host_card">
              <div className="ct_host_icon">
                <img loading="lazy" src="https://app.flexsirent.com/assets/img/host_icon_2.png" alt="" />
              </div>
              <div className="ct_host_inner_cnt ct_custom_scroll">
                <h4 className="ct_fs_20 ct_fw_600">
                  {t("home_section7.card_connect_title")}
                </h4>
                <p className="mb-0 ct_text_op_6">
                  {t("home_section7.card_connect_desc")}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-5 mb-lg-0">
            <div className="ct_host_card">
              <div className="ct_host_icon">
                <img loading="lazy" src="https://app.flexsirent.com/assets/img/host_icon_3.png" alt="" />
              </div>
              <div className="ct_host_inner_cnt ct_custom_scroll">
                <h4 className="ct_fs_20 ct_fw_600">
                  {t("home_section7.card_earn_title")}
                </h4>
                <p className="mb-0 ct_text_op_6">
                  {t("home_section7.card_earn_desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Section7

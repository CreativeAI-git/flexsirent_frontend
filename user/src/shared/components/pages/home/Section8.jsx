import React from 'react'
import { useTranslation } from "react-i18next"

const Section8 = () => {
  const { t } = useTranslation();
  return (
    <section className="ct_py_70">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="ct_fs_35 ct_fw_600 mb-4">
              {t("home_section8.title")}
            </h2>
            <p className="mb-0 ct_text_op_6">
              {t("home_section8.subtitle")}
            </p>
          </div>
          <div className="col-md-6 mb-md-0">
            <div className="ct_faq_question_main">
              <div className="accordion" id="faq_accordionExample">
                <div className="accordion-item">
                  <h4 className="accordion-header" id="faq_one">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsefaq_one"
                      aria-expanded="false"
                      aria-controls="collapsefaq_one"
                    >
                      <img loading="lazy" src="https://app.flexsirent.com/assets/img/faq_icon.png" alt="" />
                      {t("home_section8.faq_1_q")}
                    </button>
                  </h4>
                  <div
                    id="collapsefaq_one"
                    className="accordion-collapse collapse show"
                    aria-labelledby="faq_one"
                    data-bs-parent="#faq_accordionExample "
                  >
                    <div className="accordion-body">
                      <p className="ct_fs_16 mb-3 ct_line_h_30">
                        {t("home_section8.faq_1_a")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h4 className="accordion-header" id="faqtwo">
                    <button
                      className="accordion-button collapsed pe-5"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsefaq_Two"
                      aria-expanded="true"
                      aria-controls="collapseTwo"
                    >
                      <img loading="lazy" src="https://app.flexsirent.com/assets/img/faq_icon.png" alt="" />
                      {t("home_section8.faq_2_q")}
                    </button>
                  </h4>
                  <div
                    id="collapsefaq_Two"
                    className="accordion-collapse collapse "
                    aria-labelledby="faqtwo"
                    data-bs-parent="#faq_accordionExample"
                  >
                    <div className="accordion-body">
                      <p className="ct_fs_16 mb-3 ct_line_h_30">
                        {t("home_section8.faq_2_a")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h4 className="accordion-header" id="faqthree">
                    <button
                      className="accordion-button collapsed pe-5"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsefaq_Three"
                      aria-expanded="true"
                      aria-controls="collapseTwo"
                    >
                      <img loading="lazy" src="https://app.flexsirent.com/assets/img/faq_icon.png" alt="" />
                      {t("home_section8.faq_2_q")}
                    </button>
                  </h4>
                  <div
                    id="collapsefaq_Three"
                    className="accordion-collapse collapse"
                    aria-labelledby="faqthree"
                    data-bs-parent="#faq_accordionExample"
                  >
                    <div className="accordion-body">
                      <p className="ct_fs_16 mb-3 ct_line_h_30">
                        {t("home_section8.faq_2_a")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h4 className="accordion-header" id="faqFour">
                    <button
                      className="accordion-button collapsed pe-5"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsefaq_Four"
                      aria-expanded="true"
                      aria-controls="collapseTwo"
                    >
                      <img loading="lazy" src="https://app.flexsirent.com/assets/img/faq_icon.png" alt="" />
                      {t("home_section8.faq_2_q")}
                    </button>
                  </h4>
                  <div
                    id="collapsefaq_Four"
                    className="accordion-collapse collapse"
                    aria-labelledby="faqFour"
                    data-bs-parent="#faq_accordionExample"
                  >
                    <div className="accordion-body">
                      <p className="ct_fs_16 mb-3 ct_line_h_30">
                        {t("home_section8.faq_2_a")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Section8

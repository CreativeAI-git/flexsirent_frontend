import { useState } from "react";
import ContactUs from "./ContactUs";

const HelpBy = () => {
  const tabs = [
    { label: "Guest", value: "Guest" },
    { label: "Host", value: "Host" },
    { label: "Business", value: "Business" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]?.value);
  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="ct_outline_border">
              <ul className="nav nav-pills mb-5 ct_custom_tabs" id="pills-tab">
                {tabs?.map((item, index) => (
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${item?.value == activeTab ? "active" : ""
                        }`}
                      onClick={() => setActiveTab(item?.value)}
                      type="button"
                      role="tab"
                    >
                      {item?.label}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="tab-content " id="pills-tabContent">
                <div className="tab-pane fade active show">
                  <div className="ct_light_orange_bg">
                    <h3 className="ct_fs_22 ct_fw_600">
                      Hosting Made Easy — Find Your Answers
                    </h3>
                    <p className="ct_text_op_8 mb-0">
                      Get help with listing properties, managing requests, and
                      optimizing your rentals.
                    </p>
                  </div>
                  <div className="row ct_mt_30">
                    <div className="col-lg-4 col-md-6 mb-4">
                      <div className="ct_transparent_card">
                        <h5 className="ct_fs_16 ct_fw_600 mb-2">
                          How do I book a rental property?
                        </h5>
                        <p className="mb-0 ct_text_op_8 ct_para_scroll">
                          Simply search, select your preferred listing, and
                          click "Send Enquiry." The Host will respond and
                          confirm availability.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                      <div className="ct_transparent_card">
                        <h5 className="ct_fs_16 ct_fw_600 mb-2">
                          Can I visit the property before booking?
                        </h5>
                        <p className="mb-0 ct_text_op_8 ct_para_scroll">
                          you can message the Host for more information or
                          additional photos. click "Send Enquiry." The Host will
                          respond and confirm availability.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                      <div className="ct_transparent_card">
                        <h5 className="ct_fs_16 ct_fw_600 mb-2">
                          How do I book a rental property?
                        </h5>
                        <p className="mb-0 ct_text_op_8 ct_para_scroll">
                          Simply search, select your preferred listing, and
                          click "Send Enquiry." The Host will respond and
                          confirm availability.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                      <div className="ct_transparent_card">
                        <h5 className="ct_fs_16 ct_fw_600 mb-2">
                          How do I book a rental property?
                        </h5>
                        <p className="mb-0 ct_text_op_8 ct_para_scroll">
                          Simply search, select your preferred listing, and
                          click "Send Enquiry." The Host will respond and
                          confirm availability.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                      <div className="ct_transparent_card">
                        <h5 className="ct_fs_16 ct_fw_600 mb-2">
                          How do I book a rental property?
                        </h5>
                        <p className="mb-0 ct_text_op_8 ct_para_scroll">
                          Simply search, select your preferred listing, and
                          click "Send Enquiry." The Host will respond and
                          confirm availability.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                      <div className="ct_transparent_card">
                        <h5 className="ct_fs_16 ct_fw_600 mb-2">
                          How do I book a rental property?
                        </h5>
                        <p className="mb-0 ct_text_op_8 ct_para_scroll">
                          Simply search, select your preferred listing, and
                          click "Send Enquiry." The Host will respond and
                          confirm availability.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ContactUs />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpBy;

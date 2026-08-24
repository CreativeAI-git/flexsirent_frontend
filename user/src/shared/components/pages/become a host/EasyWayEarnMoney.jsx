import { services } from "../../../utils/pip";

const EasyWayEarnMoney = () => {
  return (
    <section className="ct_py_70 ct_grey_bg">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="ct_fs_35 ct_fw_700 text-center">
              Easy Way to Earn Money With Us
            </h2>
          </div>
        </div>
        <div className="row ct_mt_60">
          {services.map((service, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="ct_service_card">
                <div className="ct_service_icon">{service.icon}</div>
                <h3 className="ct_fs_20 ct_fw_600 mb-3 ct_orange_text">
                  {service.title}
                </h3>
                <p className="mb-0 ct_para_scroll">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EasyWayEarnMoney;

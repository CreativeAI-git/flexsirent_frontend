import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { webPath } from "../../../../user/routes";

const Advertisement = () => {
  const navigate = useLocalizedNavigate()
  return (
    <section className="ct_py_70">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="ct_space_income_bg">
              <img loading="lazy" src="https://app.flexsirent.com/assets/img/house_note.png" alt="" />
              <img loading="lazy" src="https://app.flexsirent.com/assets/img/home_key.png" alt="" />
              <div className="row">
                <div className="col-md-10 mx-auto">
                  <h2 className="ct_fs_35 ct_fw_700 mb-4 text-center text-white">
                    Ready to Turn Your Space Into Income?
                  </h2>
                  <p className="text-center mb-0 text-white ct_fs_20">
                    List your apartment, house, or room in minutes. Start
                    earning from verified mid‑term renters — students,
                    professionals, and digital nomads.
                  </p>
                  <div className="ct_mt_60">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(webPath?.BecomeHostProcess)
                      }}
                      className="ct_orange_btn ct_white_btn w-auto ct_border_radius_100 ct_fit_content mx-auto"
                    >
                      List Your Property
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advertisement;

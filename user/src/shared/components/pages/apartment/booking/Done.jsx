import { useState } from "react";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { webPath } from "../../../../../user/routes";

const Done = () => {
  const navigate = useLocalizedNavigate()
  return (
    <fieldset>
      <div className="ct_form-card">
        <section className="ct_payment_success_bg py-5">
          <div className="ct_payment_sucess_cnt">
            <img loading="lazy" src="https://app.flexsirent.com/assets/img/sucess_icon.png" alt="" />
            <h4 className="ct_fs_28 ct_fw_600">Your Booking is Confirmed!</h4>
            <p className="ct_fs_18 mb-0">
              Thank you for your payment. We've reserved your apartment and sent
              all the details to your email.
            </p>
            <div className="mt-5">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  navigate(webPath?.Appartments)
                }}
                className="ct_orange_btn ct_border_radius_100 ct_fit_content mx-auto"
              >
                Go to Dashboard
              </a>
            </div>
          </div>
        </section>
      </div>
    </fieldset>
  );
};

export default Done;

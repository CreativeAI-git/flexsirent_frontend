import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { webPath } from "../../../../user/routes";
import { getActivePanel, getAnyActiveToken } from "../../../utils/pip";
import { useState } from "react";
import toast from "react-hot-toast";

const ProperptyMethodSelection = () => {
  const [logInModal, setLogInModal] = useState(false);
  const navigate = useLocalizedNavigate();
  return (
    <section className="py-5 mb-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="ct_host_process_bg">
              <div className="text-center">
                <h2 className="ct_fs_35 ct_fw_600">
                  How Would You Like to List Your Property?
                </h2>
                <p className="ct_text_op_8">
                  Choose the method that suits you best — we're here to make it
                  easy.
                </p>
              </div>
              <div className="row ct_mt_60">
                <div className="col-md-6 mb-4 mb-md-0">
                  <div className="ct_listing_white_bg active create_listing_1">
                    <h5 className="ct_fs_18 ct_fw_500 mb-3">
                      We Create Listings For You
                    </h5>
                    <p className="mb-0 ct_text_op_6">
                      Easily share your Airbnb links and let us auto-import your
                      property details — just add availability, stay duration,
                      and pricing.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mb-4 mb-md-0">
                  <div className="ct_listing_white_bg create_listing_2">
                    <h5 className="ct_fs_18 ct_fw_500 mb-3">
                      Create a New Property
                    </h5>
                    <p className="mb-0 ct_text_op_6">
                      Take control and create your property listing from
                      scratch. Our intuitive interface makes it simple to
                      showcase your property.
                    </p>
                  </div>
                </div>
              </div>
              {/* First Process LInk S */}
              <div className="mt-5 create_listing_1_btn">
                <a
                  href="#"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   navigate(webPath?.ImportedList);
                  // }}

                  onClick={(e) => {
                    e.preventDefault();

                    const activePanel = getActivePanel();
                    const activeSession = getAnyActiveToken();

                    // Not logged in → open login modal
                    if (!activeSession?.token) {
                      setLogInModal(true);
                      toast.error(
                        "Please login with a Host account or sign up as a Host to continue.",
                      );
                      return;
                    }
                    if (
                      activePanel != "host" &&
                      activePanel != "host-business"
                    ) {
                      toast.error("Please login with a Host account first.");

                      return;
                    }
                    // Logged in → redirect
                    navigate(webPath?.ImportedList);
                  }}
                  className="ct_orange_btn ct_border_radius_100 ct_fit_content mx-auto px-5"
                >
                  Next
                </a>
              </div>
              {/* Second Process Link */}
              <div className="mt-5 create_listing_2_btn d-none">
                <a
                  href="#"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   navigate(webPath?.HostingProcess);
                  // }}

                  onClick={(e) => {
                    e.preventDefault();

                    const activePanel = getActivePanel();
                    const activeSession = getAnyActiveToken();

                    // Not logged in → open login modal
                    if (!activeSession?.token) {
                      setLogInModal(true);
                      toast.error(
                        "Please login with a Host account or sign up as a Host to continue.",
                      );
                      return;
                    }
                    if (
                      activePanel != "host" &&
                      activePanel != "host-business"
                    ) {
                      toast.error("Please login with a Host account first.");

                      return;
                    }
                    // Logged in → redirect
                    navigate(webPath?.HostingProcess);
                  }}
                  className="ct_orange_btn ct_border_radius_100 ct_fit_content mx-auto px-5"
                >
                  Next
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProperptyMethodSelection;

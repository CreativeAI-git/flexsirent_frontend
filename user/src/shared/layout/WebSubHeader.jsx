import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { webPath } from "../../user/routes";
import { matchPath } from "react-router";
import SendInquery from "../../user/components/modals/SendInquery";
import { createUserInquiry } from "../../redux/features/user/actions/bookingAction";

const WebSubHeader = ({ lebel = "", desc = "", propertyId }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = useLocation();
  const [isViewModal, setIsViewModal] = useState(false);
  const isPropertyDetailsPage = /^\/[a-z]{2}\/l\/.+$/.test(pathname);

  const data =
    location.state?.data ||
    (typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("propertyDetails") || "{}") : {}) ||
    {};
  console.log("pathname:", pathname);
  console.log("webPath.PropertyDetails:", webPath.PropertyDetails);
  const activePropertyId = propertyId || data?.property_id;

  const handleSendInquiry = (values, resetFields) => {

    const callback = (res) => {
      if (res?.success) {
        setIsViewModal(false);
        resetFields?.();
      }
    };

    dispatch(
      createUserInquiry({
        payload: {
          property_id: activePropertyId,
          ...values,
        },
        callback,
      }),
    );
  };

  return (
    <>
      <section className="ct_inner_banner_bg">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div>
                  {lebel && <h2 className="ct_fs_35 ct_fw_700 mb-0">{lebel}</h2>}
                  {desc && <p className="mb-0 mt-1">{desc}</p>}
                </div>
                {console.log({ isPropertyDetailsPage })}
                {isPropertyDetailsPage && (
                  <div className="">
                    <button
                      className="ct_orange_btn"
                      type="button"
                      onClick={() => {
                        if (!activePropertyId) {
                          toast.error("Property not found");
                          return;
                        }
                        setIsViewModal(true);
                      }}
                    >
                      Send Inquiry
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <SendInquery
        isViewModal={isViewModal}
        setIsViewModal={setIsViewModal}
        handleSubmit={handleSendInquiry}
      />
    </>
  );
};

export default WebSubHeader;

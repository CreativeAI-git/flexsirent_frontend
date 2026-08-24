import { Modal } from "antd";
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import { webPath } from "../../../user/routes";

const SubmitCongrats = ({ isViewModal, setIsViewModal }) => {
  const navigate = useLocalizedNavigate();
  return (
    <Modal
      title=""
      open={isViewModal}
      onCancel={() => {
        setIsViewModal(false);
      }}
      centered={true}
      footer={null}
      width={"800px"}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body py-5">
            <div className="text-center">
              <img loading="lazy"
                src="https://app.flexsirent.com/assets/img/sucess_icon.png"
                alt=""
                className="ct_img_100 mb-4"
              />
              <h4 className="ct_fs_22 ct_fw_600">
                Thank You For Submitting Your Property Listing!
              </h4>
              <p>
                Our team is currently reviewing your details to ensure
                everything meets our guidelines.
              </p>
              <div className="mt-5 pb-4">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(webPath?.BecomeHostProcess);
                  }}
                  className="ct_orange_btn ct_border_radius_100 ct_fit_content mx-auto"
                >
                  Go to Dashboard
                </a>
              </div>
              <small>
                Your listing will be reviewed and approved by our admin team
                within 24–48 hours. You’ll receive a confirmation email once
                your listing goes live.
              </small>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SubmitCongrats;

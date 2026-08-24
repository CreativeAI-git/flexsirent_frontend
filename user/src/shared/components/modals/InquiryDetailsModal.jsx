import { Modal } from "antd";
import { pipViewDate } from "../../utils/pip";
import { useLocation } from "react-router";
import { hostRoutes } from "../../../host/routes";
import { hostBusinessPaths } from "@/host business/routes";

const InquiryDetailsModal = ({ isViewModal, setIsViewModal, data = {} }) => {
  const { pathname } = useLocation();
  return (
    <Modal
      title={"Inquiry Detail"}
      open={isViewModal}
      onCancel={() => setIsViewModal(false)}
      centered={true}
      footer={null}
      width={"800px"}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ backgroundColor: "#fff" }}>
          <div className="modal-body mt-3 pb-5">
            <div className="row">
              <div className="col-md-6 mb-1">
                <div>
                  <label className="mb-2 ct_fw_600 me-2">User Name: </label>
                  {data?.user_name || "#N/A"}
                </div>
              </div>
              <div className="col-md-6 mb-1">
                <div>
                  <label className="mb-2 ct_fw_600 me-2">Email: </label>
                  {data?.email || "#N/A"}
                </div>
              </div>
             {!pathname.includes(hostRoutes?.InquiryManagement) && !pathname.includes(hostBusinessPaths?.InquiryManagement) && <div className="col-md-6 mb-1">
                <div>
                  <label className="mb-2 ct_fw_600 me-2">Host Name: </label>
                  {data?.host_name || "#N/A"}
                </div>
              </div>}
              <div className="col-md-6 mb-1">
                <div>
                  <label className="mb-2 ct_fw_600 me-2">
                    Property Title:{" "}
                  </label>
                  {data?.property_title || "#N/A"}
                </div>
              </div>
              <div className="col-md-6 mb-1">
                <div>
                  <label className="mb-2 ct_fw_600 me-2">Date: </label>
                  {pipViewDate(data?.created_at) || "#N/A"}
                </div>
              </div>
              <ul>
                <li>
                  <label className="mb-2 ct_fw_600 me-2">Message: </label>
                  <p className="review-data ct_custom_scrollbar">
                    {data?.message || "#N/A"}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InquiryDetailsModal;

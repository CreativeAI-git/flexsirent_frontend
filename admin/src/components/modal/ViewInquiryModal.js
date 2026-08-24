import { Modal } from "antd";
import { pipViewDate } from "../../utills/pip";

const ViewInquiryModal = ({ isViewModal, setIsViewModal, data = {} }) => {

  return (
    <Modal
      title={"Inquiry Detail"}
      visible={isViewModal}
      onCancel={() => setIsViewModal(false)}
      centered={true}
      footer={null}
      width={"800px"}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body mt-3 pb-5">
            <div class="row">
                <div class="col-md-6 mb-1">
                <div>
                  <label class="mb-2 ct_fw_600 me-2">User Name: </label>
                  {data?.user_name || "#N/A"}
                </div>
              </div>
              <div class="col-md-6 mb-1">
                <div>
                  <label class="mb-2 ct_fw_600 me-2">Email: </label>
                  {data?.email || "#N/A"}
                </div>
              </div>
              <div class="col-md-6 mb-1">
                <div>
                  <label class="mb-2 ct_fw_600 me-2">Host Name: </label>
                  {data?.host_name || "#N/A"}
                </div>
              </div>
              <div class="col-md-6 mb-1">
                <div>
                  <label class="mb-2 ct_fw_600 me-2">Property Title: </label>
                  {data?.property_title ?? "#N/A"}
                </div>
              </div>
            
              <div class="col-md-6 mb-1">
                <div>
                  <label class="mb-2 ct_fw_600 me-2">Date: </label>
                  {pipViewDate(data?.created_at) || "#N/A"}
                </div>
              </div>
              
              <ul>
                <li>
                  <label class="mb-2 ct_fw_600 me-2">Message: </label>
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

export default ViewInquiryModal;

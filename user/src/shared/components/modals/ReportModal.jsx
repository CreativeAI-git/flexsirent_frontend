import { Modal } from "antd";
import { pipViewDate } from "../../utils/pip";

const ReportModal = ({ isViewModal, setIsViewModal, data, isReportedBy }) => {
  return (
    <Modal
      title={"Report Details"}
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
          <div className="modal-body mt-3 pb-5">
            <div className="row">
              <div className="col-md-6 mb-1">
                <div>
                  <label className="mb-2 ct_fw_600 me-2">Property Title: </label>
                  {data?.property_title ?? "#N/A"}
                </div>
              </div>
              {isReportedBy && (
                <div className="col-md-6 mb-1">
                  <div>
                    <label className="mb-2 ct_fw_600 me-2">Reported By: </label>
                    {`${data?.user_first_name} ${data?.user_last_name}` ||
                      "#N/A"}
                  </div>
                </div>
              )}
              <div className="col-md-6 mb-1">
                <div>
                  <label className="mb-2 ct_fw_600 me-2">Report Title: </label>
                  {data?.report_title || "#N/A"}
                </div>
              </div>

              <div className="col-md-6 mb-1">
                <div>
                  <label className="mb-2 ct_fw_600 me-2">Reported Date: </label>
                  {pipViewDate(data?.created_at) ?? "#N/A"}
                </div>
              </div>
              <ul>
                <li>
                  <label className="mb-2 ct_fw_600 me-2">Description: </label>
                  <p className="review-data ct_custom_scrollbar">
                    {data?.description || "#N/A"}
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

export default ReportModal;

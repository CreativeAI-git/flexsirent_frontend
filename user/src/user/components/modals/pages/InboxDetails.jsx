import { Modal } from "antd";
import { pipViewDateTime } from "../../../../shared/utils/pip";

const InboxDetails = ({ supportDetail, isViewModal, setIsViewModal }) => {
  return (
    <Modal
      title={`Support Detail`}
      open={isViewModal}
      onCancel={() => {
        setIsViewModal(false);
      }}
      centered={true}
      footer={null}
      width={"800px"}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ backgroundColor: "#fff" }}>
          <div className="col-md-12">
            <form className="">
              {supportDetail?.activeTab == "Booking" && <div className="form-group mb-4">
                <label className="mb-2 ct_fw_600">Property Name</label>
                <p className="mb-0 ct_para_scroll ct_custom_scroll">
                  {supportDetail?.property_title || "#N/A"}
                </p>
              </div>}
              <div className="form-group mb-4">
                <label className="mb-2 ct_fw_600">You  ({pipViewDateTime(supportDetail?.created_at)})</label>
                <p className="mb-0 ct_para_scroll ct_custom_scroll">
                  {supportDetail?.message || "#N/A"}
                </p>
              </div>
              {(supportDetail?.reply_message?.length &&
                supportDetail?.reply_message?.map((item, ind) => (
                  <div className="form-group mb-4">
                    <label className="mb-2 ct_fw_600 text-capitalize">
                      {item?.role == 'host' ? `Host Reply by ${supportDetail?.host_first_name} ${supportDetail?.host_last_name}` : `${item?.role} Reply` || "#N/A"}  ({pipViewDateTime(item?.created_at)})
                    </label>
                    <p className="mb-0 ct_para_scroll ct_custom_scroll">
                      {item?.message || "#N/A"}
                    </p>
                  </div>
                ))) ||
                ""}

            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InboxDetails;

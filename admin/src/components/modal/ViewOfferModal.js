import { Modal } from "antd";
import StatusCol from "../Table/StatusCol";
import { pipViewDate } from "../../utills/pip";

const getPropertyTitle = (item = {}) => item?.property_title ?? "#N/A";

const getOfferValue = (item = {}) => {
  const value = item?.offer_value;

  return value === 0 || value ? `${value}%` : "#N/A";
};

const getLocationText = (item = {}) =>
  [item?.address, item?.location, item?.country].filter(Boolean).join(", ");

const ViewOfferModal = ({ isViewModal, setIsViewModal, data = {} }) => {
  return (
    <Modal
      title={"Offer Details"}
      open={isViewModal}
      onCancel={() => setIsViewModal(false)}
      centered={true}
      footer={null}
      width={"800px"}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body mt-3 pb-5">
            <div className="row">
              <div className="col-md-6 mb-2">
                <div>
                  <label className="mb-2 ct_fw_600 me-2">Property Name: </label>
                  {getPropertyTitle(data)}
                </div>
              </div>
              <div className="col-md-6 mb-2">
                <div>
                  <label className="mb-2 ct_fw_600 me-2">Discount: </label>
                  {getOfferValue(data)}
                </div>
              </div>
              <div className="col-md-6 mb-2">
                <div>
                  <label className="mb-2 ct_fw_600 me-2">Start Date: </label>
                  {pipViewDate(data?.start_date) || "#N/A"}
                </div>
              </div>
              <div className="col-md-6 mb-2">
                <div>
                  <label className="mb-2 ct_fw_600 me-2">End Date: </label>
                  {pipViewDate(data?.end_date) || "#N/A"}
                </div>
              </div>
              <div className="col-md-6 mb-2">
                <div>
                  <label className="mb-2 ct_fw_600 me-2">Location: </label>
                  {getLocationText(data) || "#N/A"}
                </div>
              </div>
              <div className="col-md-6 mb-2">
                <div className="d-flex">
                  <label className="mb-2 ct_fw_600 me-2">Status: </label>
                  <StatusCol status={data?.is_active} type={"offer"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewOfferModal;

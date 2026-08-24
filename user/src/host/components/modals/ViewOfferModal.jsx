import { Modal } from "antd";
import { pipViewDate } from "../../../shared/utils/pip";

const getPropertyTitle = (item) =>
  item?.property_title ??
  item?.website_address ??
  item?.address ??
  item?.floor ??
  item?.title ??
  item?.property_name ??
  item?.property?.property_title ??
  "#N/A";

const getOfferValue = (item) =>
  item?.offer_value ??
  item?.discount ??
  item?.offer_percentage ??
  item?.offer?.offer_value ??
  "#N/A";

const getStatusText = (item) =>
  Number(item?.is_active) === 1 ? "Active" : "Inactive";

const getLocationText = (item) =>
  [item?.address, item?.location, item?.country].filter(Boolean).join(", ");

const ViewOfferModal = ({
  isViewModal,
  setIsViewModal,
  data = {},
  onToggleStatus,
  updatingOfferId,
}) => {
  return (
    <Modal
      title="Offer Details"
      open={isViewModal}
      onCancel={() => setIsViewModal(false)}
      centered
      footer={null}
      width="800px"
      destroyOnHidden
    >
      <div className="row pt-2">
        <div className="col-md-6 mb-3">
          <label className="mb-1 ct_fw_600">Property Name</label>
          <p className="mb-0">{getPropertyTitle(data)}</p>
        </div>
        <div className="col-md-6 mb-3">
          <label className="mb-1 ct_fw_600">Discount</label>
          <p className="mb-0">
            {getOfferValue(data) !== "#N/A"
              ? `${getOfferValue(data)}%`
              : "#N/A"}
          </p>
        </div>
        <div className="col-md-6 mb-3">
          <label className="mb-1 ct_fw_600">Start Date</label>
          <p className="mb-0">{pipViewDate(data?.start_date) || "#N/A"}</p>
        </div>
        <div className="col-md-6 mb-3">
          <label className="mb-1 ct_fw_600">End Date</label>
          <p className="mb-0">{pipViewDate(data?.end_date) || "#N/A"}</p>
        </div>
        <div className="col-md-6 mb-3">
          <label className="mb-1 ct_fw_600 d-block">Status</label>
          <div className="d-flex align-items-center gap-3">
            <label className="toggle-switch mb-0">
              <input
                type="checkbox"
                checked={Number(data?.is_active) === 1}
                disabled={
                  !data?.offer_id || updatingOfferId === data?.offer_id
                }
                onChange={() => onToggleStatus?.(data)}
              />
              <div className="toggle-switch-background">
                <div className="toggle-switch-handle"></div>
              </div>
            </label>
            {/* <p className="mb-0">{getStatusText(data)}</p> */}
          </div>
        </div>
        {/* <div className="col-md-6 mb-3">
          <label className="mb-1 ct_fw_600">Post Code</label>
          <p className="mb-0">{data?.post_code || "#N/A"}</p>
        </div> */}
        <div className="col-md-12 mb-3">
          <label className="mb-1 ct_fw_600">Location</label>
          <p className="mb-0">{getLocationText(data) || "#N/A"}</p>
        </div>
        {/* <div className="col-md-12 mb-0">
          <label className="mb-1 ct_fw_600">Website Address</label>
          <p className="mb-0">{data?.website_address || "#N/A"}</p>
        </div> */}
      </div>
    </Modal>
  );
};

export default ViewOfferModal;

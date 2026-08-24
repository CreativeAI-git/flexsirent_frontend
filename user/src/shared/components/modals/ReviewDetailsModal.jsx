import { Modal } from "antd";
import { Rating } from "react-simple-star-rating";
import { pipViewDate } from "../../utils/pip";

const ReviewDetailsModal = ({ isViewModal, setIsViewModal, data = {} }) => {
  const ratingValue = Number(data?.rating);
  const hasRating = Number.isFinite(ratingValue);

  return (
    <Modal
      title={"Review Details"}
      open={isViewModal}
      onCancel={() => setIsViewModal(false)}
      centered
      footer={null}
      width={"800px"}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body mt-3 pb-5">
            <div className="row">
              <div className="col-md-6 mb-1">
                <div>
                  <label className="mb-2 ct_fw_600 me-2">Guest Name: </label>
                  {data?.guest_name || "#N/A"}
                </div>
              </div>

              <div className="col-md-6 mb-1">
                <div>
                  <label className="mb-2 ct_fw_600 me-2">Property Name: </label>
                  {data?.property_title || "#N/A"}
                </div>
              </div>
              <div className="col-md-6 mb-1">
                <div>
                  <label className="mb-2 ct_fw_600 me-2">Date: </label>
                  {pipViewDate(data?.created_at) || "#N/A"}
                </div>
              </div>
            </div>
            {/* <ul className="mt-3">
              <li>
                <label className="mb-2 ct_fw_600 me-2">Rating: </label>
                <div className="ct_white_op_bg">
                  <p className="mb-0 ct_white_nowrap">
                    {hasRating ? (
                      <Rating
                        className="rating-stars"
                        initialValue={ratingValue}
                        allowFraction
                        readonly
                      />
                    ) : (
                      "#N/A"
                    )}
                  </p>
                </div>
              </li>
              <li className="mt-4">
                <label className="mb-2 ct_fw_600 me-2">Review: </label>
                <textarea
                  className="form-control ct_input h-auto"
                  rows="4"
                  disabled
                  value={data?.review || "#N/A"}
                />
              </li>
            </ul> */}
            <ul className="mt-0">
              <li>
                <label className="mb-2 ct_fw_600 me-2">Rating </label>

                <div className="ct_white_op_bg ps-0">
                  <p className="mb-0 ct_white_nowrap">
                    <Rating
                      className="rating-stars"
                      initialValue={ratingValue}
                      allowFraction
                      readonly
                    />
                  </p>
                </div>
              </li>
              <li className="mt-2">
                <label className="mb-2 ct_fw_600 me-2">Review: </label>
                <p className="review-data ct_custom_scrollbar">
                  {data?.review || "#N/A"}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewDetailsModal;

import { Modal } from "antd";
import { pipViewDate } from "../../utills/pip";
import { Rating } from "react-simple-star-rating";
import ImageWithPreview from "../image preview/imageWithPreview";

const ReviewModal = ({ isViewModal, setIsViewModal, data }) => {
  const formatRating = (rating) => Number(rating).toFixed(1);

  return (
    <Modal
      title={"Review Details"}
      visible={isViewModal}
      onCancel={() => {
        setIsViewModal(false);
      }}
      centered={true}
      footer={null}
      width={"550px"}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body mt-3 pb-5">
            <div class="row ">
              <div className="d-flex justify-content-center">
                <div className="ct_upload_user_profile_img mb-4">
                  <ImageWithPreview
                    image={data?.image || "user_profile.png"}
                    className="ct_img_60 ct_cursor_pointer"
                  />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div>
                  <label class="mb-0 ct_fw_600 me-2">User Name: </label>
                  <br></br>
                  {`${data?.user_first_name} ${data?.user_last_name}` || "#N/A"}
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div>
                  <label class="mb-0 ct_fw_600 me-2">Host Name: </label>
                  <br></br>
                  {`${data?.host_first_name} ${data?.host_last_name}` || "#N/A"}
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div>
                  <label class="mb-0 ct_fw_600 me-2">Property Name: </label>
                  <br></br>
                  {data?.property_title ?? "#N/A"}
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div>
                  <label class="mb-0 ct_fw_600 me-2">Date: </label>
                  <br></br>
                  {pipViewDate(data?.created_at) ?? "#N/A"}
                </div>
              </div>
            </div>
            <ul className="">
              <li className="mb-3">
                <label class="mb-2 ct_fw_600 me-2">Rating </label>

                <div className="ct_white_op_bg">
                  <p className="mb-0 ct_white_nowrap">
                    <Rating
                      className="rating-stars"
                      initialValue={formatRating(data?.rating) || "#N/A"}
                      allowFraction
                      readonly
                    />
                  </p>
                </div>
              </li>
              <li class="">
                <label class="mb-2 ct_fw_600 me-2">Review: </label>
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

export default ReviewModal;

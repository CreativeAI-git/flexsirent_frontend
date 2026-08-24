import { Modal } from "antd";
import { WebURL } from "../../utils/pip";

const ImagePreview = ({ isModalVisible, handleModalClose, imgsrc }) => {
  return (
    <>
      <Modal
        className=""
        title="Image Preview"
        centered={true}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="ct_full_view_img">
                <img loading="lazy" src={imgsrc} alt="" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImagePreview;

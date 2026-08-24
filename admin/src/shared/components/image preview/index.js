import { Modal } from "antd";

const ImagePreview = ({ isModalVisible, handleModalClose, imgsrc }) => {
  return (
    <>
      <Modal
        className=""
        title="Image Preview"
        centered={true}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              <div class="ct_full_view_img">
                <img  loading="lazy" src={imgsrc} alt="" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImagePreview;

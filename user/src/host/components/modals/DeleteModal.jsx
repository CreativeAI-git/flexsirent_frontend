import { Modal } from "antd";

const DeleteModal = ({
  value,
  isViewModal,
  setIsViewModal,
  heading,
  body,
  handleDelete = () => {

  },
}) => {
  return (
    <Modal
      title={`${value || ""}`}
      open={isViewModal}
      onCancel={() => {
        setIsViewModal(false);
      }}
      centered={true}
      footer={null}
    // width={"500px"}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ backgroundColor: "#fff" }}>
          <div className="modal-body pb-4 text-center">
            <h6 className="ct_fs_16 mt-3 mb-3">{heading ?? "#N/A"}</h6>
            <p className="mb-0">{body ?? "#N/A"}</p>
            <div className="d-flex align-items-center gap-3 mt-4 pt-2 justify-content-center">
              <button
                className="ct_outline_btn ct_dark_blue_outline_btn px-5 py-2 w-100"
                onClick={() => setIsViewModal(false)}
              >
                Cancel
              </button>
              <button
                className="ct_dark_blue_btn px-5 py-2 w-100"
                onClick={() => {
                  handleDelete();
                  setIsViewModal(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;

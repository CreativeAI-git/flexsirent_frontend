import { message, Modal } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";

const BookingRejectReason = ({ isViewModal, setIsViewModal, onClick }) => {
  const [reason, setReason] = useState("");
  const handleSend = () => {
    if (!reason?.trim()) {
      // Show error / prevent send
      toast.error("Reason cannot be empty");
      return;
    }

    onClick(reason)
  };
  return (
    <Modal
      title={`Reason Of Reject`}
      open={isViewModal}
      onCancel={() => {
        setReason("");
        setIsViewModal(false);
      }}
      centered={true}
      footer={null}
      width={"800px"}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body pb-4">
            <form action="">
              <div className="form-group mb-4 mt-4">
                <label className="ct_fs_16 mb-2 ">Reason </label>
                <textarea
                  className="form-control ct_input h-auto"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows="4"
                  placeholder="write a Message"
                ></textarea>
              </div>
              <div className="d-flex align-items-center gap-3 mt-3 justify-content-end">
                <button
                  type="button"
                  className="ct_outline_btn"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setIsViewModal(false);
                    setReason("");
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="ct_orange_btn"
                  onClick={handleSend}
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BookingRejectReason;

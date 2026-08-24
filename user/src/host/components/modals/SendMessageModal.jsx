import { Modal } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { sendQuery } from "../../../redux/features/host/actions/inboxAction";

const SendMessageModal = ({
  isViewModal,
  setIsViewModal,
  handleSubmit = () => {},
}) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    const callback = (res) => {
      if (res?.success) {
        setIsViewModal(false);
        handleSubmit();
      }
    };

    dispatch(
      sendQuery({
        payload: { message: message.trim() },
        callback,
      }),
    );
  };

  return (
    <Modal
      title={`Send a Message to Your Business Partner`}
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
          <div className="modal-body pt-3 pb-5">
            <form className="">
              <div className="form-group">
                <label className="mb-2 ct_fw_600">Message</label>
                <textarea
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  value={message}
                  className="form-control ct_input h-auto"
                  rows="4"
                  placeholder="Enter Message"
                ></textarea>
              </div>
              <div className="mt-4 text-end">
                <button
                  className="ct_orange_btn ms-auto"
                  type="button"
                  onClick={handleSendMessage}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SendMessageModal;

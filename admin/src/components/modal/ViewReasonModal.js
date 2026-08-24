import { Modal } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSuppoortDetail } from "../../redux/reducers/supportReducers";
import { kycDeatil, updateKYCStatus } from "../../redux/actions/authAction";

const ViewReasonModal = ({ isViewModal, setIsViewModal, activeKyc }) => {
  const dispatch = useDispatch();
  const [reply_message, setReplyMessage] = useState("");

  const handleReply = () => {
    if (!reply_message?.trim()) {
      return toast.error("Please enter a message");
    }
    const callback = (res) => {
      if (res?.success) {
        dispatch(
          kycDeatil({
            payload: {
              id: activeKyc?.id,
              user_type: activeKyc?.user_type,
            },
          })
        );
        setIsViewModal(false);
      }
    };
    const payload = {
      id: activeKyc?.id,
      user_type: activeKyc?.user_type,
      rejected_reason : reply_message,
      status: 2,
    };
    dispatch(updateKYCStatus({ payload, callback }));
  };
  return (
    <Modal
      title={"Cancellation Reason"}
      visible={isViewModal}
      onCancel={() => {
        dispatch(setSuppoortDetail());
        setIsViewModal(false);
      }}
      centered={true}
      footer={null}
      width={"800px"}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ backgroundColor: "#fff" }}>
          <div className="modal-body pt-3 pb-3">
            <div className="col-md-12">
              <form className="">
                <>
                  <div class="form-group">
                    <label class="mb-2 ct_fw_600">Message</label>
                    <textarea
                      onChange={(e) => {
                        setReplyMessage(e.target.value);
                      }}
                      value={reply_message}
                      class="form-control ct_input h-auto"
                      rows="4"
                      placeholder="Enter Message"
                    ></textarea>
                  </div>
                  <div className="mt-4 text-end">
                    <button
                      className="ct_orange_btn ms-auto"
                      type="button"
                      onClick={handleReply}
                    >
                      Send
                    </button>
                  </div>
                </>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewReasonModal;

import { Modal } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { pipViewDateTime } from "../../utills/pip";
import { useDispatch, useSelector } from "react-redux";
import { setSuppoortDetail } from "../../redux/reducers/supportReducers";
import { fetchSupports, sendReply } from "../../redux/actions/supportAction";

const InboxModal = ({ isViewModal, setIsViewModal, title = "" }) => {
  const dispatch = useDispatch();
  const [reply_message, setReplyMessage] = useState("");
  const { supportDetail } = useSelector((state) => state.supportReducers);

  const handleReply = () => {
    if (!reply_message?.trim()) {
      return toast.error("Please enter a message");
    }
    const callback = (res) => {
      if (res?.success) {
        dispatch(setSuppoortDetail());
        dispatch(fetchSupports());
        setIsViewModal(false);
      }
    };
    dispatch(
      sendReply({
        payload: {
          reply_message: reply_message?.trim(),
          ticket_id: supportDetail?.ticket_id,
        },
        callback,
      }),
    );
  };
  return (
    <Modal
      title={title}
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
                <div className="form-group mb-4">
                  <label class="mb-2 ct_fw_600">
                    {supportDetail?.activeTab == "userQuery"
                      ? `${supportDetail?.user_first_name} ${supportDetail?.user_last_name}`
                      : `${supportDetail?.host_first_name} ${supportDetail?.host_last_name}`}{" "}
                    ({pipViewDateTime(supportDetail?.created_at)})
                  </label>
                  <p className="mb-0 ct_para_scroll ct_custom_scroll">
                    {supportDetail?.message || "#N/A"}
                  </p>
                </div>
                {(supportDetail?.reply_message?.length &&
                  supportDetail?.reply_message?.map((item, ind) => (
                    <div className="form-group mb-4">
                      <label class="mb-2 ct_fw_600 text-capitalize">
                        {item?.role == "host"
                          ? `Host Reply by ${supportDetail?.host_first_name} ${supportDetail?.host_last_name}`
                          : `${item?.role} Reply` || "#N/A"}{" "}
                        ({pipViewDateTime(item?.created_at)})
                      </label>
                      <p className="mb-0 ct_para_scroll ct_custom_scroll">
                        {item?.message || "#N/A"}
                      </p>
                    </div>
                  ))) ||
                  ""}
                {/* {supportDetail?.activeTab == "userQuery" && ( */}
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
                {/* )} */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InboxModal;

import { Modal } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "../../../shared/components/loader";

const SendReportModal = ({
  isViewModal,
  setIsViewModal,
  handleSubmit = () => { },
}) => {
  const [description, setDescription] = useState("");
  const [report_title, setReport_title] = useState("");
  const { reportLoading } = useSelector((state) => state.guest.booking);
  const handleSendMessage = () => {
    if (!report_title.trim()) {
      toast.error("Please enter a report title");
      return;
    }
    if (!description.trim()) {
      toast.error("Please enter a description");
      return;
    }
    const payload = {
      report_title: report_title.trim(),
      description: description.trim(),
    };
    handleSubmit(payload, () => {
      setReport_title("");
      setDescription("");
    });
  };

  if (reportLoading) {
    return <Loader />;
  }

  return (
    <Modal
      title={`Report Property`}
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
              <div className="form-group mb-2">
                <label className="mb-2 ct_fw_600">Report Title</label>
                <input
                  onChange={(e) => {
                    setReport_title(e.target.value);
                  }}
                  value={report_title}
                  className="form-control ct_input h-auto"
                  rows="4"
                  placeholder="Enter report title"
                ></input>
              </div>
              <div className="form-group">
                <label className="mb-2 ct_fw_600">Description</label>
                <textarea
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                  className="form-control ct_input h-auto"
                  rows="4"
                  placeholder="Enter description"
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

export default SendReportModal;


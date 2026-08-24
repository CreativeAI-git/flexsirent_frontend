import { Modal } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { requestBookingDocuments } from "../../../redux/features/host/actions/bookingAction";

const RequestDocModal = ({
  booking_id,
  isViewModal,
  setIsViewModal,
  handleSubmit = () => {},
}) => {
  const dispatch = useDispatch();
  const [requestedDoc, setRequestedDoc] = useState("");

  const handleRequestDoc = () => {
    if (!requestedDoc.trim()) {
      toast.error("Please enter which documents you require");
      return;
    }

    const callback = (res) => {
      if (res?.success) {
        setIsViewModal(false);
        setRequestedDoc("");
        handleSubmit();
      }
    };

    dispatch(
      requestBookingDocuments({
        payload: { booking_id, requested_doc: requestedDoc.trim() },
        callback,
      })
    );
  };

  return (
    <Modal
      title="Request Documents from Guest"
      open={isViewModal}
      onCancel={() => {
        setIsViewModal(false);
      }}
      centered={true}
      footer={null}
      width="600px"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ backgroundColor: "#fff" }}>
          <div className="modal-body pt-3 pb-5">
            <form>
              <div className="form-group">
                <label className="mb-2 ct_fw_600">Specify Documents (comma separated or detailed list)</label>
                <textarea
                  onChange={(e) => {
                    setRequestedDoc(e.target.value);
                  }}
                  value={requestedDoc}
                  className="form-control ct_input h-auto"
                  rows="4"
                  placeholder="e.g. Passport, Employment Contract, Utility Bill"
                ></textarea>
              </div>
              <div className="mt-4 text-end">
                <button
                  className="ct_orange_btn ms-auto"
                  type="button"
                  onClick={handleRequestDoc}
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RequestDocModal;

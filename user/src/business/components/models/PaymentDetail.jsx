import { Modal } from "antd";

const PaymentDetails = ({ isViewModal, setIsViewModal }) => {
  return (
    <Modal
      title={``}
      open={isViewModal}
      onCancel={() => {
        setIsViewModal(false);
      }}
      centered={true}
      footer={null}
      width={"800px"}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
         
          <div className="modal-body pt-3">
            <div className="ct_pb_27 ct_border_btm_grey">
              <div className="d-flex align-items-center justify-content-between gap-2">
                <h4 className="ct_fs_20 ct_fw_600 mb-0">Monthly Rent Payment</h4>
                <span className="ct_paid_badge">Paid</span>
              </div>
              <p className="mb-0 ct_text_clr_4B5563 mt-2">
                Rent for April 2025 was successfully paid
              </p>
            </div>
            <div className="ct_pt_30 ct_pb_27 ct_border_btm_grey">
              <div className="ct_grid_dash_2">
                <div>
                  <h6 className="ct_fs_16 mb-1">Transaction ID</h6>
                  <p className="ct_fs_16 mb-0 ct_text_clr_4B5563">#TXN23489APR25</p>
                </div>
                <div>
                  <h6 className="ct_fs_16 mb-10">Date Paid</h6>
                  <p className="ct_fs_16 mb-0 ct_text_clr_4B5563">21 May 2025</p>
                </div>
                <div>
                  <h6 className="ct_fs_16 mb-1">Payment Method</h6>
                  <p className="ct_fs_16 mb-0 ct_text_clr_4B5563">Visa **** 3421</p>
                </div>
                <div>
                  <h6 className="ct_fs_16 mb-1">Amount Paid</h6>
                  <p className="ct_fs_16 mb-0 ct_text_clr_4B5563">€29</p>
                </div>
              </div>
            </div>
            <div className="ct_pt_30 ct_pb_27 ">
              <h6 className="mb-0 ct_fs_16">Property Details</h6>
              <h6 className="mt-3 ct_fs_16">Modern 2BHK in Downtown</h6>
              <div className="mt-3">
                <p className="ct_text_clr_4B5563 mb-0">123 Liberty Street, NY</p>
                <p className="ct_text_clr_4B5563 mb-0">Guest: Sarah Johnson</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentDetails;

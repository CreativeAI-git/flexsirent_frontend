import React from 'react';
import { Modal } from "antd";
import { curSym, pipViewDate } from '../../../shared/utils/pip';
import StatusCol from '../../../shared/components/table/StatusCol';

const PaymentDetailsModal = ({ isViewModal, setIsViewModal,data={} ,bookingData={}}) => {
    return (
        <Modal
            title={`Monthly Rent Payment`}
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
                    <div className="modal-body pt-3">
                        <div className="ct_pb_27 ct_border_btm_grey">
                            <div className="d-flex align-items-center justify-content-end gap-2">
                                {/* <span className="ct_paid_badge">Paid</span> */}
                                   <StatusCol
                            status={data?.payment_status}
                            type="payments"
                          />
                            </div>
                            {/* <p className="mb-0 ct_text_clr_4B5563 mt-2">Rent for April 2025 was successfully paid</p> */}
                        </div>
                        <div className="ct_pt_30 ct_pb_27 ct_border_btm_grey">
                            <div className="d-flex align-items-center justify-content-between gap-5 flex-wrap">
                                <div>
                                    <h6 className="ct_fs_16 mb-1">Transaction ID</h6>
                                    <p className="ct_fs_16 mb-0 ct_text_clr_4B5563">#{data?.transaction_id}</p>
                                </div>
                                <div>
                                    <h6 className="ct_fs_16 mb-10">Date Paid</h6>
                                    <p className="ct_fs_16 mb-0 ct_text_clr_4B5563">{pipViewDate(data?.created_at)}</p>
                                </div>
                                <div>
                                    <h6 className="ct_fs_16 mb-1">Payment Method</h6>
                                    <p className="ct_fs_16 mb-0 ct_text_clr_4B5563">{data?.payment_method || "#N/A"}</p>
                                </div>
                                <div>
                                    <h6 className="ct_fs_16 mb-1">Amount Paid</h6>
                                    <p className="ct_fs_16 mb-0 ct_text_clr_4B5563">{curSym}{data?.total_amount}</p>
                                </div>
                            </div>
                        </div>
                        <div className="ct_pt_30 ct_pb_27 ">
                            <h6 className="mb-0 ct_fs_16">Property Details</h6>
                            <h6 className="mt-3 ct_fs_16">{bookingData?.property_title || "#N/A"}</h6>
                            <div className="mt-3">
                                <p className="ct_text_clr_4B5563 mb-0">{bookingData?.address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
};

export default PaymentDetailsModal;
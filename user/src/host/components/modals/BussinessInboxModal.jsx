import React from 'react';
import { Modal } from "antd";

const BussinessInboxModal = ({ isViewModal, setIsViewModal }) => {
    return (
        <Modal
            title={`Inquiry Detail`}
            open={isViewModal}
            onCancel={() => {
                setIsViewModal(false);
            }}
            centered={true}
            footer={null}
            width={"1000px"}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={{ backgroundColor: "#fff" }}>
                    <div className="modal-body pt-3 pb-5">
                        <ul className="ct_inquery_main mt-4">
                            <li>
                                <h5 className="ct_fs_16 ct_fw_600 mb-1">Date</h5>
                                <p className="mb-0 ct_text_op_6 ct_fs_14">20 August, 2024</p>
                            </li>
                            <li>
                                <h5 className="ct_fs_16 ct_fw_600 mb-1">Business partner</h5>
                                <p className="mb-0 ct_text_op_6 ct_fs_14">John Wick</p>
                            </li>
                            <li>
                                <h5 className="ct_fs_16 ct_fw_600 mb-1">Email </h5>
                                <p className="mb-0 ct_text_op_6 ct_fs_14">abc123@gmail.com</p>
                            </li>
                            <li>
                                <span
                                    className="ct_paid_badge d-inline-block ct_line_h_30 px-4 ct_border_radius_10">Reviewed</span>
                            </li>
                        </ul>
                        <div className="form-group mt-4">
                            <label className="mb-2 ct_fw_600">Your Message</label>
                            <textarea className="form-control ct_input h-auto" disabled
                                rows="4">"Hey! I loved the pictures. Could you tell me more about the Wi-Fi speed and neighborhood?" and "Do I need to pay anything extra apart from the rent and deposit?"</textarea>
                        </div>
                        <div className="form-group mt-4">
                            <label className="mb-2 ct_fw_600">Business Partner Reply</label>
                            <textarea className="form-control ct_input h-auto" disabled
                                rows="4">Hello! Thanks for reaching out. Yes, the studio is available starting from the 1st of next month.It includes high-speed Wi-Fi and access to a  If you have any specific move-in date or other questions, feel free to ask. I’d be happy to help!</textarea>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
};

export default BussinessInboxModal;
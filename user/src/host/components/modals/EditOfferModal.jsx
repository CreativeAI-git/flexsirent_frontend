import React from 'react';
import { Modal } from "antd";

const EditOfferModal = ({ isViewModal, setIsViewModal }) => {
    return (
        <Modal
            title={`Edit Offer`}
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
                        <form>
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <div className="form-group">
                                        <label className="mb-2">Minimum Stay to Enjoy the Offer</label>
                                        <select className="form-control ct_input ct_input_h_50">
                                            <option value="4">4 months</option>
                                            <option value="8">8 months</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="form-group">
                                        <label className="mb-2">Maximum Stay to Enjoy the Offer (optional)</label>
                                        <select className="form-control ct_input ct_input_h_50">
                                            <option value="">8 months</option>
                                            <option value="">8 months</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="form-group">
                                        <label className="mb-2">Monthly Discount</label>
                                        <div className="position-relative">
                                            <input className="form-control ct_input ct_input_h_50" />
                                            <span className="ct_show_eye">%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="form-group">
                                        <label className="mb-2">Property Type</label>
                                        <select className="form-control ct_input ct_input_h_50">
                                            <option value="">Co-Livings</option>
                                            <option value="">Co-Livings</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button type="button" onClick={() => setIsViewModal(false)} className="ct_dark_blue_btn mx-auto">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    )
};

export default EditOfferModal;
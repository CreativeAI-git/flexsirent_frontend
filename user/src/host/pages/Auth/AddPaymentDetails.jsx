import React from 'react';
import PanelLayout from '../../../shared/layout/PanelLayout';
import { useLocalizedNavigate } from "@/shared/hooks/useLocalizedNavigate";
import ImageWithPreview from '../../../shared/components/image preview/imageWithPreview';

const AddPaymentDetails = () => {
    const navigate = useLocalizedNavigate();
    const user = { name: "Add Payment Details", role: "host" };

    return (
        <PanelLayout user={user} >
            <div className="row">
                <div className="col-md-12">
                    <form className="">
                        <div className="ct_light_blue_outline h-auto p-4 mb-4 shadow-none">
                            <div className="d-flex align-items-center justify-content-between gap-3">
                                <div className="d-flex align-items-center gap-4">
                                    <div className="ct_upload_user_profile_img">
                                        <ImageWithPreview
                                            image="https://app.flexsirent.com/user_profile.png"
                                            className="ct_img_60"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="ct_fs_18 ct_fw_700 mb-1">Jessica Daniel</h4>
                                        <p className="mb-0 ct_text_op_05 ct_fs_14">Host</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ct_light_blue_outline ct_p_30 shadow-none h-auto">
                            <div className="">
                                <h4 className="ct_fs_22 ct_fw_600 mb-4">Add Payment Details</h4>
                                <div className=" row">
                                    <div className="col-md-12">
                                        <div className="form-group mb-4">
                                            <label className="ct_fw_500 mb-2">Bank Name</label>
                                            <input type="text" className="form-control ct_input ct_input_h_50" placeholder="Bank Name" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-4">
                                            <label className="ct_fw_500 mb-2">Account Holder Name</label>
                                            <input type="text" className="form-control ct_input ct_input_h_50" placeholder="Account Holder Name" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-4">
                                            <label className="ct_fw_500 mb-2 ">IBAN / Account Number</label>
                                            <input type="number" className="form-control ct_input ct_input_h_50 " placeholder="IBAN / Account Number" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-4">
                                            <label className="ct_fw_500 mb-2 ">SWIFT / BIC Code</label>
                                            <input type="text" className="form-control ct_input ct_input_h_50 " placeholder="SWIFT / BIC Code" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-4">
                                            <label className="ct_fw_500 mb-2 ">Bank Country</label>
                                            <select type="text" className="form-control ct_input ct_input_h_50 ">
                                                <option value="">United State</option>
                                                <option value="">United State</option>
                                                <option value="">United State</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button type='button' onClick={() => navigate(-1)} className="ct_dark_blue_btn ms-auto ct_border_radius_10 ct_h_40">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </PanelLayout>
    )
};

export default AddPaymentDetails;
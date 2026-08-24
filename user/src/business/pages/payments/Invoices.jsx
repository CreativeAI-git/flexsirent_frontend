import { useLocation } from "react-router";
import PanelLayout from "../../../shared/layout/PanelLayout";
import { curSym, pipFromTo, pipViewDate } from "../../../shared/utils/pip";

const Invoices = () => {
  const invoice = useLocation()?.state?.data || {}
  const user = { name: "Invoice", role: "guestBusiness" };
  
  return (
    <PanelLayout user={user}>
      <div className="row">
        <div className="col-md-12 pb-5">
          <div className="ct_light_blue_outline h-auto p-4 mb-4 shadow-none">
            <div className="row ct_border_btm_grey pb-4 mb-4">
              <div className="col-md-6 mb-3">
                <h5 className="ct_fs_18 mb-1 ct_fw_600">Invoice ID</h5>
                <p className="">#INV-20345</p>
              </div>
              <div className="col-md-6 mb-3">
                <h5 className="ct_fs_18 mb-1 ct_fw_600">Status</h5>
                <span className="ct_fs_18 mb-0  ct_paid_badge d-inline-block">
                  <i className="fa-solid fa-check me-1"></i>
                  Paid
                </span>
              </div>
              <div className="col-md-6 mb-3">
                <h5 className="ct_fs_18 mb-1 ct_fw_600">Date Issued</h5>
                <p className="mb-0 ct_text_op_6">{pipViewDate(invoice?.created_at) || "#N/A"}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h5 className="ct_fs_18 mb-1 ct_fw_600">Billing Period</h5>
                <p className=" mb-0 ct_text_op_6">{pipFromTo(invoice?.booked_from,invoice?.booked_to) || "#N/A"}  </p>
              </div>
              <div className="col-md-6 mb-3">
                <h5 className="ct_fs_18 mb-1 ct_fw_600">Business Name</h5>
                <p className=" mb-0 ct_text_op_6">{invoice?.business_name || "#N/A"}</p>
              </div>
              {/* <div className="col-md-6 mb-3">
                <h5 className="ct_fs_18 mb-1 ct_fw_600">Tax ID</h5>
                <p className="mb-0 ct_text_op_6">9876543210</p>
              </div> */}
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <h5 className="ct_fs_18 mb-1 ct_fw_600">Business Address</h5>
                <p className=" mb-0 ct_text_op_6">{invoice?.address || "#N/A"}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h5 className="ct_fs_18 mb-1 ct_fw_600">Host Name</h5>
                <p className=" mb-0 ct_text_op_6 ">{invoice?.host_first_name ? `${invoice?.host_first_name} ${invoice?.host_lost_name}` : "#N/A"}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h5 className="ct_fs_18 mb-1 ct_fw_600">Host Email</h5>
                <p className="mb-0 ct_text_op_6">{invoice?.host_email || "#N/A"}</p>
              </div>
            </div>
          </div>
          <div className="ct_light_blue_outline h-auto p-4 mb-4 shadow-none">
            <div className="row ">
              <div className="col-md-6 mb-3">
                <h5 className="ct_fs_18 mb-1 ct_fw_600">Property</h5>
                <p className="mb-0 ct_text_op_6">{invoice?.property_title || "#N/A"}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h5 className="ct_fs_18 mb-1 ct_fw_600">Stay Duration</h5>
                <p className=" mb-0 ct_text_op_6">{pipFromTo(invoice?.booked_from,invoice?.booked_to) || "#N/A"} </p>
              </div>
              <div className="col-md-6 mb-3">
                <h5 className="ct_fs_18 mb-1 ct_fw_600">Renter</h5>
                <p className=" mb-0 ct_text_op_6">{invoice?.user_first_name ? `${invoice?.user_first_name} ${invoice?.user_last_name}` : "#N/A"}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h5 className="ct_fs_18 mb-1 ct_fw_600">Email</h5>
                <p className="mb-0 ct_text_op_6">{invoice?.user_email || "#N/A"}</p>
              </div>
            </div>
          </div>
          <div className="table-responsive  ct_custom_table">
            <table className="table ct_bordered_table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Description</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <span className="ct_minimise_cnt">Rent /month</span>
                  </td>
                  <td>{curSym}{invoice?.monthly_rent ||0 }</td>
                  <td>
                    <span>{curSym}{invoice?.monthly_rent ||0 }</span>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <span className="ct_minimise_cnt">Security Deposite</span>
                  </td>
                  <td>{curSym}{invoice?.security_deposit ||0 }</td>
                  <td>
                    <span className="ct_cancel_clr">-{curSym}{invoice?.security_deposit ||0 }</span>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    <span className="ct_minimise_cnt">Platform Service Fee</span>
                  </td>
                  <td>{curSym}{invoice?.user_earning ||0 }</td>
                  <td>
                    <span className="ct_cancel_clr">-{curSym}{invoice?.user_earning ||0 }</span>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td className="ct_fw_600" colspan="2">
                    Host Payout
                  </td>
                  <td className="ct_fw_600 ">{curSym}{invoice?.total_price ||0 }</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="mt-4">
            <p className="ct_text_op_6 mb-1">
              Note: The platform service fee includes support, insurance, and
              24/7 customer care.
            </p>
            <p className="ct_text_op_6 mb-0">
              For questions about this invoice, contact: billing@flexsirent.com
            </p>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
};

export default Invoices;

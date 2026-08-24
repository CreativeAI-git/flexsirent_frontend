import PanelLayout from "../../../shared/layout/PanelLayout";

const ContractDetail = () => {
  const user = { name: "Contract Details", role: "guestBusiness" };
  return (
    <PanelLayout user={user}>
      <div className="row">
        <div className="col-md-12">
          <div className="ct_white_bg h-auto ct_border_op_10_1">
            <div className="ct_px_30_new">
              <ul className="ct_view_profile_list">
                <li>
                  <p className="mb-0 ct_fw_600">Contract Title :</p>
                  <p className="mb-0">Vendor Agreement</p>
                </li>
                <li>
                  <p className="mb-0 ct_fw_600">Client :</p>
                  <p className="mb-0">John Doe</p>
                </li>
                <li>
                  <p className="mb-0 ct_fw_600">Country :</p>
                  <p className="mb-0">India</p>
                </li>
                <li>
                  <p className="mb-0 ct_fw_600">Total VAT :</p>
                  <p className="mb-0">₹18,000</p>
                </li>
                <li>
                  <p className="mb-0 ct_fw_600">Start Date :</p>
                  <p className="mb-0">08 May 2025</p>
                </li>
                <li>
                  <p className="mb-0 ct_fw_600">End Date :</p>
                  <p className="mb-0">12 May 2025</p>
                </li>
                <li>
                  <p className="mb-0 ct_fw_600">Status :</p>
                  <p className="mb-0">
                    <span className="ct_upcoming_clr ct_fw_600">Active</span>
                  </p>
                </li>
                <li>
                  <p className="mb-0 ct_fw_600">Contract Content :</p>
                  <p className="mb-0 ct_para_scroll">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ullam, veniam molestias, tempore, voluptatum vero blanditiis
                    repudiandae sed ipsa saepe mollitia earum perferendis
                    debitis ut recusandae! Voluptatum, corporis! Facilis,
                    expedita magni.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
};

export default ContractDetail;

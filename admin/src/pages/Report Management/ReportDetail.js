import { useNavigate } from "react-router";
import SubHeader from "../../shared/layout/SubHeader";
import PanelLayout from "../../shared/layout/PanelLayout";

const ReportDetail = () => {
  const navigate = useNavigate();

  return (
    <PanelLayout>
      <SubHeader label="Report Details" />
      <div class="ct_white_bg h-auto">
        <div class="ct_px_30_new pt-4">
          <ul class="ct_view_profile_list">
            <li>
              <p class="mb-0 ct_fw_600">Report Title :</p>
              <p class="mb-0">Inactive user report</p>
            </li>
            <li>
              <p class="mb-0 ct_fw_600">Type :</p>
              <p class="mb-0">Booking</p>
            </li>
            <li>
              <p class="mb-0 ct_fw_600">Created By :</p>
              <p class="mb-0">John Dev</p>
            </li>
            <li>
              <p class="mb-0 ct_fw_600">Created On :</p>
              <p class="mb-0">Sep 15, 2023</p>
            </li>

            <li>
              <p class="mb-0 ct_fw_600">Status :</p>
              <p class="mb-0">
                <span class="ct_green_clr ct_fw_600">Resolved</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </PanelLayout>
  );
};

export default ReportDetail;

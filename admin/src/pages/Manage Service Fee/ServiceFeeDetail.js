import { curSym } from "../../utills/pip";
import { useNavigate,useLocation } from "react-router";
import SubHeader from "../../shared/layout/SubHeader";
import PanelLayout from "../../shared/layout/PanelLayout";

const ServiceFeeDetail = () => {
  const data = useLocation()?.state?.data || {};
  const navigate = useNavigate();

  return (
    <PanelLayout>
      <SubHeader label="Service Fee Details" />
      <div class="ct_white_bg h-auto">
        <div class="ct_px_30_new pt-4">
          <ul class="ct_view_profile_list">
            <li>
              <p class="mb-0 ct_fw_600">Country :</p>
              <p class="mb-0">{data?.country || "#N/A"}</p>
            </li>
            <li>
              <p class="mb-0 ct_fw_600">State :</p>
              <p class="mb-0">{data?.state || "#N/A"}</p>
            </li>
            <li>
              <p class="mb-0 ct_fw_600">City :</p>
              <p class="mb-0">{data?.location || "#N/A"}</p>
            </li>
            <li>
              <p class="mb-0 ct_fw_600">Fee Amount :</p>
              <p class="mb-0">
                {" "}
                {curSym}
                {data?.commission || "0"}
              </p>
            </li>
          
          </ul>
        </div>
      </div>
    </PanelLayout>
  );
};

export default ServiceFeeDetail;

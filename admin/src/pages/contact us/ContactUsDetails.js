import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { pipViewDate } from "../../utills/pip";
import Loader from "../../components/form/Loader";
import SubHeader from "../../shared/layout/SubHeader";
import PanelLayout from "../../shared/layout/PanelLayout";

const ContactUsDetails = () => {
  const data = useLocation()?.state?.data || {};
  const { isLoading } = useSelector((state) => state.hostReducers);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PanelLayout>
      <SubHeader label="Contact Us Details" />
      <div class="ct_white_bg h-auto">
        <div class="ct_px_30_new pt-4">
          <ul class="ct_view_profile_list">
            <li>
              <p class="mb-0 ct_fw_600">Name</p>
              <p class="mb-0"> {data?.name || "#N/A"}</p>
            </li>
            <li>
              <p class="mb-0 ct_fw_600">Email</p>
              <p class="mb-0">{data?.email || "#N/A"}</p>
            </li>

            <li>
              <p class="mb-0 ct_fw_600">Submitted On</p>
              <p class="mb-0">{pipViewDate(data?.created_at) || "#N/A"}</p>
            </li>
            <li className="mb-4">
              <p class="mb-0 ct_fw_600">Message</p>
              <p class="mb-0 ct_para_scroll ct_custom_scroll">
                {data?.message || "#N/A"}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </PanelLayout>
  );
};

export default ContactUsDetails;

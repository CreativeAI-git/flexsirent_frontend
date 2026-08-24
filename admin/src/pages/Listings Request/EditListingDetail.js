import { useLocation } from "react-router";
import SubHeader from "../../shared/layout/SubHeader";
import PanelLayout from "../../shared/layout/PanelLayout";
import EditListingData from "../../components/pages/Listing Requests/EditListingDetail";

const EditListingDetail = () => {
const data = useLocation()?.state?.data || {}
  return (
    <PanelLayout>
      <SubHeader label="Edit Listing Details" />
      <div class="ct_white_bg">
        <EditListingData data={data} role="host"/>
      </div>
    </PanelLayout>
  );
};

export default EditListingDetail;
